import React from "react";
import { useEffect } from "react";
import MainButton from "@/components/MainButton";
import TextInput from "@/components/TextInput";
import { View, Text, StyleSheet, Alert, Pressable, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from 'expo-checkbox';
import { insertCrime } from "../services/crimedatabase";
import { getCrimeById, updateCrime } from "../services/crimedatabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

const CrimeSetup = ({crimeId}: {crimeId?: string}) => {
  const [crime, setCrime] = useState<{
    title: string;
    details: string;
    solved: boolean;
    date: Date;
    image: string | null;
  }>({
    title: "",
    details: "",
    solved: false,
    date: new Date(),
    image: null 
  });
  const router = useRouter();

  useEffect(() => {
    if (crimeId) {
      const existingCrime = getCrimeById(crimeId) as any;
      if (existingCrime) {
        setCrime({
          title: existingCrime.title || "",
          details: existingCrime.details || "",
          solved: existingCrime.solved || false,
          date: existingCrime.date ? new Date(existingCrime.date) : new Date(),
          image: existingCrime.image || null
        });
      }
    }
  }, [crimeId]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!permissionResult.canceled) {
      setCrime({...crime, image: permissionResult.assets[0].uri});
    }
  };

  const handleSubmit = () => {
      if (crimeId) {
        updateCrime({ ...crime, id: crimeId });
        Alert.alert("Success", "Crime updated successfully!");
      } else {
        insertCrime(crime);
        Alert.alert("Success", "Crime submitted successfully!");
      }
      router.back();
      console.log("Crime submitted:", crime);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {crime.image ? (
          <Image source={{ uri: crime.image }} style={styles.crimeImage} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
      </View>
      <Pressable onPress={pickImage} style={styles.imageButton}>
        <Text style={styles.imageButtonText}>
          {crime.image ? "Change Image" : "Select Image"}
        </Text>
      </Pressable>
      <Text style={styles.title}>Title</Text>
      <TextInput
        placeholder="Title"
        value={crime.title}
        onChangeText={(text: string) => setCrime({...crime, title: text})}
      />
      <Text style={styles.title}>Details</Text>
      <TextInput
        placeholder="What happened?"
        value={crime.details}
        onChangeText={(text: string) => setCrime({...crime, details: text})}
      />
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}>
        <Checkbox
          value={crime.solved}
          onValueChange={(value: boolean) => setCrime({...crime, solved: value})}
        />
        <Text style={{ marginLeft: 8 }}>Is this crime solved?</Text>
      </View>
      <DateTimePicker
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  crimeImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  placeholderImage: {
    width: 200,
    height: 150,
    backgroundColor: '#d3d3d3',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
  },
  imageButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  imageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CrimeSetup;