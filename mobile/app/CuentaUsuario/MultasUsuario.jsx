import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { API_URL } from '../../config/api';
import { multasUsuarioStyles as styles } from '../../styles/cuentaUsuario/MultasUsuario';
import PaymentModal from '../../components/MetodoPagoModulo';
import { obtenerMediosPagoFormateados } from '../../services/paymentService';

export default function MultasUsuario() {
    const navigation = useNavigation();
    const [multas, setMultas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [multaSeleccionada, setMultaSeleccionada] = useState(null);

    useEffect(() => {
        fetchMultas();
        cargarTarjetas();
    }, []);

    const fetchMultas = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const userDataString = await AsyncStorage.getItem('userData');

            if (!token || !userDataString) return;

            const usuario = JSON.parse(userDataString);
            const response = await fetch(`${API_URL}/usuarios/${usuario.id}/multas`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setMultas(data);
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar las multas.");
        } finally {
            setIsLoading(false);
        }
    };

    const cargarTarjetas = async () => {
        const metodos = await obtenerMediosPagoFormateados();
        if (metodos.length > 0) {
            setPaymentMethods(metodos);
            setSelectedPayment(metodos[0]);
        }
    };

    const iniciarProcesoPago = (multaId) => {
        if (paymentMethods.length === 0) {
            Alert.alert("Sin métodos de pago", "Debes registrar un medio de pago en tu perfil antes de poder abonar una multa.");
            return;
        }
        setMultaSeleccionada(multaId);
        setModalVisible(true);
    };

    const procesarPagoConMedioSeleccionado = async (metodo) => {
        setSelectedPayment(metodo);
        setModalVisible(false);

        Alert.alert(
            "Confirmar Pago",
            `¿Abonar esta multa usando ${metodo.name}?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Pagar",
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('userToken');
                            const userDataString = await AsyncStorage.getItem('userData');
                            const usuario = JSON.parse(userDataString);
                            const response = await fetch(`${API_URL}/usuarios/${usuario.id}/multas/${multaSeleccionada}/pagar`, {
                                method: 'POST',
                                headers: { 'Authorization': `Bearer ${token}` }
                            });

                            const data = await response.json();

                            if (response.ok) {
                                Alert.alert("Éxito", data.mensaje);
                                fetchMultas();
                            } else {
                                Alert.alert("Error", data.mensaje);
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo procesar el pago.");
                        }
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={[styles.card, !item.activa && styles.cardInactiva]}>
            <View style={styles.cardHeader}>
                <Text style={styles.motivo}>{item.motivo}</Text>
                <Text style={[styles.estado, item.activa ? styles.estadoPendiente : styles.estadoPagada]}>
                    {item.activa ? "Pendiente" : "Pagada"}
                </Text>
            </View>
            <Text style={styles.monto}>Monto a pagar: ${item.monto}</Text>

            {item.activa && (
                <TouchableOpacity style={styles.payButton} onPress={() => iniciarProcesoPago(item._id)}>
                    <Text style={styles.payButtonText}>Pagar Multa</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Multas</Text>

            {isLoading ? (
                <ActivityIndicator size="large" color="#D4AF37" />
            ) : multas.length === 0 ? (
                <View style={{ flex: 1 }}>
                    <Text style={styles.emptyText}>No tienes multas registradas en tu cuenta.</Text>
                </View>
            ) : (
                <FlatList
                    data={multas}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Perfil')}>
                <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>

            {selectedPayment && (
                <PaymentModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSelectPayment={procesarPagoConMedioSeleccionado}
                    currentSelectedId={selectedPayment.id}
                    methodsData={paymentMethods}
                />
            )}
        </View>
    );
}