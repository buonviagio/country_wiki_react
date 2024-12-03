import { Backdrop, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#1976D2", zIndex: theme.zIndex.drawer + 1 })}
      open={true}
      /* onClick={handleClose} */
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
