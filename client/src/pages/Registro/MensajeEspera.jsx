import React from 'react';
import FeedbackScreen from '../../components/FeedbackScreen';


export default function MensajeEspera() {
  return (
    <FeedbackScreen 
      text={"\n\n¡Tu cuenta está en revisión!\nPronto recibirás una notificación por correo."} 
      navigateTo="/login" 
    />
  );
}