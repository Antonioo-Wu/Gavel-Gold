import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';

export default function RegistroUsuario() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#1E1B16', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>
      <FormCard>
        <h2 style={{ marginTop: 0, color: '#1A1A1A' }}>Ingrese sus datos</h2>
        <p style={{ fontSize: '12px', color: '#555', marginBottom: '24px' }}>Todos los campos son obligatorios.</p>
        
        <CustomInput label="Nombre" placeholder="Ingrese su nombre" />
        <CustomInput label="Apellido" placeholder="Ingrese su apellido" />
        
        {/* Inputs de Archivo */}
        <CustomInput label="Foto de su DNI (frente)" type="file" />
        <CustomInput label="Foto de su DNI (dorso)" type="file" />
        
        <CustomInput label="Domicilio" placeholder="Ingrese su domicilio" />
        <CustomInput label="País de origen" placeholder="Ingrese su país de origen" />
        <CustomInput label="Mail" type="email" placeholder="Ingrese su mail" />
        
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '24px 0' }}>
          <input type="checkbox" id="termsReg" style={{ marginTop: '4px' }} />
          <label htmlFor="termsReg" style={{ fontSize: '12px', color: '#555' }}>
            Acepto los Términos y Condiciones<br/>
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Ver Términos y Condiciones</span>
          </label>
        </div>

        <ActionButton text="Continuar" variant="solid" onClick={() => navigate('/validacion-registro')} />
      </FormCard>
    </div>
  );
}