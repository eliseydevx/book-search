import { observer } from "mobx-react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useStores } from "../hooks/useStores";
import BookCard from "./BookCard";

function BookList() {
  const booksStore = useStores();

  if (!booksStore.books.length && !booksStore.isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        No books found.
      </div>
    );
  }

  return (
    <div>
      <Grid container spacing={2}>
        {booksStore.books.map((book: any) => (
          <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
      {booksStore.isLoading && <CircularProgress />}
      {booksStore.error && (
        <Typography color="error">{booksStore.error}</Typography>
      )}
    </div>
  );
}

export default observer(BookList);
