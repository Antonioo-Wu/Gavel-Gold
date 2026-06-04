import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeedbackScreen from '../../components/FeedbackScreen';

export default function RecuperoExito() {
  const navigation = useNavigation();

  return (
    <FeedbackScreen
      text={"Listo Recibirá un mail con los pasos a seguir"}
      onPress={() => navigation.navigate('Login')}
    />
  );
}