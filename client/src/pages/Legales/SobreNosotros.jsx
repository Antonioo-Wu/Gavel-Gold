import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../../components/ActionButton';

export default function SobreNosotros() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F8FAF8' }}>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '28px', color: '#1A1A1A', marginBottom: '24px', lineHeight: '1.2' }}>
          Sobre Nosotros
        </h1>
        
        <p style={{ fontSize: '14px', color: '#333', marginBottom: '16px', lineHeight: '1.6' }}>
          En <b>Gavel & Gold</b>, fusionamos el prestigio y la emoción de las casas de subastas tradicionales con la inmediatez de la tecnología digital. Nacimos con la visión de democratizar el acceso a piezas únicas, obras de arte, artículos de diseñador y coleccionables, permitiendo a postores de todo el mundo participar en tiempo real en nuestras subastas físicas presenciales.
        </p>

        <p style={{ fontSize: '14px', color: '#333', lineHeight: '1.6' }}>
          Nuestro sistema garantiza un entorno seguro, transparente y altamente competitivo. A través de un riguroso proceso de validación de usuarios y piezas, aseguramos que cada transacción cumpla con los más altos estándares de calidad y legalidad. Ya sea que busques adquirir tu próxima gran inversión o desees postular un bien preciado para que encuentre un nuevo hogar, Gavel & Gold te ofrece una plataforma integral, respaldo asegurado y asistencia continua en cada golpe de martillo.
        </p>
      </div>

      <div style={{ padding: '24px', backgroundColor: '#F8FAF8', boxShadow: '0 -4px 10px rgba(0,0,0,0.05)' }}>
        <ActionButton text="Volver" variant="solid" onClick={() => navigate(-1)} />
      </div>

    </div>
  );
}