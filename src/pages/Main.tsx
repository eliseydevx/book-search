import { CircularProgress, Typography } from "@mui/material";
import BookList from "../components/BookList";
import BookSearch from "../components/BookSearch";
import { useStores } from "../hooks/useStores";
import { Filters } from "../models/Filters";

type HomeProps = {
  handleSearch: (filters: Filters) => void;
};

function Main({ handleSearch }: HomeProps) {
  const booksStore = useStores();

  return (
    <>
      <BookSearch onSearch={handleSearch} />
      {booksStore.isLoading ? (
        <CircularProgress />
      ) : booksStore.error ? (
        <Typography color="error">{booksStore.error}</Typography>
      ) : (
        <BookList />
      )}
    </>
  );
}

export default Main;
