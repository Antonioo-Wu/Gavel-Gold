import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FeedbackScreen from '../../components/FeedbackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ValidacionCategoria() {
  const navigation = useNavigation();
  const [categoria, setCategoria] = useState('...');

  useEffect(() => {
    const obtenerCategoria = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const usuario = JSON.parse(userDataString);
          const category = usuario.categoria.charAt(0).toUpperCase() + usuario.categoria.slice(1);
          setCategoria(category);
        }
      } catch (error) {
        console.error("Error leyendo datos del usuario", error);
      }
    };

    obtenerCategoria();
  }, []);

  return (
    <FeedbackScreen
      text={"¡Se le ha asignado la categoría '${categoria}'! `\n A continuación, se le pedirá registrar un método de pago."}
      onPress={() => navigation.navigate('SeleccionMetodoPago')}
    />
  );
}