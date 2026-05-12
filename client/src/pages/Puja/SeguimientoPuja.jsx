import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormCard from '../../components/FormCard';
import ActionButton from '../../components/ActionButton';

export default function SeguimientoPuja() {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtenemos el ID de la subasta de la URL
    
    // Estado para guardar la información que viene del back
    const [facturacion, setFacturacion] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // Simulamos la llamada al endpoint GET /subastas/{id}/resultado del swagger
        const obtenerResultado = async () => {
            try {
                // Aquí iría tu: const response = await fetch(`http://localhost:3000/api/subastas/${id}/resultado`);
                // Simulamos una respuesta exitosa basada en las reglas del PDF
                const dataSimulada = {
                    montoPujado: 50000,
                    comisiones: 5000,
                    envio: 1200,
                    total: 56200
                };
                
                setFacturacion(dataSimulada);
                setCargando(false);
            } catch (error) {
                console.error("Error al obtener la facturación:", error);
            }
        };

        obtenerResultado();
    }, [id]);

    if (cargando) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Cargando detalles de facturación...</div>;

    return (    
        <div style={{ 
            backgroundColor: '#1E1B16', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '24px',
            backgroundImage: "url('/images/fondo_dorado.jpg')", // CORRECCIÓN AQUÍ
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            
            <FormCard>
                <h2 style={{ color: '#1A1A1A', textAlign: 'center', marginTop: 0, marginBottom: '16px' }}>
                    Seguimiento post venta
                </h2>
                
                {/* Detalles Dinámicos */}
                <div style={{ backgroundColor: '#F5F5F5', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '14px', margin: '0 0 12px 0', color: '#1A1A1A' }}>Detalle de facturación</h3>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                        <span>Monto pujado:</span>
                        <span>${facturacion.montoPujado.toLocaleString()}</span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                        <span>Comisiones (10%):</span>
                        <span>${facturacion.comisiones.toLocaleString()}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                        <span>Costo de envío:</span>
                        <span>${facturacion.envio.toLocaleString()}</span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px' }}>
                        <span>Total:</span>
                        <span>${facturacion.total.toLocaleString()}</span>
                    </div>
                </div>

                <ActionButton 
                    text="Finalizar" 
                    variant="solid" 
                    onClick={() => navigate('/subastas')} 
                />
            </FormCard>
        </div>
    );
}