import { Text, View,  Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";

const CrimeCard = ({ crime }) => {
  const router = useRouter();
  
  return (
    <Pressable onPress={() => router.push("/crime")} style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
            <Text>{crime.title}</Text>
            <Text>Details: {crime.details}</Text>
            <Text>Date: {crime.date}</Text>
        </View>
        <MaterialCommunityIcons name="handcuffs" size={24} color="black" />
    </Pressable>
  );
}

export default CrimeCard;