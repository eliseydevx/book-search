import { makeAutoObservable } from "mobx";
import { Book } from "../models/Book";
import { Filters } from "../models/Filters";
import { searchBooks } from "../utils/api";

export class BooksStore {
  books: Book[] = [];
  isLoading = false;
  error: string | null = null;

  filters: Filters = {
    query: "",
    category: "all",
    sorting: "relevance",
    startIndex: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setFilters(filters: Filters) {
    this.fetchBooks(filters);
  }

  async fetchBooks(filters: Filters) {
    this.isLoading = true;

    try {
      const booksResponse = await searchBooks(filters);
      if (booksResponse && Array.isArray(booksResponse)) {
        const books = booksResponse.map((item: any) => ({
          id: item.id,
          title: item.title,
          authors: item.authors || [],
          categories: item.categories?.slice(0, 1) || [],
          description: item.description || "",
          thumbnail:
            (item.thumbnail && item.thumbnail.replace("http://", "https://")) ||
            "",
        }));
        this.books = books;
        this.error = null;
      }
    } catch (error: any) {
      this.error = error.toString();
    }

    this.isLoading = false;
  }
}
