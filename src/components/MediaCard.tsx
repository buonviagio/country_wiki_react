//import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
//import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid2, Paper } from "@mui/material";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

type MediaCardProps = {
  name: string;
  flags: string[];
  capital: string[];
  region: string;
  map: string;
};

export default function MediaCard({
  name,
  flags,
  capital,
  region,
  map,
}: MediaCardProps) {
  /* to navigate to ditailed page and sending map Link reactRouter*/
  //const navigateTo = useNavigate();
  // const redirectTo = () => {
  //   navigateTo("/countries/" + name.common, { state: { location: map } });
  // };

  /** function from MUI */
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Item>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={flags.png}
            title="green iguana"
          />
          <CardContent sx={{ height: 200 }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                fontSize: "clamp(16px, 2vw, 24px)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name.common}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 7,
                textOverflow: "ellipsis",
              }}
            >
              {name.official}
              {<br />}
              {"The capital of the country is " + capital}
              {<br />}
              {"Region: " + region}
            </Typography>
          </CardContent>
          <CardActions>
            <Link component={RouterLink} to={"/countries/" + name.common}>
              Learn More
            </Link>
          </CardActions>
        </Card>
      </Item>
    </Grid2>
  );
}
