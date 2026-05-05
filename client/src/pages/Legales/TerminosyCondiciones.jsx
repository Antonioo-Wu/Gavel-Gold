import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../../components/ActionButton';

export default function TerminosYCondiciones() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F8FAF8' }}>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '28px', color: '#1A1A1A', marginBottom: '16px', lineHeight: '1.2' }}>
          Términos y<br/>Condiciones de Uso
        </h1>
        
        <p style={{ fontSize: '14px', color: '#333', marginBottom: '24px', lineHeight: '1.5' }}>
          El acceso y uso de la plataforma Gavel & Gold está sujeto a los siguientes términos y condiciones. Al utilizar nuestra aplicación, usted acepta cumplir con estas normativas:
        </p>

        <ol style={{ paddingLeft: '16px', fontSize: '14px', color: '#333', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <li>
            <b>Registro y Categorías de Usuarios:</b> La participación en las subastas requiere un registro obligatorio que consta de dos etapas: la carga de datos personales (incluyendo imágenes del documento de identidad y domicilio), y una verificación de antecedentes. Tras la verificación, se le asignará una categoría (Común, Especial, Plata, Oro o Platino).
          </li>
          <li>
            <b>Condiciones para Postores:</b> Para pujar, el usuario debe tener al menos un medio de pago verificado. Las subastas utilizan modalidad dinámica ascendente. Toda puja debe superar la oferta actual por al menos un 1% del valor base y el máximo no puede superar la oferta actual más el 20% del valor base (excepto categorías Oro y Platino). Los usuarios no pueden estar conectados en más de una subasta a la vez.
          </li>
          <li>
            <b>Penalizaciones por Incumplimiento:</b> Si un usuario gana una subasta y no posee los fondos para cumplir con el pago, se le aplicará una multa automática equivalente al 10% del valor ofertado. Tendrá 72 horas para regularizar la multa y el pago, de lo contrario derivará en acciones judiciales y suspensión de la cuenta.
          </li>
          <li>
            <b>Condiciones para Vendedores:</b> Todo usuario que postule un artículo debe declarar bajo juramento que el bien le pertenece exclusivamente y acreditar su origen lícito. La Empresa inspeccionará el bien físicamente. Los artículos aceptados serán asegurados por la Empresa en función de su valor base. Si un artículo llega a la subasta y no recibe ninguna puja, la Empresa lo comprará por el valor base establecido.
          </li>
        </ol>
      </div>

      <div style={{ padding: '24px', backgroundColor: '#F8FAF8', boxShadow: '0 -4px 10px rgba(0,0,0,0.05)' }}>
        <ActionButton text="Volver" variant="solid" onClick={() => navigate(-1)} />
      </div>

    </div>
  );
}