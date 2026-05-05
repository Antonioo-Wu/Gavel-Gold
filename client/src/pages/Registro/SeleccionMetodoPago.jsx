import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../../components/FormCard';
import ActionButton from '../../components/ActionButton';

export default function SeleccionMetodoPago() {
  const navigate = useNavigate();

  // Estilo para los botones cuadrados
  const btnStyle = {
    backgroundColor: '#F5F5F5', border: '1px solid #DDD', borderRadius: '8px',
    padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center',
    textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: '#333', 
    cursor: 'pointer', minHeight: '80px'
  };

  return (
    <div style={{ backgroundColor: '#1E1B16', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', justifyContent: 'center' }}>
      <FormCard>
        <h2 style={{ textAlign: 'center', color: '#1A1A1A', marginBottom: '24px', marginTop: 0 }}>
          Añadir un método de pago
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div style={btnStyle} onClick={() => navigate('/pago-cuenta')}>Cuenta bancaria</div>
          <div style={btnStyle} onClick={() => navigate('/pago-tarjeta')}>Tarjeta de crédito</div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ ...btnStyle, width: '50%' }} onClick={() => navigate('/pago-cheque')}>
            Cheque certificado
          </div>
        </div>

        {/* Este botón asume que ya terminó de cargar métodos y avanza al éxito */}
        <ActionButton text="Finalizar" variant="solid" onClick={() => navigate('/registro-exito')} />
      </FormCard>
    </div>
  );
}