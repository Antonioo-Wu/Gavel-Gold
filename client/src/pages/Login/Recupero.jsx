import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';

export default function Recupero() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '24px', backgroundImage: 'url(/fondo_dorado.jpg)', backgroundSize: 'cover' }}>
      
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '32px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Recupere su<br/>contraseña
      </h1>

      <FormCard>
        <CustomInput label="Email" type="email" placeholder="Ingrese su mail" />
        
        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          <ActionButton text="Cancel" variant="outline" onClick={() => navigate('/login')} />
          <ActionButton text="Confirmar" variant="solid" onClick={() => navigate('/recupero-exito')} />
        </div>
      </FormCard>

    </div>
  );
}