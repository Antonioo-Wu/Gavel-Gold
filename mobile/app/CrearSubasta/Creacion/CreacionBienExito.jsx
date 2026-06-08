import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeedbackScreen from '../../../components/FeedbackScreen';

export default function CreacionBienExito() {
  const navigation = useNavigation();

  return (
    <FeedbackScreen
      text="¡Has ingresado tu bien subastar!"
      onPress={() => navigation.navigate('ListadeSubastas')}
    />
    
  );
}