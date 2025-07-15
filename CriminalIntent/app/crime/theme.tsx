import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ThemeContext from '../../context/theme.context';
import MainButton from '../../components/MainButton';

export default function ThemeSelection() {
  const { theme, setTheme } = useContext(ThemeContext);

  const availableThemes = [
    { key: 'white', name: 'White Theme' },
    { key: 'blue', name: 'Blue Theme' },
    { key: 'yellow', name: 'Yellow Theme' },
    { key: 'black', name: 'Black Theme' },
    { key: 'purple', name: 'Purple Theme' }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.Colors.background }]}>
      <Text style={[styles.title, { color: theme.Colors.text }]}>
        Select a Theme
      </Text>
      
      <FlatList
        data={availableThemes}
        renderItem={({ item }) => (
          <MainButton
            title={item.name}
            onPress={() => setTheme(item.key)}
          />
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});