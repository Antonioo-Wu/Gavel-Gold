import React from 'react';
import FeedbackScreen from '../../components/FeedbackScreen';


export default function RegistroExito() {
  return (
    <FeedbackScreen 
      text={"¡Has creado tu\ncuenta\nexitosamente!"} 
      navigateTo="/perfil" // Al tocar, te lleva al perfil
    />
  );
}