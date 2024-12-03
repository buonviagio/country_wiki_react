import { Box, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import CardComments from "./CardComments";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import { Timestamp } from "firebase/firestore";
import UpdateCommentOption from "./UpdateCommentOption";
import { AuthContext } from "../context/AuthContext";

export default function ShowCommentsOnUserPage({
  comments,
  fetchUserComments,
}) {
  //const [comments, setComments] = useState<Comment[] | null>(null);
  const { user } = useContext(AuthContext);

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
                You haven't leaved any comments yet!
              </Typography>
            </Box>
          </Box>
        ) : (
          comments.map((comment, i) => {
            return (
              <Item key={comment.commentId}>
                <CardComments
                  /* key={i} */
                  country={comment.country}
                  author={comment.author}
                  text={comment.text}
                  date={comment.date as Timestamp}
                />
                {user && user.email === comment.author && (
                  <UpdateCommentOption
                    /* key={i} */
                    countryId={comment.country}
                    commentId={comment.commentId}
                    fetchUserComments={fetchUserComments}
                  />
                )}
              </Item>
            );
          })
        )}
      </Stack>
    </Box>
  );
}
