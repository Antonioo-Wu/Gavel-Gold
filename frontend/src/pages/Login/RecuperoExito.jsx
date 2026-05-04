import React from 'react';
import FeedbackScreen from '../../components/FeedbackScreen';

export default function RecuperoExito() {
  return (
    <FeedbackScreen 
      text={"Listo\nRecibirá un mail\ncon los pasos a\nseguir"} 
      navigateTo="/login" 
    />
  );
}