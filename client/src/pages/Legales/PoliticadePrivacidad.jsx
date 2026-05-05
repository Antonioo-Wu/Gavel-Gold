import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../../components/ActionButton';

export default function PoliticaPrivacidad() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F8FAF8' }}>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '28px', color: '#1A1A1A', marginBottom: '16px', lineHeight: '1.2' }}>
          Política de<br/>Privacidad
        </h1>
        
        <p style={{ fontSize: '14px', color: '#333', marginBottom: '24px', lineHeight: '1.5' }}>
          En Gavel & Gold, la privacidad y seguridad de sus datos son nuestra prioridad. Esta política describe cómo recopilamos, utilizamos y protegemos su información:
        </p>

        <ol style={{ paddingLeft: '16px', fontSize: '14px', color: '#333', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <li>
            <b>Datos Recopilados:</b> Recopilamos información personal identificable (nombre, documento de identidad, domicilio legal) e información financiera proporcionada para validar su capacidad de puja (cuentas bancarias, tarjetas o cheques).
          </li>
          <li>
            <b>Uso de la Información:</b> Sus datos son utilizados para realizar una investigación externa obligatoria y aprobar su registro. La información financiera se usa exclusivamente para validar los fondos para participar en subastas y procesar cobros en caso de resultar ganador.
          </li>
          <li>
            <b>Compartición de Datos:</b> Gavel & Gold puede compartir su información con entidades de verificación externas únicamente para validar su identidad. En caso de duda sobre el origen lícito de un bien o incumplimiento de pago, la Empresa notificará a las autoridades competentes.
          </li>
          <li>
            <b>Seguridad de los Datos:</b> Toda la información intercambiada en la plataforma, incluyendo las pujas en tiempo real, se procesa mediante sistemas seguros integrados con nuestra infraestructura local.
          </li>
        </ol>
      </div>

      <div style={{ padding: '24px', backgroundColor: '#F8FAF8', boxShadow: '0 -4px 10px rgba(0,0,0,0.05)' }}>
        <ActionButton text="Volver" variant="solid" onClick={() => navigate(-1)} />
      </div>

    </div>
  );
}