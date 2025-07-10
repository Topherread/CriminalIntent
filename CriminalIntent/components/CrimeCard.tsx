import { Text, View,  Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";

const CrimeCard = ({ crime }) => {
  const router = useRouter();
  
  return (
    <Pressable onPress={() => router.push("/crime")}>
        <View>
            <Text>{crime.title}</Text>
            <Text>Details: {crime.details}</Text>
            <Text>Date: {crime.date}</Text>
            <MaterialCommunityIcons name="handcuffs" size={24} color="black" />
        </View>
    </Pressable>
  );
}

export default CrimeCard;