import React from "react";
import {Pressable, Text, TextInput, StyleSheet } from "react-native";

const CustomTextInput = ({ value, onChangeText, placeholder }) => {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.placeholder}>{placeholder}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginVertical: 12,
  },
  placeholder: {
    color: "#aaa",
  },
  input: {
    fontSize: 16,
  },
});

export default CustomTextInput;
