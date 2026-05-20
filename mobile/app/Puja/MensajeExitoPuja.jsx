import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeedbackScreen from '../../components/FeedbackScreen';

export default function MensajeExitoPuja() {
  const navigation = useNavigation();
  
  return (
    <FeedbackScreen 
      text="¡Has ganado la subasta!"
      onPress={() => navigation.navigate('SeguimientoPuja')}
    />
  );
}