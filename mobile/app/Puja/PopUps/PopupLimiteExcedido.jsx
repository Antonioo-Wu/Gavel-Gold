import React from 'react';
import GenericBidPopup from '../../../components/GenericBidPopup';

export default function PopupLimiteExcedido({ visible, onClose, maxAmount }) {
  return (
    <GenericBidPopup 
      visible={visible}
      onClose={onClose}
      type="error"
      title="Puja Inválida"
      subtitle="Error de Puja debido al Monto: ¡Puja Rechazada!"
      description="Tu oferta no debe superar el valor actual por más del 20%."
      dynamicText={`Máximo permitido: $${maxAmount}`}
      buttonText="Cerrar y Ajustar Puja"
    />
  );
}