import React from "react";
import MainButton from "@/components/MainButton";
import TextInput from "@/components/TextInput";
import { View, Text, StyleSheet } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";

const CrimeSetup = () => {
  let crime = { Title: "", Details: "", Date: new Date() };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crime Details</Text>
      <TextInput
        placeholder="Enter crime title"
        value={crime.Title}
        onChangeText={(text) => (crime.Title = text)}
      />
      <TextInput
        placeholder="Enter crime details"
        value={crime.Details}
        onChangeText={(text) => (crime.Details = text)}
      />
      <DatePicker
        value={crime.Date}
        onChange={(date) => (crime.Date = date)}
      />
      <MainButton title="Submit Crime" onPress={() => console.log("Crime submitted")} />
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