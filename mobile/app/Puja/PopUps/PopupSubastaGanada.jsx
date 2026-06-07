import React from 'react';
import GenericBidPopup from '../../../components/GenericBidPopup';

export default function PopupSubastaGanada({ visible, onClose, itemData }) {
  return (
    <GenericBidPopup
      visible={visible}
      onClose={onClose}
      type="success"
      title="¡Ganaste la Subasta!"
      subtitle={`Artículo ganado: ${itemData?.nombreArticulo || '...'}`}
      description={`Subasta: ${itemData?.titulo || '...'}\nTu oferta final fue de $${itemData?.miOfertaMax?.toLocaleString('es-AR') || '0'}.\nDirígete a tu perfil para gestionar el pago.`}
      buttonText="¡Excelente!"
    />
  );
}