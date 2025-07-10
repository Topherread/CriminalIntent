import { FlatList, Text, View } from "react-native";
import { useContext } from "react";
import ThemeContext from "../context/theme.context";
import CriminalActivityList from "../components/CriminalActivityList";

export default function Index() {
  const theme = useContext(ThemeContext);

  return (
      <CriminalActivityList />
  );
}
