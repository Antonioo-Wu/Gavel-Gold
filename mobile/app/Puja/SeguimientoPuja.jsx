import React, { useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import ActionButton from '../../components/ActionButton';

import { seguimientoPujaStyles as styles } from '../../styles/SeguimientoPuja';
export default function SeguimientoPuja() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params || { id: 'S01' };
    const [facturacion] = useState({ montoPujado: 50000, comisiones: 5000, envio: 1200, total: 56200 });

    return (
        <ImageBackground source={require('../../assets/fondo_dorado.jpg')} style={styles.background}>
            <FormCard>
                <Text style={styles.header}>Seguimiento post venta</Text>

                <View style={styles.detalle}>
                    <Text>Monto: ${facturacion.montoPujado}</Text>
                    <Text>Total: ${facturacion.total}</Text>
                </View>

                <ActionButton text="Finalizar" variant="solid" onPress={() => navigation.navigate('Subastas')}
                />
            </FormCard>
        </ImageBackground>
    );
}