import React from 'react';
import GenericBidPopup from '../../../components/GenericBidPopup';


export default function PopupPujaExitosa({ visible, onClose }) {
  return (
    <GenericBidPopup 
      visible={visible}
      onClose={onClose}
      type="success"
      title="Puja Exitosa"
      // El texto incluye un salto de línea (\n) para respetar tu diseño
      subtitle={"Se ha aceptado y cargado su puja.\n¡Le deseamos mucha suerte!"}
      // Le agregamos un botón simple para que el usuario pueda cerrarlo
      buttonText="Aceptar" 
    />
  );
}