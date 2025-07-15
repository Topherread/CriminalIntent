import { Text, View, Pressable, StyleSheet, Alert } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";
import { deleteCrime } from "../services/crimedatabase";
import { useContext } from "react";
import ThemeContext from "../context/theme.context";

interface Crime {
  id?: string;
  title: string;
  details: string;
  date: string | Date;
  solved?: boolean;
  image?: string | null;
  createdAt?: string;
}

const CrimeCard = ({ crime, onCrimeDeleted }: { crime: Crime, onCrimeDeleted?: () => void }) => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  
  const handleDelete = () => {
    Alert.alert(
      "Delete Crime",
      "Are you sure you want to delete this crime?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            try {
              if (crime.id) {
                deleteCrime(crime.id);
                onCrimeDeleted?.(); 
              } else {
                Alert.alert("Error", "Crime ID not found");
              }
            } catch (error) {
              console.error("Error deleting crime:", error);
              Alert.alert("Error", "Failed to delete crime");
            }
          }
        }
      ]
    );
  };
  
  const dynamicStyles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.Colors.background,
      marginVertical: 4,
      marginHorizontal: 8,
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: theme.Colors.border,
    },
    crimeContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 4,
      color: theme.Colors.text,
    },
    details: {
      fontSize: 14,
      color: theme.Colors.text,
      marginBottom: 2,
    },
    date: {
      fontSize: 12,
      color: theme.Colors.text,
    },
    deleteButton: {
      padding: 8,
      marginLeft: 8,
    },
  });
  
  return (
    <View style={dynamicStyles.container}>
      <Pressable 
        style={dynamicStyles.crimeContent}
        onPress={() => {
          if (crime.id) {
            router.push(`/crime/${crime.id}`);
          }
        }}
      >
        <View>
          <Text style={dynamicStyles.title}>{crime.title || "Untitled Crime"}</Text>
          <Text style={dynamicStyles.date}>Date: {crime.date ? String(crime.date) : "No date"}</Text>
        </View>
        {Boolean(crime.solved) && (
          <MaterialCommunityIcons name="handcuffs" size={24} color={theme.Colors.text} />
        )}
      </Pressable>
      
      <Pressable style={dynamicStyles.deleteButton} onPress={handleDelete}>
        <MaterialCommunityIcons name="delete" size={20} color="red" />
      </Pressable>
    </View>
  );
}

export default CrimeCard;