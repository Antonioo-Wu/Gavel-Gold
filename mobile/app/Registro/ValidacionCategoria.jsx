import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FeedbackScreen from '../../components/FeedbackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ValidacionCategoria() {
  const navigation = useNavigation();
  const [categoria, setCategoria] = useState('comun');

  useEffect(() => {
    const obtenerCategoria = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const usuario = JSON.parse(userDataString);
          if (usuario.categoria) {
            const category = usuario.categoria.charAt(0).toUpperCase() + usuario.categoria.slice(1);
            setCategoria(category);
          }
        }
      } catch (error) {
        console.error("Error leyendo datos del usuario", error);
      }
    };

    obtenerCategoria();
  }, []);

  return (
    <FeedbackScreen
      text={`¡Se le ha asignado la categoría '${categoria}'!\n\nRevise su casilla de correo para obtener su código de activación.`}
      onPress={() => navigation.navigate('GenerarPassword')}
    />
  );
}