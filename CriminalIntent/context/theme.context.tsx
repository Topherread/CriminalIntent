import { createContext } from "react";

const ThemeContext = createContext('lightblue');
export const ThemeProvider = ThemeContext.Provider;

export default ThemeContext;