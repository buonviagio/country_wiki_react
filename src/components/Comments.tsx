import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import Stack from "@mui/joy/Stack";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import CardComments from "./CardComments";
import { Button, Input, Typography } from "@mui/joy";
import { AuthContext } from "../context/AuthContext";
import { Alert, TextareaAutosize, TextField } from "@mui/material";

type Comment = {
  author: string;
  date: Timestamp | Date;
  text: string;
};
type CommentsProps = {
  country: string;
};
export default function Comments({ country }: CommentsProps) {
  console.log("%c COMMENTS   component run", "color:orange");

  const [comments, setComments] = useState<Comment[] | null>(null);
  const { user } = useContext(AuthContext);
  const [newCommentText, setNewCommentText] = useState<string | null>();
  const [showAlert, setShowAlert] = useState(false);

  const getCommentsRealTime = () => {
    const commentsCollectionRefference = collection(
      db,
      `countries/${country}/comments`
    );
    const unsubscribe = onSnapshot(
      commentsCollectionRefference,
      (querySnapshot) => {
        const arrayOfComments: Comment[] = [];
        querySnapshot.forEach((doc) => {
          arrayOfComments.push(doc.data() as Comment);
        });
        setComments(arrayOfComments as Comment[]);
      }
    );
  };

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
      author: user!.email,
      date: new Date(),
      text: newCommentText,
    };
    try {
      const commentsCollectionRefference = collection(
        db,
        `countries/${country}/comments`
      );

      const docRef = await addDoc(commentsCollectionRefference, newComment);
      setNewCommentText("");
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.log("Error adding document: ", err);
    }
  };

  // const getComments = async () => {
  //   try {
  //     const commentsCollectionRefference = collection(
  //       db,
  //       `countries/${country}/comments`
  //     );
  //     //recieve all documents
  //     const querySnapshot = await getDocs(commentsCollectionRefference);
  //     const arrayOfComments: Comment[] = [];
  //     //console.log("querySnapshot :>> ", querySnapshot);
  //     querySnapshot.forEach((doc) => {
  //       // retrie Object with comments based on props(name of country), which contain array of comments
  //       const commentsArray = doc.data();
  //       console.log("commentsArray :>> ", commentsArray);
  //       arrayOfComments.push(commentsArray as Comment);
  //     });
  //     setComments(arrayOfComments);
  //   } catch (err) {
  //     console.log("Error when we try to get comments from db :>> ", err);
  //   }
  // };

  useEffect(() => {
    //getComments();
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
    console.log("e.target.value :>> ", e.target.value);
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
              <Item>
                <CardComments
                  key={i}
                  author={comment.author}
                  text={comment.text}
                  date={comment.date as Timestamp}
                />
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
            multiline
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
