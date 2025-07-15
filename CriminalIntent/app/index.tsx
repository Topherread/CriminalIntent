import { Text, View, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import ThemeContext from "../context/theme.context";
import CriminalActivityList from "../components/CriminalActivityList";
import { useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Stack } from "expo-router";

export default function Index() {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  
  const handleThemeSelector = () => {
    router.push("/crime/theme");
  };

  const handleCreateCrime = () => {
    router.push("/crime/crime");
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.Colors.background,
    },
    addButton: {
      width: 36,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
      backgroundColor: theme.Colors.background,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.Colors.border,
      ...theme.Shadow,
    },
  });

  return (
    <>
      <Stack.Screen 
        options={{
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Pressable style={dynamicStyles.addButton} onPress={handleThemeSelector}>
                <AntDesign name="setting" size={20} color={theme.Colors.text} />
              </Pressable>
              <Pressable style={dynamicStyles.addButton} onPress={handleCreateCrime}>
                <AntDesign name="plus" size={20} color={theme.Colors.text} />
              </Pressable>
            </View>
          ),
        }}
      />
      <View style={dynamicStyles.container}>
        <CriminalActivityList />
      </View>
    </>
  );
}

