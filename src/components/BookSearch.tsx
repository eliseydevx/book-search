import { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { useStores } from "../hooks/useStores";
import { Filters } from "../models/Filters";

interface Props {
  onSearch: (filter: Filters) => void;
}

function BookSearch({ onSearch }: Props) {
  const booksStore = useStores();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sorting, setSorting] = useState("relevance");

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategory(event.target.value as string);
  };

  const handleSortingChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSorting(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch({ query, category, sorting, startIndex: 0 });
    booksStore.fetchBooks({ query, category, sorting, startIndex: 0 });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      style={{
        margin: "auto 0",
        display: "flex",
        justifyContent: "space-between",
        padding: "25px 0 25px 0",
      }}
    >
      <TextField
        id="query"
        label="Search books"
        variant="outlined"
        value={query}
        onChange={handleQueryChange}
        sx={{}}
      />
      <TextField
        id="category"
        select
        label="Category"
        variant="outlined"
        value={category}
        onChange={handleCategoryChange}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="art">Art</MenuItem>
        <MenuItem value="biography">Biography</MenuItem>
        <MenuItem value="computers">Computers</MenuItem>
        <MenuItem value="history">History</MenuItem>
        <MenuItem value="medical">Medical</MenuItem>
        <MenuItem value="poetry">Poetry</MenuItem>
      </TextField>
      <TextField
        id="sorting"
        select
        label="Sorting"
        variant="outlined"
        value={sorting}
        onChange={handleSortingChange}
      >
        <MenuItem value="relevance">Relevance</MenuItem>
        <MenuItem value="newest">Newest</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </form>
  );
}

export default BookSearch;
