import React from 'react';
import GenericBidPopup from '../../../components/GenericBidPopup';

export default function PopupMontoInsuficiente({ visible, onClose, minAmount }) {
  return (
    <GenericBidPopup 
      visible={visible}
      onClose={onClose}
      type="error"
      title="Puja Inválida"
      subtitle="Error de Puja debido al Monto: ¡Puja Rechazada!"
      description="Tu oferta debe superar el valor actual por al menos un 1%."
      dynamicText={`Mínimo actual requerido: $${minAmount}`}
      buttonText="Cerrar y Ajustar Puja"
    />
  );
}