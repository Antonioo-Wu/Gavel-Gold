import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeedbackScreen from '../../components/FeedbackScreen';

export default function RecuperoExito() {
  const navigation = useNavigation();

  return (
    <FeedbackScreen
      text={"Listo\nRecibirá un mail\ncon los pasos a\nseguir"}
      onPress={() => navigation.navigate('Login')}
    />
  );
}