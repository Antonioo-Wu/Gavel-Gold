import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';

export default function MetodoPagoTarjeta() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#1E1B16', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '24px' }}>Método de Pago - Tarjeta de Crédito</h1>
      <FormCard>
        <h2 style={{ marginTop: 0, color: '#1A1A1A' }}>Ingrese sus datos</h2>
        <p style={{ fontSize: '11px', color: '#777', marginBottom: '20px' }}>Todos los campos son obligatorios.</p>
        
        <CustomInput label="Número de tarjeta" placeholder="Ingrese el número de la tarjeta" type="number" />
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <CustomInput label="Fecha de vencimiento" placeholder="MM" type="number" />
          </div>
          <div style={{ flex: 1 }}>
            <CustomInput label=" " placeholder="YYYY" type="number" />
          </div>
        </div>

        <CustomInput label="Código de seguridad (CVI)" placeholder="Ingrese el código de seguridad" type="number" />
        <CustomInput label="País" placeholder="Ingrese el país de emisión" />

        <div style={{ marginTop: '20px' }}>
          <ActionButton 
            text="Continuar" 
            variant="solid" 
            onClick={() => navigate('/seleccionar-pago')} 
          />
        </div>
      </FormCard>
    </div>
  );
}