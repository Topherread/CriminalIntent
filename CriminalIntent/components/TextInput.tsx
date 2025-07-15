import React from "react";
import { Pressable, Text, TextInput, StyleSheet } from "react-native";
import { useContext } from "react";
import ThemeContext from "../context/theme.context";

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  numberOfLines?: number;
}

const CustomTextInput = ({ value, onChangeText, placeholder, multiline = false, numberOfLines = 1 }: CustomTextInputProps) => {
  const { theme } = useContext(ThemeContext);
  
  const dynamicStyles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.Colors.border,
      borderRadius: 8,
      padding: 12,
      marginVertical: 12,
      backgroundColor: theme.Colors.background,
    },
    placeholder: {
      color: theme.Colors.text,
      fontSize: 14,
      marginBottom: 4,
      fontWeight: "500",
    },
    input: {
      fontSize: 16,
      color: theme.Colors.text,
      minHeight: multiline ? numberOfLines * 20 : 20,
      textAlignVertical: multiline ? 'top' : 'center',
    },
  });

  return (
    <Pressable style={dynamicStyles.container}>
      <TextInput
        style={dynamicStyles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.Colors.border}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </Pressable>
  );
};

export default CustomTextInput;
