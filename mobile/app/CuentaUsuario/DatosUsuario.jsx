import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { datosUsuarioStyles as styles } from '../../styles/cuentaUsuario/DatosUsuario.js';
import { API_URL } from '../../config/api';

export default function DatosUsuario() {
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const consultarUsuarioBackend = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const userDataString = await AsyncStorage.getItem('userData');

                if (!token || !userDataString) {
                    Alert.alert("Sesión expirada", "Por favor, vuelve a iniciar sesión.");
                    navigation.navigate('Login');
                    return;
                }

                const usuarioLocal = JSON.parse(userDataString);

                const response = await fetch(`${API_URL}/usuarios/${usuarioLocal.id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setUsuario(data);
                } else {
                    Alert.alert("Error", data.mensaje || "No se pudo obtener la información.");
                }
            } catch (error) {
                console.error(error);
                Alert.alert("Error de red", "No se pudo conectar con el servidor.");
            } finally {
                setIsLoading(false);
            }
        };

        consultarUsuarioBackend();
    }, [navigation]);

    const capitalizar = (texto) => {
        if (!texto) return '';
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Mis Datos Personales</Text>
                <Text style={styles.category}>Información registrada en Gavel Gold</Text>

                {isLoading ? (
                    <ActivityIndicator size="large" color="#D4AF37" style={styles.loadingIndicator} />
                ) : usuario ? (
                    <View>
                        <View style={styles.dataCard}>
                            <View style={styles.dataRow}>
                                <Text style={styles.dataLabel}>Nombre</Text>
                                <Text style={styles.dataValue}>{usuario.nombre}</Text>
                            </View>

                            <View style={styles.dataRow}>
                                <Text style={styles.dataLabel}>Apellido</Text>
                                <Text style={styles.dataValue}>{usuario.apellido}</Text>
                            </View>

                            <View style={styles.dataRow}>
                                <Text style={styles.dataLabel}>Correo Electrónico</Text>
                                <Text style={styles.dataValue}>{usuario.email}</Text>
                            </View>

                            <View style={styles.dataRow}>
                                <Text style={styles.dataLabel}>Domicilio Legal</Text>
                                <Text style={styles.dataValue}>{usuario.domicilio || 'No especificado'}</Text>
                            </View>

                            <View style={styles.dataRow}>
                                <Text style={styles.dataLabel}>País de Origen</Text>
                                <Text style={styles.dataValue}>{usuario.pais || 'No especificado'}</Text>
                            </View>

                            <View style={styles.dataRow}>
                                <Text style={styles.dataLabel}>Categoría de Postor</Text>
                                <Text style={[styles.dataValue, styles.dataValueCategory]}>
                                    {capitalizar(usuario.categoria)}
                                </Text>
                            </View>

                            <View style={[styles.dataRow, styles.dataRowLast]}>
                                <Text style={styles.dataLabel}>Estado de Cuenta</Text>
                                <Text style={[
                                    styles.dataValue,
                                    styles.statusTextBase,
                                    usuario.estado === 'activo' ? styles.statusActive : styles.statusInactive
                                ]}>
                                    {capitalizar(usuario.estado)}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.backButtonText}>Volver al Perfil</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text style={styles.emptyText}>No se encontraron datos del usuario.</Text>
                )}
            </ScrollView>
        </View>
    );
}