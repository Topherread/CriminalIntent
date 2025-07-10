import { FlatList, Text, View, StyleSheet } from "react-native";
import { useContext } from "react";
import ThemeContext from "../context/theme.context";
import CriminalActivityList from "../components/CriminalActivityList";
import MainButton from "../components/MainButton";
import { useRouter } from "expo-router";

export default function Index() {
  const theme = useContext(ThemeContext);
  const router = useRouter();

  const handleCreateCrime = () => {
    router.push("/crime");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Criminal Intent</Text>
        <MainButton 
          title="Create Crime" 
          onPress={handleCreateCrime}
        />
      </View>
      <CriminalActivityList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});
