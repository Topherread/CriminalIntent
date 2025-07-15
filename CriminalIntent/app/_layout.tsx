import { Stack } from "expo-router";
import { ThemeProvider } from "../context/theme.context";
import { initializeDatabase } from '../services/crimedatabase';
import { useEffect, useContext } from 'react';
import { StatusBar } from "react-native";
import ThemeContext from "../context/theme.context";

function AppContent() {
  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <>
      <StatusBar barStyle={theme.Colors.background === "black" || theme.Colors.background === "#1f1137" ? "light-content" : "dark-content"} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.Colors.header, 
          },
          headerTintColor: theme.Colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: theme.Colors.text,
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Criminal Intent" }} />
        <Stack.Screen name="crime/crime" options={{ title: "Create Crime" }} />
        <Stack.Screen name="crime/[id]" options={{ title: "Edit Crime" }} />
        <Stack.Screen name="crime/theme" options={{ title: "Select Theme" }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
