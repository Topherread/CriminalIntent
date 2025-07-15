import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import ThemeContext from "../context/theme.context";

interface MainButtonProps {
  title: string;
  onPress: () => void;
}

const MainButton = ({ title, onPress }: MainButtonProps) => {
  const { theme } = useContext(ThemeContext);
  
  const dynamicStyles = StyleSheet.create({
    button: {
      backgroundColor: theme.Colors.text,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: theme.Colors.text,
      marginVertical: 10,
      ...theme.Shadow,
    },
    buttonText: {
      color: theme.Colors.background,
      fontSize: 20,
      textAlign: "center",
      fontWeight: "bold",
    },
  });

  return (
    <Pressable style={dynamicStyles.button} onPress={onPress}>
      <Text style={dynamicStyles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default MainButton;
