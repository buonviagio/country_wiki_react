import { Box, Container, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <Box
      component="footer"
      bgcolor="#1C76D2"
      marginTop="20px"
      display="flex"
      justifyContent="center"
    >
      <Container
        sx={{
          margin: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", borderRadius: 2 }}
        >
          <Link
            href="https://github.com/buonviagio"
            target="_blank"
            color="inherit"
          >
            <GitHubIcon fontSize="large" />
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
