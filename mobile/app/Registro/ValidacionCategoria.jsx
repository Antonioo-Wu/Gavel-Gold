import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeedbackScreen from '../../components/FeedbackScreen';

export default function ValidacionCategoria() {
  const navigation = useNavigation();

  return (
    <FeedbackScreen 
      text={"¡Se le ha asignado\nla categoría\n'Común'!\n\n\n\nA continuación, se le\npedirá crear una\ncontraseña para su\ncuenta."} 
      onPress={() => navigation.navigate('GenerarPassword')}
    />
  );
}