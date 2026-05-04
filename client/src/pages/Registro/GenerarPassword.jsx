import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../components/FormCard';
import CustomInput from '../components/CustomInput';
import ActionButton from '../components/ActionButton';

export default function GenerarPassword() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#1E1B16', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      
      <FormCard>
        <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '24px' }}>Generar contraseña personal</h2>
        
        <CustomInput label="Contraseña" type="password" placeholder="Ingrese la contraseña" />
        <CustomInput label="Confirmar contraseña" type="password" placeholder="Confirme la contraseña" />
        
        <ul style={{ fontSize: '12px', color: '#777', paddingLeft: '16px', marginBottom: '24px' }}>
          <li>Mínimo 8 caracteres</li>
          <li>Incluir mayúsculas, minúsculas, números y un carácter especial (@, $, !, etc.)</li>
          <li>No usar contraseñas anteriores o habituales</li>
        </ul>

        <ActionButton 
          text="Confirmar" 
          variant="solid" 
          onClick={() => navigate('/registro-exito')} 
        />
      </FormCard>

    </div>
  );
}