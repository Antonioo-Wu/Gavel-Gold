import React, { useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import ActionButton from '../../components/ActionButton';
import { API_URL } from '../../config/api';

import { seguimientoPujaStyles as styles } from '../../styles/puja/SeguimientoPuja';

export default function SeguimientoPuja() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params || { id: null };

    const [isLoading, setIsLoading] = useState(true);
    const [facturacion, setFacturacion] = useState({
        montoPujado: 0,
        comisiones: 0,
        envio: 0,
        total: 0
    });

    useEffect(() => {
        const obtenerDatosGanador = async () => {
            if (!id) {
                setFacturacion({ montoPujado: '...', comisiones: '...', envio: '...', total: '...' });
                setIsLoading(false);
                return;
            }
            try {
                const response = await fetch(`${API_URL}/subastas/${id}/resultado`);
                const data = await response.json();

                if (response.ok && data.ganador) {
                    const montoCierre = data.ganador.montoCierre;
                    const comisionCalculada = montoCierre * 0.10;
                    const envio = data.ganador.montoCierre * 0.05;
                    
                    setFacturacion({
                        montoPujado: montoCierre,
                        comisiones: comisionCalculada,
                        envio: envio,
                        total: montoCierre + comisionCalculada + envio
                    });
                }
            } catch (error) {
                console.error("Error obteniendo resultados:", error);
                setFacturacion({ montoPujado: '...', comisiones: '...', envio: '...', total: '...' });
            } finally {
                setIsLoading(false);
            }
        };

        obtenerDatosGanador();
    }, [id]);

    return (
        <ImageBackground source={require('../../assets/fondo_dorado.jpg')} style={styles.background}>
            <FormCard>
                <Text style={styles.header}>Seguimiento post venta</Text>
                
                {isLoading ? (
                    <ActivityIndicator size="large" color="#D4AF37" style={styles.loadingIndicator} />
                ) : (
                    <View style={{ width: '100%' }}>
                        <Text style={styles.congratsText}>¡Felicidades, ganaste la subasta!</Text>

                        <View style={styles.detalle}>
                            <View style={styles.detalleRow}>
                                <Text style={styles.detalleText}>Monto:</Text>
                                <Text style={styles.detalleText}>${facturacion.montoPujado}</Text>
                            </View>
                            <View style={styles.detalleRow}>
                                <Text style={styles.detalleText}>Comisiones:</Text>
                                <Text style={styles.detalleText}>${facturacion.comisiones}</Text>
                            </View>
                            <View style={styles.detalleRow}>
                                <Text style={styles.detalleText}>Envío:</Text>
                                <Text style={styles.detalleText}>${facturacion.envio}</Text>
                            </View>
                            <View style={styles.totalRow}>
                                <Text style={styles.totalText}>Total:</Text>
                                <Text style={styles.totalText}>${facturacion.total}</Text>
                            </View>
                        </View>

                        <View style={styles.trackingContainer}>
                            <View style={styles.trackingStep}>
                                <View style={styles.trackingIconActive}>
                                    <Text style={styles.trackingIconText}>✓</Text>
                                </View>
                                <Text style={styles.trackingTextActive}>Pago</Text>
                                <View style={styles.trackingLine} />
                            </View>

                            <View style={styles.trackingStep}>
                                <View style={styles.trackingIconPending}>
                                    <Text style={styles.trackingIconText}>•</Text>
                                </View>
                                <Text style={styles.trackingTextPending}>En preparación</Text>
                                <View style={styles.trackingLine} />
                            </View>

                            <View style={styles.trackingStep}>
                                <View style={styles.trackingIconPending}>
                                    <Text style={styles.trackingIconText}>•</Text>
                                </View>
                                <Text style={styles.trackingTextPending}>En camino</Text>
                                <View style={styles.trackingLine} />
                            </View>

                            <View style={[styles.trackingStep, { marginBottom: 0 }]}>
                                <View style={styles.trackingIconPending}>
                                    <Text style={styles.trackingIconText}>•</Text>
                                </View>
                                <Text style={styles.trackingTextPending}>Entregado</Text>
                            </View>
                        </View>

                        <ActionButton 
                            text="Finalizar" 
                            variant="solid" 
                            onPress={() => navigation.navigate('ListadeSubastas')}
                        />
                    </View>
                )}
            </FormCard>
        </ImageBackground>
    );
}