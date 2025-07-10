import { Stack } from "expo-router";
import ThemeContext from "../context/theme.context";

export default function RootLayout() {
  return <ThemeContext.Provider value="lightblue"><Stack /></ThemeContext.Provider>;
}
