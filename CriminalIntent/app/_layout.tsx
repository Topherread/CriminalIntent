import { Stack } from "expo-router";
import ThemeContext from "../context/theme.context";
import { initializeDatabase } from '../services/crimedatabase';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    initializeDatabase();
  }, []);
  return (
    <ThemeContext.Provider value="lightblue">
      <Stack>
        <Stack.Screen name="index" options={{ title: "Criminal Intent" }} />
        <Stack.Screen name="crime/crime" options={{ title: "Create Crime" }} />
        <Stack.Screen name="crime/[id]" options={{ title: "Edit Crime" }} />
      </Stack>
    </ThemeContext.Provider>
  );
}
