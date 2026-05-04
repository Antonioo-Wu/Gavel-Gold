import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../components/FormCard';
import CustomInput from '../components/CustomInput';
import ActionButton from '../components/ActionButton';

export default function MetodoPagoTarjeta() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#1E1B16', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>
      <FormCard>
        <h2 style={{ marginTop: 0, color: '#1A1A1A' }}>Ingrese sus datos</h2>
        <p style={{ fontSize: '12px', color: '#555', marginBottom: '24px' }}>Todos los campos son obligatorios</p>
        
        <CustomInput label="Número de tarjeta" placeholder="Ingrese el número de la tarjeta" type="number" />
        
        {/* Para la fecha de vencimiento podemos simular los dos campos */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ flex: 1 }}><CustomInput label="Fecha de vencimiento" placeholder="MM" type="number" /></div>
          <div style={{ flex: 1 }}><CustomInput label=" " placeholder="YYYY" type="number" /></div>
        </div>

        <CustomInput label="Código de seguridad (CVI)" placeholder="Ingrese el código de seguridad" type="number" />
        <CustomInput label="País" placeholder="Ingrese el país de emisión" />

        {/* Al continuar, lo devolvemos a la pantalla de selección por si quiere agregar otro */}
        <ActionButton text="Continuar" variant="solid" onClick={() => navigate('/seleccionar-pago')} />
      </FormCard>
    </div>
  );
}