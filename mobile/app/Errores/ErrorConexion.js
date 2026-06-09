import React from 'react';
import GenericErrorScreen from '../../components/GenericErrorScreen';


export default function ErrorConexion() {
  return (
    <GenericErrorScreen 
      title="Se perdió la conexión con la sala. Intentando reconectar..."
      errorIcon={require('../../assets/errores/error_internet.png')}
    />
  );
}