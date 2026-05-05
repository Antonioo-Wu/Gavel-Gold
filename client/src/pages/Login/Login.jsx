import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';

export default function Login() {
  const navigate = useNavigate(); 

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      backgroundImage: 'url(/fondo_dorado.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      
      <h1 style={{ color: 'white', marginBottom: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Inicio de Sesión
      </h1>
      
      {/* Usamos el nuevo contenedor estandarizado */}
      <FormCard>
        
        {/* Reemplazamos los inputs largos por nuestros componentes limpios */}
        <CustomInput label="Email" type="email" placeholder="Valor" />
        <CustomInput label="Password" type="password" placeholder="Valor" />
        
        <div style={{ marginTop: '10px' }}>
          {/* Reemplazamos el botón HTML por nuestro ActionButton */}
          <ActionButton 
            text="Ingresar" 
            variant="solid" 
            onClick={() => navigate('/subastas')} 
          />
        </div>

        <div style={{ textAlign: 'center', fontSize: '14px', color: '#555', marginTop: '24px' }}>
          {/* Agregamos la navegación a la pantalla de recupero */}
          <p 
            onClick={() => navigate('/recupero')}
            style={{ fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}
          >
            ¿Olvidó su contraseña? Recuperar
          </p>
          
          {/* Agregamos la navegación a la pantalla de registro */}
          <p 
            onClick={() => navigate('/registro')}
            style={{ fontWeight: 'bold', cursor: 'pointer' }}
          >
            ¿No eres miembro? Cree su cuenta
          </p>
        </div>
        
      </FormCard>
    </div>
  );
}