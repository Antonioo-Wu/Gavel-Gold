import React from 'react';
import GenericLoadingScreen from '../../components/GenericLoadingScreen';

export default function LoadingSubirArticulo() {
  return (
    <GenericLoadingScreen 
      loadingText={"Subiendo imágenes e información del artículo..."} 
    />
  );
}