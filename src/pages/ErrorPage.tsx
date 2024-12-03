import { Box, Container, CssBaseline, Typography } from "@mui/material";
import Footer from "../components/Footer";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

function ErrorPage() {
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
            width: "500px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ErrorOutlineRoundedIcon fontSize="large" sx={{ color: "#1C76D2" }} />
          <Typography color="#1C76D2">
            We can not find the page you are looking for
          </Typography>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default ErrorPage;
