import { FlatList } from "react-native";
import CrimeCard from "./CrimeCard";

const CriminalActivityList = () => {

  return (
    <FlatList
      data={[{ crime: { id: '1', type: 'Theft', time: '12:00 PM' } }, { crime: { id: '2', type: 'Burglary', time: '1:00 PM' } }, { crime: { id: '3', type: 'Assault', time: '2:00 PM' } }]}
      renderItem={({ item }) => <CrimeCard crime={item.crime} />}
      keyExtractor={item => item.crime.id}
    />
  );
}

export default CriminalActivityList;