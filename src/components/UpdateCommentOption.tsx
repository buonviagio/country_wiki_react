import { Box, Button, Collapse, TextareaAutosize } from "@mui/material";
import {
  arrayRemove,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function UpdateCommentOption({
  countryId,
  commentId,
  fetchUserComments,
}: Comment) {
  const [newCommentText, setNewCommentText] = useState<string | null>();
  const { user } = useContext(AuthContext);
  const [openCollapse, setCollapse] = useState<boolean>(false);

  const modifyComment = async (e: FormEvent) => {
    e.preventDefault();
    console.log("countryId", countryId);
    console.log("commendId", commentId);
    try {
      const commentRef = doc(
        db,
        `countries/${countryId}/comments/${commentId}`
      );
      const commentSnapshot = await getDoc(commentRef);

      if (!commentSnapshot.exists()) {
        throw new Error("Comment does not exist.");
      }

      const commentData = commentSnapshot.data();

      // To be sure the comment belongs to the logged in user
      if (commentData.author !== user?.email) {
        throw new Error("You can only modify your own comments.");
      }

      // Update the comment text
      await updateDoc(commentRef, {
        text: newCommentText,
        date: new Date(),
      });

      console.log("Comment successfully updated.");
      setCollapse(false);
      // to update state in Profile page
      fetchUserComments();
      console.log("AFTER FUNCTION");
    } catch (error) {
      console.error("Error updating comment: ", error.message);
    }
  };

  /*
    
    
    
    */

  const deleteComment = async (e: FormEvent) => {
    e.preventDefault();

    // we get snapshot based on properties, in our case, it is desired comment from countries subarray
    const commentRef = doc(db, `countries/${countryId}/comments/${commentId}`);
    // now we delete this snapshot
    await deleteDoc(commentRef);

    // we get snapshot based on properties, in our case, it is array of comments in subarray userComments
    const userCommentsRef = doc(db, `usersComments/${user?.email}`);
    const commentReference = { commentId, countryId };
    await updateDoc(userCommentsRef, {
      comments: arrayRemove(commentReference),
    });
    fetchUserComments();
    console.log("DELETE FUNCTION SUCCESS");
  };

  const deleteCommentWithQuery = async () => {
    const commentsCollectionRef = collection(
      db,
      `usersComments/${user?.email}/comments`
    );
    const q = query(
      commentsCollectionRef,
      where("commentId", "==", commentId),
      where("countryId", "==", countryId)
    );
    //execute query
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnapshot) => {
      const docRef = doc(
        db,
        `usersComments/${user?.email}/comments/${docSnapshot.id}`
      );
      await deleteDoc(docRef);
      console.log(`Deleted comment: ${docSnapshot.id}`);
    });
  };

  const hadleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewCommentText(e.target.value);
  };

  return (
    <Box>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <form>
          <TextareaAutosize
            placeholder="You can change your comment here…"
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
            <Button type="submit" onClick={deleteComment}>
              Delete comment
            </Button>
            <Button type="submit" onClick={modifyComment}>
              Submit
            </Button>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setCollapse(false);
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Collapse>
      <Button
        onClick={() => {
          setCollapse(true);
        }}
      >
        Change comment
      </Button>
    </Box>
  );
}
