import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../components/ActionButton';

export default function TerminosCompra() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F8FAF8' }}>
      
      {/* Contenedor scrolleable */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '28px', color: '#1A1A1A', marginBottom: '16px', lineHeight: '1.2' }}>
          Confirmación de<br/>Puja y Términos de<br/>Compra
        </h1>
        
        <p style={{ fontSize: '14px', color: '#333', marginBottom: '24px', lineHeight: '1.5' }}>
          Al registrar un medio de pago y/o participar activamente en cualquier subasta de <b>Gavel & Gold</b>, declara y acepta irrevocablemente lo siguiente:
        </p>

        <ol style={{ paddingLeft: '16px', fontSize: '14px', color: '#333', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <li>
            <b>Oferta Vinculante:</b> Esta puja constituye una oferta de compra firme e irrevocable. Si su puja es la última y más alta al cierre de la subasta, usted se convierte en el nuevo dueño de la pieza.
          </li>
          <li>
            <b>Monto de la Puja:</b> Confirma que el monto de su puja cumple con los límites establecidos (mínimo del 1% y máximo del 20% sobre el valor base respecto a la oferta anterior), a menos que sea una subasta de categoría Oro o Platino[cite: 2].
          </li>
          <li>
            <b>Medios de Pago:</b> Declara poseer al menos un medio de pago verificado por la Empresa y con fondos suficientes (o garantía equivalente) para cubrir el monto total de la puja más comisiones e impuestos[cite: 2].
          </li>
          <li>
            <b>Penalización por Incumplimiento:</b> Acepta que, si su oferta gana y no posee los fondos para cumplir con el pago, recibirá una multa del 10% del valor ofertado, debiendo abonar dicha multa y los fondos necesarios antes de 72 horas para poder volver a participar.
          </li>
          <li>
            <b>Derivación Judicial:</b> Entiende que el incumplimiento continuado de pago resultará en la derivación del caso a la justicia y la suspensión total de los servicios de la aplicación.
          </li>
          <li>
            <b>Validación del Sistema:</b> Acepta que su puja solo es válida una vez recibida la confirmación de éxito por parte del sistema, respetando el orden de registro en tiempo real.
          </li>
        </ol>
      </div>

      {/* Contenedor fijo del botón */}
      <div style={{ padding: '24px', backgroundColor: '#F8FAF8', boxShadow: '0 -4px 10px rgba(0,0,0,0.05)' }}>
        <ActionButton 
          text="Acepto y Continúo" 
          variant="solid" 
          onClick={() => navigate(-1)} // Esto vuelve a la pantalla anterior
        />
      </div>

    </div>
  );
}