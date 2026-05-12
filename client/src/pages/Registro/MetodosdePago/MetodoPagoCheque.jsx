import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';

export default function MetodoPagoCheque() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#1E1B16', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '24px' }}>Método de Pago - Cheque</h1>
      <FormCard>
        <h2 style={{ marginTop: 0, color: '#1A1A1A' }}>Ingrese sus datos</h2>
        <p style={{ fontSize: '11px', color: '#777', marginBottom: '20px' }}>Todos los campos son obligatorios.</p>
        
        <CustomInput label="Banco emisor" placeholder="Ingrese el banco emisor" />
        <CustomInput label="Número de cheque" placeholder="Ingrese el número del cheque" type="number" />
        <CustomInput label="Monto" placeholder="Ingrese el monto" type="number" />
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#555', fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Moneda</label>
          <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}>
            <option>Elija el tipo de moneda</option>
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}><CustomInput label="Fecha de vencimiento" placeholder="DD" /></div>
          <div style={{ flex: 1 }}><CustomInput label=" " placeholder="MM" /></div>
          <div style={{ flex: 1 }}><CustomInput label=" " placeholder="YYYY" /></div>
        </div>

        <CustomInput label="Titular" placeholder="Ingrese el titular del cheque" />
        <CustomInput label="Comprobante (Formato PDF)" type="file" />

        
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