import { useLocalSearchParams } from 'expo-router';
import CrimeSetup from '@/components/CrimeSetup';

export default function EditCrime() {
  const { id } = useLocalSearchParams();
  return <CrimeSetup crimeId={id} />
}