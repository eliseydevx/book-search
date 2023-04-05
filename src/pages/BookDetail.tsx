import { observer } from "mobx-react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useStores } from "../hooks/useStores";
import { Book } from "../models/Book";

function BookDetails() {
  const { id } = useParams();
  const booksStore = useStores();
  const navigate = useNavigate();

  const book = booksStore.books.find((b: Book) => b.id === id);

  if (!book) {
    return <div>Book not found.</div>;
  }

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Card style={{ padding: 20 }}>
      <CardMedia
        image={book.thumbnail}
        title={book.title}
        style={{ height: 300, objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="h5">{book.title}</Typography>
        <Typography variant="subtitle1">
          By: {book.authors.join(", ")}
        </Typography>
        <Typography variant="body1">{book.description}</Typography>
        <Typography variant="subtitle2">
          Categories: {book.categories.join(", ")}
        </Typography>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </CardContent>
    </Card>
  );
}

export default observer(BookDetails);
