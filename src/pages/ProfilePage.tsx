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
import React, { useContext } from "react";
import Footer from "../components/Footer";

import SearchMenu from "../components/SearchMenu";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
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
          flexDirection: "row",
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
          }}
        >
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>{/* <ImageIcon /> */}</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Your Profile" secondary={user?.email} />
            </ListItem>
          </List>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
