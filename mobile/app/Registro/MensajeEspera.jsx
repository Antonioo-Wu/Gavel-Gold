import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeedbackScreen from '../../components/FeedbackScreen';

export default function MensajeEspera() {
  const navigation = useNavigation();

  return (
    <FeedbackScreen
      text={"\n\n¡Tu cuenta está en revisión!\nPronto recibirás una notificación por correo."}
      onPress={() => navigation.navigate('Login')}
    />
  );
}