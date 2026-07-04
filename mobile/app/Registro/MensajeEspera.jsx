import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeedbackScreen from '../../components/FeedbackScreen';

export default function MensajeEspera() {
  const navigation = useNavigation();

  return (
    <FeedbackScreen
      text={"¡Registro completado!\n\nTu cuenta está a la espera de la aprobación de un administrador.\n\nUna vez aprobada, recibirás un correo con tu código de activación."}
      onPress={() => navigation.navigate('Login')}
    />
  );
}