import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';

export default function MetodoPagoCuentaBancaria() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#1E1B16', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '24px' }}>Método de Pago - Cuenta Bancaria</h1>
      <FormCard>
        <h2 style={{ marginTop: 0, color: '#1A1A1A' }}>Ingrese sus datos</h2>
        <p style={{ fontSize: '11px', color: '#777', marginBottom: '20px' }}>Todos los campos son obligatorios.</p>
        
        <CustomInput label="Titular de la cuenta" placeholder="Ingrese su nombre y apellido" />
        <CustomInput label="Número de documento" placeholder="Ingrese su número de documento" />
        <CustomInput label="País de origen de cuenta" placeholder="Ingrese el país de origen de cuenta" />
        <CustomInput label="Banco" placeholder="Ingrese el banco de la cuenta" />
        <CustomInput label="Número de cuenta" placeholder="Ingrese el número de cuenta" />

        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                  <ActionButton 
                    text="Volver" 
                    variant="outline" 
                    onClick={() => navigate('/seleccion-metodo-pago')} 
                  />
                  <ActionButton 
                    text="Continuar" 
                    variant="solid" 
                    onClick={() => navigate('/registro-exito')} 
                  />
        </div>
      </FormCard>
    </div>
  );
}