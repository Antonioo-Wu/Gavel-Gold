import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../../components/ActionButton';

export default function TerminosEnvio() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F8FAF8' }}>
      
      {/* Contenedor scrolleable */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '28px', color: '#1A1A1A', marginBottom: '16px', lineHeight: '1.2' }}>
          Declaración Jurada<br/>y Términos de Envío
        </h1>
        
        <p style={{ fontSize: '14px', color: '#333', marginBottom: '24px', lineHeight: '1.5' }}>
          Al enviar esta solicitud, usted, el "Usuario Solicitante", declara y acepta lo siguiente:
        </p>

        <ol style={{ paddingLeft: '16px', fontSize: '14px', color: '#333', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <li>
            <b>Declaración de Propiedad:</b> Declaro bajo juramento que el bien descrito me pertenece en propiedad exclusiva y que no posee ningún gravamen, impedimento legal, ni limitación que impida su libre subasta y transferencia de dominio[cite: 2].
          </li>
          <li>
            <b>Origen Lícito:</b> Me comprometo a acreditar el origen lícito del bien si la Empresa así lo requiere[cite: 2]. Acepto que, en caso de duda sobre el origen, la Empresa notificará a las autoridades competentes.
          </li>
          <li>
            <b>Inspección y Envío:</b> Si la Empresa manifiesta interés, acepto enviar el bien a la dirección indicada para su inspección física[cite: 2].
          </li>
          <li>
            <b>Cargos por Devolución:</b> Acepto explícitamente que, en caso de que el bien no sea aceptado tras la inspección, la Empresa lo devolverá a mi cargo.
          </li>
          <li>
            <b>Modalidad de Subasta:</b> Acepto que, si la cantidad de artículos es numerosa, la Empresa podrá, a su criterio, agruparlos en una subasta denominada "Colección" bajo mi nombre.
          </li>
          <li>
            <b>Aceptación Final:</b> Entiendo que la inspección física es determinante y que la aceptación o rechazo final del bien me será informada a través de esta aplicación[cite: 2].
          </li>
        </ol>
      </div>

      {/* Contenedor fijo del botón */}
      <div style={{ padding: '24px', backgroundColor: '#F8FAF8', boxShadow: '0 -4px 10px rgba(0,0,0,0.05)' }}>
        <ActionButton 
          text="Aceptar y Continuar" 
          variant="solid" 
          onClick={() => navigate('/subasta-creada-exito')} // Cambiá esta ruta a donde deba ir
        />
      </div>

    </div>
  );
}