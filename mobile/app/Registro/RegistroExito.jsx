import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeedbackScreen from '../../components/FeedbackScreen';


export default function RegistroExito() {
  const navigation = useNavigation();

  return (
    <FeedbackScreen
      text={"¡Has creado tu cuenta exitosamente!"}
      onPress={() => navigation.navigate('Perfil')}
    />
  );
}