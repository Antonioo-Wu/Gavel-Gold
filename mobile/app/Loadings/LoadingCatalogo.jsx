import React from 'react';
import GenericLoadingScreen from '../../components/GenericLoadingScreen';

export default function LoadingCatalogo() {
  return (
    <GenericLoadingScreen 
      loadingText={"Cargando catálogo de subastas..."} 
    />
  );
}