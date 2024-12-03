import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import Stack from "@mui/joy/Stack";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import CardComments from "./CardComments";
import { Button, Typography } from "@mui/joy";
import { AuthContext } from "../context/AuthContext";
import { Alert, TextareaAutosize } from "@mui/material";
import UpdateCommentOption from "./UpdateCommentOption";

type Comment = {
  author: string;
  date: Timestamp | Date;
  text: string;
  countryId: string | undefined;
  commentId: string | undefined;
};
type CommentsProps = {
  country: string | undefined;
};
export default function Comments({ country }: CommentsProps) {
  //console.log("%c COMMENTS   component run", "color:orange");

  const [comments, setComments] = useState<Comment[] | null>(null);
  const { user } = useContext(AuthContext);
  const [newCommentText, setNewCommentText] = useState<string | null>();
  const [showAlert, setShowAlert] = useState(false);

  const getCommentsRealTime = () => {
    const commentsCollectionRefference = collection(
      db,
      `countries/${country}/comments`
    );

    //here we sort the comments based on date
    const commentsQuery = query(
      commentsCollectionRefference,
      orderBy("date", "asc")
    );

    const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
      const arrayOfComments: Comment[] = [];
      querySnapshot.forEach((doc) => {
        const commentData = doc.data() as Comment;
        const neWComment: Comment = {
          ...commentData,
          commentId: doc.id,
          countryId: country,
        };
        arrayOfComments.push(neWComment);
        //arrayOfComments.push(doc.data() as Comment);
      });
      setComments(arrayOfComments as Comment[]);
    });
  };

  /*



  */

  const addCommentReference = async (
    email: string,
    countryId: string,
    commentId: string
  ) => {
    try {
      const userCommentsRef = doc(db, "usersComments", email);

      // Update the user's comment references
      await setDoc(
        userCommentsRef,
        {
          // add to comments array
          comments: arrayUnion({ countryId, commentId }),
        },
        { merge: true } // to be shure other data in the document isn't overwritten
      );

      console.log("Comment reference added successfully! ======>>>>>>>");
    } catch (error) {
      if (error.code === "not-found") {
        // Create the document if it doesn't exist
        const newUserComments = {
          comments: [{ countryId, commentId }],
        };
        await setDoc(doc(db, "usersComments", email), newUserComments);
        console.log("User document created and comment reference added!");
      } else {
        console.error("Error adding comment reference: ", error);
      }
    }
  };

  /*
  
  
  
  */

  const sendComment = async (e: FormEvent) => {
    e.preventDefault();

    if (
      newCommentText === undefined ||
      newCommentText === null ||
      newCommentText === ""
    ) {
      setShowAlert(true);
      return;
    }
    const newComment: Comment = {
      //To be sure, that user is not null
      author: user!.email,
      date: new Date(),
      text: newCommentText,
    };
    try {
      const commentsCollectionRefference = collection(
        db,
        `countries/${country}/comments`
      );
      // Add the comment to Firestore and get the document reference
      const docRef = await addDoc(commentsCollectionRefference, newComment);
      // to clear the new comment input field
      setNewCommentText("");

      // Add the comment reference to the user's `usersComments/{email}` document
      await addCommentReference(user!.email, country, docRef.id);

      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.log("Error adding document: ", err);
    }
  };

  /*
  
  
  
  */

  useEffect(() => {
    getCommentsRealTime();
  }, []);

  const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography["body-sm"],
    textAlign: "center",
    fontWeight: theme.fontWeight.md,
    color: theme.vars.palette.text.secondary,
    border: "1px solid",
    borderColor: theme.palette.divider,
    padding: theme.spacing(1),
    borderRadius: theme.radius.md,
  }));

  const hadleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewCommentText(e.target.value);
  };

  return (
    <Box sx={{ width: "60%" }}>
      <Stack spacing={2}>
        {(comments && comments.length == 0) || comments === null ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              //height: "100vh", // Full viewport height to center vertically
            }}
          >
            <Box
              sx={{
                border: "2px solid #1C76D2",
                height: "40px",
                width: "400px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                borderRadius: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography color="#1C76D2">
                No comments yet, be the first!
              </Typography>
            </Box>
          </Box>
        ) : (
          comments.map((comment, i) => {
            return (
              <Item key={comment.commentId}>
                <CardComments
                  /* key={i} */
                  author={comment.author}
                  text={comment.text}
                  date={comment.date as Timestamp}
                  country={undefined}
                />
                {user && user.email === comment.author && (
                  <UpdateCommentOption
                    /* key={i} */
                    email={comment.author}
                    countryId={comment.countryId}
                    commentId={comment.commentId}
                  />
                )}
              </Item>
            );
          })
        )}
      </Stack>
      <Box sx={{ padding: "25px" }}>
        {showAlert && (
          <Alert
            variant="filled"
            severity="warning"
            onClose={() => setShowAlert(false)}
          >
            Cannot submit an empty comment
          </Alert>
        )}
        <form>
          <TextareaAutosize
            placeholder="Leave your comment here…"
            variant="outlined"
            color="primary"
            value={newCommentText}
            onChange={hadleInput}
            /* multiline */
            minRows={3}
            maxRows={10}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "15px",
            }}
          >
            <Button type="submit" onClick={sendComment}>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
