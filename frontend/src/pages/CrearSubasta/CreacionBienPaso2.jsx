import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../components/FormCard';
import ActionButton from '../components/ActionButton';
import BottomNav from '../components/BottomNav';

export default function CreacionBienPaso2() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#1E1B16', minHeight: '100vh', padding: '24px', paddingBottom: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <FormCard>
        <h2 style={{ textAlign: 'center', fontSize: '24px', marginTop: 0, marginBottom: '8px', color: '#1A1A1A' }}>
          Ingrese los<br/>datos del bien a<br/>subastar
        </h2>
        
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#555', marginBottom: '24px' }}>
          Agrega mínimo 6 fotos de tu producto a subastar
        </p>

        {/* Cuadro simulado de subida de imagen */}
        <div style={{ 
          width: '100%', height: '200px', backgroundColor: '#EFEFEF', 
          borderRadius: '8px', display: 'flex', justifyContent: 'center', 
          alignItems: 'center', marginBottom: '24px', cursor: 'pointer' 
        }}>
          <span style={{ fontSize: '48px', color: '#CCC' }}>📷</span>
        </div>

        {/* Checkbox y link de términos */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <input type="checkbox" id="termsBien" />
          <label htmlFor="termsBien" style={{ fontSize: '14px', color: '#333' }}>
            Acepto los Términos y Condiciones
          </label>
        </div>
        
        <div style={{ marginBottom: '24px', paddingLeft: '24px' }}>
          <span 
            onClick={() => navigate('/terminos-envio')} 
            style={{ fontSize: '14px', color: '#555', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Ver Términos y Condiciones
          </span>
        </div>

        <ActionButton 
          text="Subastar!" 
          variant="solid" 
          onClick={() => navigate('/crear-bien-exito')} 
        />
      </FormCard>

      <BottomNav />
    </div>
  );
}