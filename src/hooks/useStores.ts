import { BooksStore } from "../store/BooksStore";
import { createContext, useContext } from "react";

const storesContext = createContext<BooksStore>(new BooksStore());

export const useStores = () => useContext(storesContext);
