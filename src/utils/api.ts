import axios from "axios";
import { Book } from "../models/Book";
import { Filters } from "../models/Filters";

interface BookResponse {
  items: {
    volumeInfo: {
      title: string;
      authors?: string[];
      categories?: string[];
      imageLinks?: { thumbnail?: string };
      description?: string;
    };
    id: string;
  }[];
}

const API_KEY = "AIzaSyCojoPNi4f3WmmueWTc1pSJ2vUTVWMUYnQ";

const API_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (filters: Filters): Promise<Book[] | null> => {
  try {
    if (!filters.query) {
      throw new Error("Search query is required");
    }

    const params = new URLSearchParams({
      q: filters.query,
      startIndex: filters.startIndex.toString(),
      maxResults: "30",
      orderBy: filters.sorting,
      filter: "paid-ebooks",
      printType: "books",
      langRestrict: "en",
      fields:
        "totalItems,items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/categories,volumeInfo/imageLinks/thumbnail,volumeInfo/description)",
      key: API_KEY,
    });

    if (filters.category !== "all") {
      params.append("subject", filters.category);
    }

    const response = await axios.get<BookResponse>(API_URL, { params });

    if (response.status !== 200) {
      throw new Error("Failed to fetch books");
    }

    return (
      response.data.items?.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        categories: item.volumeInfo.categories?.slice(0, 1) || [],
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
        description: item.volumeInfo.description || "",
      })) ?? null
    );
  } catch (error: any) {
    throw error;
  }
};
