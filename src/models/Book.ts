export interface Book {
  id: string;
  title: string;
  authors: string[];
  categories: string[];
  thumbnail?: string;
  description?: string;
}
