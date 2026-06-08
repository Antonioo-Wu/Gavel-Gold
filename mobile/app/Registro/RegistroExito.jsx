import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeedbackScreen from '../../components/FeedbackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistroExito() {
  const navigation = useNavigation();

  const handleFinalizarRegistro = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');

    navigation.navigate('Login');
  };

  return (
    <FeedbackScreen
      text={"¡Has creado tu cuenta exitosamente!\n\nInicie sesión con sus credenciales para comenzar a ofertar."}
      onPress={handleFinalizarRegistro}
    />
  );
}