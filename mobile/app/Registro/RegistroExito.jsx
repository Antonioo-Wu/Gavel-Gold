import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeedbackScreen from '../../components/FeedbackScreen';

export default function RegistroExito() {
  const navigation = useNavigation();

  const handleFinalizarRegistro = () => {
    navigation.navigate('ListadeSubastas'); 
  };

  return (
    <FeedbackScreen
      text={"¡Has finalizado la creación de tu cuenta con éxito!\n\nRecuerda que un administrador debe validar tu método de pago antes de que puedas pujar.\n\nYa puedes navegar por la app."}
      onPress={handleFinalizarRegistro}
    />
  );
}