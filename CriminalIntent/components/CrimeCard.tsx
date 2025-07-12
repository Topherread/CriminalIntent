import { Text, View, Pressable, StyleSheet, Alert } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";
import { deleteCrime } from "../services/crimedatabase";

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
  
  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.crimeContent}
        onPress={() => crime.id && router.push(`/crime/${crime.id}`)}
      >
        <View>
          <Text style={styles.title}>{crime.title || "Untitled Crime"}</Text>
          <Text style={styles.details}>Details: {crime.details || "No details"}</Text>
          <Text style={styles.date}>Date: {crime.date ? String(crime.date) : "No date"}</Text>
        </View>
        {crime.solved && (
          <MaterialCommunityIcons name="handcuffs" size={24} color="black" />
        )}
      </Pressable>
      
      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <MaterialCommunityIcons name="delete" size={20} color="red" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    padding: 12,
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
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default CrimeCard;