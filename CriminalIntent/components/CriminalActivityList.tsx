import { FlatList } from "react-native";
import CrimeCard from "./CrimeCard";
import React, { useState } from "react";
import { getAllCrimes } from "@/services/crimedatabase";
import { useFocusEffect } from "@react-navigation/native";

const CriminalActivityList = () => {
  const [crimes, setCrimes] = useState([]);

  const loadCrimes = () => {
    try {
      const allCrimes = getAllCrimes();
      setCrimes(allCrimes);
    } catch (error) {
      console.error("Error loading crimes:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCrimes();
    }, [])
  );

  return (
    <FlatList
      data={crimes}
      renderItem={({ item }) => (
        <CrimeCard 
          crime={item} 
          onCrimeDeleted={loadCrimes}
        />
      )}
      keyExtractor={(item: any, index) => item.id || index.toString()}
    />
  );
};

export default CriminalActivityList;