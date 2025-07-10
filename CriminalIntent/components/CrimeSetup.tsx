import React from "react";
import { useState } from "react";
import MainButton from "@/components/MainButton";
import TextInput from "@/components/TextInput";
import { View, Text, StyleSheet } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { insertCrime } from "../services/database";

const CrimeSetup = () => {
  const [crime, setCrime] = useState({
    title: "",
    details: "",
    date: new Date(),
  });
  const router = useRouter();
  const handleSubmit = () => {
    try {
      const crimeId = insertCrime(crime);
      console.log("Crime saved with ID:", crimeId);
      router.back();
    } catch (error) {
      console.error("Error saving crime:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crime Details</Text>
      <TextInput
        placeholder="Enter crime title"
        value={crime.title}
        onChangeText={(text) => setCrime({...crime, title: text})}
      />
      <TextInput
        placeholder="Enter crime details"
        value={crime.details}
        onChangeText={(text) => setCrime({...crime, details: text})}
      />
      <DatePicker
        value={crime.date}
        onChange={(event, date) => setCrime({...crime, date: date || new Date()})}
      />
      <MainButton title="Submit Crime" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default CrimeSetup;