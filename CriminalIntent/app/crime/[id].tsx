import { useLocalSearchParams } from 'expo-router';
import CrimeSetup from '@/components/CrimeSetup';

export default function EditCrime() {
  const { id } = useLocalSearchParams();
  
  const crimeId = Array.isArray(id) ? id[0] : id;
  
  return <CrimeSetup crimeId={crimeId} />;
}