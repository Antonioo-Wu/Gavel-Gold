import React from 'react';
import GenericErrorScreen from '../../components/GenericErrorScreen'; // Ajustá la ruta según tu estructura

export default function ErrorSaldo() {
  return (
    <GenericErrorScreen 
      title="Saldo insuficiente o multa pendiente."
      errorIcon={require('../../assets/errores/alert.png')}
      description="Verificá tus medios de pago en tu perfil para seguir participando."
    />
  );
}