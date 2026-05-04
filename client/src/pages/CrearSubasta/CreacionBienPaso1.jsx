import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../components/FormCard';
import CustomInput from '../components/CustomInput';
import ActionButton from '../components/ActionButton';
import BottomNav from '../components/BottomNav';

export default function CreacionBienPaso1() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#1E1B16', minHeight: '100vh', padding: '24px', paddingBottom: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <FormCard>
        <h2 style={{ textAlign: 'center', fontSize: '24px', marginTop: 0, marginBottom: '24px', color: '#1A1A1A' }}>
          Ingrese los<br/>datos del bien a<br/>subastar
        </h2>

        <CustomInput label="Nombre del bien" placeholder="Ej: Reloj de bolsillo antiguo" />
        
        {/* Etiqueta simulada */}
        <div style={{ display: 'inline-block', backgroundColor: '#333', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', marginBottom: '24px' }}>
          ✓ Etiqueta
        </div>

        {/* Sección del Monto y Moneda */}
        <label style={{ color: '#555', fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
          Ingrese su monto de valor base
        </label>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#1A1A1A' }}>$</span>
          <input 
            type="number" 
            placeholder="50.000" 
            style={{ fontSize: '32px', fontWeight: 'bold', border: 'none', outline: 'none', width: '100%', color: '#1A1A1A', padding: 0 }} 
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <select style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: 'white' }}>
            <option>Tipo moneda</option>
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
          </select>
        </div>

        {/* Área de descripción */}
        <textarea 
          placeholder="Descripción del bien" 
          style={{ width: '100%', height: '120px', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#F0F0F0', boxSizing: 'border-box', marginBottom: '24px', resize: 'none', fontFamily: 'inherit' }}
        />

        <ActionButton 
          text="Continuar" 
          variant="solid" 
          onClick={() => navigate('/crear-bien-2')} 
        />
      </FormCard>

      <BottomNav />
    </div>
  );
}