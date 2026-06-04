import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FormCard from '../../components/FormCard.jsx';
import BottomNav from '../../components/BottomNav.jsx';
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
        <ImageBackground source={require('../../assets/fondo_dorado.jpg')} style={styles.backgroundImage}>
            <View style={styles.mainContainer}>
                
                {/* 1. TÍTULO POR FUERA */}
                <View style={styles.headerOutside}>
                    <Image source={require('../../assets/logos/logotipo.png')} style={styles.logoHeader} />
                    <Text style={styles.titleHeader}>Mis Datos</Text>
                </View>

                {/* 2. EL SCROLL ENVUELVE A LA TARJETA */}
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={styles.scrollWrapper}
                >
                    <FormCard>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#D4AF37" style={styles.loadingIndicator} />
                        ) : usuario ? (
                            <View style={styles.infoContainer}>
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
                                    <Text style={styles.dataLabel}>Categoría</Text>
                                    <Text style={styles.dataValue}>{capitalizar(usuario.categoria)}</Text>
                                </View>

                                <View style={styles.dataRowLast}>
                                    <Text style={styles.dataLabel}>Estado</Text>
                                    <Text style={[styles.dataValue, usuario.estado === 'activo' ? styles.statusActive : styles.statusInactive]}>
                                        {capitalizar(usuario.estado)}
                                    </Text>
                                </View>

                                
                                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                                    <Text style={styles.backButtonText}>Volver</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Text style={styles.emptyText}>No se encontraron datos.</Text>
                        )}
                    </FormCard>
                </ScrollView>

                <BottomNav />
            </View>
        </ImageBackground>
    );
}