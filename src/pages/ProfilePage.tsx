import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { db } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import ShowCommentsOnUserPage from "../components/ShowCommentsOnUserPage";

type AllCommentFromUser = {
  country: string;
  commentId: string;
  author: string;
  text: string;
  date: Timestamp | Date;
};

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState<AllCommentFromUser[] | null>(null);

  /*
  
  
  */

  const getUserComments = async (email: string) => {
    try {
      // Here we recieve the reference to the user's usersComments/{email} document
      const userCommentsRef = doc(db, "usersComments", email);

      // here we recieve the document, that associates with user email, this is not doc yet this is snapshot
      const userCommentsSnapshot = await getDoc(userCommentsRef);

      if (!userCommentsSnapshot.exists()) {
        console.log("No comments found for this user.");
        return [];
      }
      // we transform with method data() the snapshot into object
      const userCommentsData = userCommentsSnapshot.data();

      if (
        !userCommentsData.comments ||
        !Array.isArray(userCommentsData.comments)
      ) {
        console.log("No comments array found for this user.");
        return [];
      }
      // here we recieve the array of comment references
      const commentReferences = userCommentsData.comments;

      // we iterate over each comment reference. Each object in commentPromisse is the result of of calling
      //function  getDoc(commenRef). in this map each element is Promise returned by async function
      const commentsPromises = commentReferences.map(
        //here we recieve the comment itself
        async ({ countryId, commentId }: any) => {
          const commentRef = doc(
            db,
            //here we create the path to the comment from SUBCOLLECTION countries
            `countries/${countryId}/comments/${commentId}`
          );
          // we recieve the snapshot of the desired comment
          const commentSnapshot = await getDoc(commentRef);

          if (commentSnapshot.exists()) {
            //if the comment is found we return it as object
            return { id: commentId, countryId, ...commentSnapshot.data() };
          } else {
            console.log(
              `Comment not found for countryId: ${countryId}, commentId: ${commentId}`
            );
            return null;
          }
        }
      );
      //here we are waiting for all promises
      const comments = await Promise.all(commentsPromises);

      // Filter comments, when there are null values for comments
      return comments.filter((comment) => comment !== null);
    } catch (error) {
      console.error("Error retrieving user comments: ", error);
      return [];
    }
  };

  /*
  
  
  
  */

  const fetchUserComments = async () => {
    // Assumes that we already have the logged-in user
    const email = user!.email;
    const comments: AllCommentFromUser[] = await getUserComments(email);
    const arrayOfComments: AllCommentFromUser[] = [];
    comments.forEach((doc) => {
      //creating array of comments
      arrayOfComments.push({
        country: doc.countryId,
        commentId: doc.id,
        text: doc.text,
        author: doc.author,
        date: doc.date,
      });
    });
    //set array of the comments
    setComments(arrayOfComments);
  };

  /*
  
  
  
  */

  useEffect(() => {
    console.log("ProfilePage :>> ");
    fetchUserComments();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{ backgroundColor: "#FAFBFB" }}
    >
      <CssBaseline />
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            border: "2px solid #1C76D2",
            height: "150px",
            width: "450px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: 2,
            marginBottom: "10px",
          }}
        >
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>{/* <ImageIcon /> */}</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Your Profile" secondary={user?.email} />
            </ListItem>
          </List>
        </Box>
        <ShowCommentsOnUserPage
          comments={comments}
          fetchUserComments={fetchUserComments}
        />
      </Container>
      <Footer />
    </Box>
  );
}
