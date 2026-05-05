import React from 'react';
import FeedbackScreen from '../../components/FeedbackScreen';

export default function CreacionBienExito() {
  return (
    <FeedbackScreen 
      text={"🎉\n\n¡Has\ningresado\ntu bien a\nsubastar!"} 
      navigateTo="/subastas" // Al tocar, te devuelve al inicio
    />
  );
}