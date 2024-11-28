import { Card, CardContent, Typography } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import React from "react";

type CardCommentsProps = {
  author: string;
  text: string;
  date: Timestamp;
};

export default function CardComments({
  author,
  text,
  date,
}: CardCommentsProps) {
  const formatDate = (seconds: number) => {
    const formatedDate = new Date(seconds * 1000).toLocaleDateString();
    return formatedDate;
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate(date.seconds)}
        </Typography>
      </CardContent>
    </Card>
  );
}
