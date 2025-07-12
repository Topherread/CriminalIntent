import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import ThemeContext from "../context/theme.context";
import CriminalActivityList from "../components/CriminalActivityList";
import MainButton from "../components/MainButton";
import { useRouter } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack } from "expo-router";

export default function Index() {
  const theme = useContext(ThemeContext);
  const router = useRouter();

  const handleCreateCrime = () => {
    router.push("/crime/crime");
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: "Criminal Intent",
          headerRight: () => (
            <Pressable style={styles.addButton} onPress={handleCreateCrime}>
              <MaterialIcons name="add" size={24} color="white" />
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <CriminalActivityList />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});
