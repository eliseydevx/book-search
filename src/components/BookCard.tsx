import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Book } from "../models/Book";

interface Props {
  book: Book;
}

function BookCard({ book }: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <CardMedia
        image={book.thumbnail}
        title={book.title}
        style={{ height: 200, objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="h6">{book.title}</Typography>
        <Typography variant="subtitle2">
          {book.authors.length ? book.authors[0] : ""} · {book.categories[0]}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BookCard;
