import React from 'react';
import FeedbackScreen from '../components/FeedbackScreen';

export default function ValidacionCategoria() {
  return (
    <FeedbackScreen 
      text={"¡Se le ha asignado\nla categoría\n'Común'!\n\n\n\nA continuación, se le\npedirá crear una\ncontraseña para su\ncuenta."} 
      navigateTo="/generar-password" 
    />
  );
}