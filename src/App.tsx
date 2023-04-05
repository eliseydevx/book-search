import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { observer } from "mobx-react";
import { useStores } from "./hooks/useStores";
import { Filters } from "./models/Filters";
import BookDetails from "./pages/BookDetail";
import Main from "./pages/Main";

function App() {
  const booksStore = useStores();

  const handleSearch = (filters: Filters) => {
    booksStore.setFilters(filters);
  };

  return (
    <Router>
      <Container>
        <Routes>
          <Route
            path="/book-search"
            element={<Main handleSearch={handleSearch} />}
          ></Route>
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default observer(App);
