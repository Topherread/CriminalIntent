import { Stack } from "expo-router";
import ThemeContext from "../context/theme.context";
import { initializeDatabase } from '../services/database';
import { useEffect } from 'react';

export default function RootLayout() {
   useEffect(() => {
    initializeDatabase();
  }, []);
  return <ThemeContext.Provider value="lightblue"><Stack /></ThemeContext.Provider>;
}
