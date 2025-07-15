import React from "react";
import { useEffect, useContext } from "react";
import MainButton from "@/components/MainButton";
import TextInput from "@/components/TextInput";
import { View, Text, StyleSheet, Alert, Pressable, Image, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from 'expo-checkbox';
import { insertCrime } from "../services/crimedatabase";
import { getCrimeById, updateCrime } from "../services/crimedatabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import Entypo from '@expo/vector-icons/Entypo';
import ThemeContext from "../context/theme.context";

const CrimeSetup = ({crimeId}: {crimeId?: string}) => {
  const { theme } = useContext(ThemeContext);
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
  const [showDatePicker, setShowDatePicker] = useState(false);
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
  }

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.Colors.background,
    },
    topSection: {
      flexDirection: 'row',
      marginBottom: 20,
      height: 180,
    },
    imageSection: {
      flex: 1,
      marginRight: 16,
    },
    titleSection: {
      flex: 2,
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.Colors.text,
      marginBottom: 8,
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 12,
    },
    crimeImage: {
      width: '100%',
      height: 120,
      borderRadius: 8,
    },
    placeholderImage: {
      width: '100%',
      height: 120,
      backgroundColor: '#d3d3d3',
      borderRadius: 8,
      borderWidth: 2,
      borderColor: theme.Colors.border,
      borderStyle: 'dashed',
    },
    imageButton: {
      backgroundColor: theme.Colors.text,
      paddingHorizontal: 24,
      paddingVertical: 8,
      borderRadius: 6,
      alignSelf: 'center',
      ...theme.Shadow,
    },
    imageButtonText: {
      color: theme.Colors.background,
      fontSize: 12,
      fontWeight: '600',
      textAlign: 'center',
    },
    formSection: {
      flex: 1,
    },
    inputContainer: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 24,
      fontWeight: "600",
      marginBottom: 8,
      color: theme.Colors.text,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 16,
    },
    checkboxText: {
      marginLeft: 8,
      color: theme.Colors.text,
      fontSize: 16,
    },
    dateButton: {
      backgroundColor: theme.Colors.text,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: theme.Colors.text,
      marginVertical: 10,
      ...theme.Shadow,
    },
    dateButtonText: {
      color: theme.Colors.background,
      fontSize: 20,
      textAlign: "center",
      fontWeight: "bold",
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.topSection}>
        <View style={dynamicStyles.imageSection}>
          <View style={dynamicStyles.imageContainer}>
            {crime.image ? (
              <Image source={{ uri: crime.image }} style={dynamicStyles.crimeImage} />
            ) : (
              <View style={dynamicStyles.placeholderImage} />
            )}
          </View>
          <Pressable onPress={pickImage} style={dynamicStyles.imageButton}>
            <Text style={dynamicStyles.imageButtonText}>
              <Entypo name="camera" size={30} color={theme.Colors.background} />
            </Text>
          </Pressable>
        </View>
        <View style={dynamicStyles.titleSection}>
             <View style={dynamicStyles.inputContainer}>
          <Text style={dynamicStyles.inputLabel}>Title</Text>
          <TextInput
            placeholder="Crime title"
            value={crime.title}
            onChangeText={(text: string) => setCrime({...crime, title: text})}
          />
        </View>
        </View>
      </View>
      <View style={dynamicStyles.formSection}> 
        <View style={dynamicStyles.inputContainer}>
          <Text style={dynamicStyles.inputLabel}>Details</Text>
          <TextInput
            placeholder="What happened?"
            value={crime.details}
            onChangeText={(text: string) => setCrime({...crime, details: text})}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        
        <View style={dynamicStyles.checkboxContainer}>
          <Checkbox
            value={crime.solved}
            onValueChange={(value: boolean) => setCrime({...crime, solved: value})}
          />
          <Text style={dynamicStyles.checkboxText}>Solved</Text>
        </View>
        
        <Pressable 
          style={dynamicStyles.dateButton} 
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={dynamicStyles.dateButtonText}>
            {crime.date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={crime.date}
            mode="date"
            display="default"
            onChange={(event, date) => {
              if (event.type === 'set' && date) {
                setCrime({...crime, date: date});
                setShowDatePicker(false);
              } else if (event.type === 'dismissed') {
                setShowDatePicker(false);
              }
            }}
          />
        )}
        
        <MainButton title="Save" onPress={handleSubmit}/>
      </View>
    </View>
  );
};

export default CrimeSetup;