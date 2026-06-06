import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert, Image, ImageBackground, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormCard from '../../components/FormCard.jsx';
import BottomNav from '../../components/BottomNav.jsx';
import { datosUsuarioStyles as styles, DatosUsuarioTheme } from '../../styles/cuentaUsuario/DatosUsuario.js';
import { API_URL } from '../../config/api';

export default function DatosUsuario() {
    const navigation = useNavigation();
    // Guardará el usuario original
    const [usuario, setUsuario] = useState(null);
    // Guardará los cambios temporales mientras escribes
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    // Controla si estamos viendo la info o editándola
    const [modoEdicion, setModoEdicion] = useState(false);

    useEffect(() => {
        const consultarUsuarioBackend = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const userDataString = await AsyncStorage.getItem('userData');
                if (!token || !userDataString) {
                    navigation.navigate('Login'); return;
                }
                const usuarioLocal = JSON.parse(userDataString);
                const response = await fetch(`${API_URL}/usuarios/${usuarioLocal.id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setUsuario(data);
                    setFormData(data); // Llenamos el formulario con sus datos
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        consultarUsuarioBackend();
    }, [navigation]);

    // Función que envía los cambios al backend
    const guardarCambios = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch(`${API_URL}/usuarios/${usuario.id || usuario._id}`, {
                method: 'PATCH', // Llamamos a nuestra nueva ruta del backend
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    domicilio: formData.domicilio,
                    pais: formData.pais
                })
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Éxito", "Tus datos han sido actualizados.");
                setUsuario(data); // Actualizamos la vista con los nuevos datos devueltos
                setModoEdicion(false); // Salimos del modo edición
            } else {
                Alert.alert("Error", data.mensaje || "No se pudo actualizar.");
            }
        } catch (error) {
            Alert.alert("Error", "Problema de conexión con el servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    const capitalizar = (texto) => texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : '';

    return (
        <ImageBackground source={require('../../assets/fondo_dorado.jpg')} style={styles.backgroundImage}>
            <View style={styles.mainContainer}>
                <View style={styles.headerOutside}>
                    <Image source={require('../../assets/logos/logotipo.png')} style={styles.logoHeader} />
                    <Text style={styles.titleHeader}>Mis Datos</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollWrapper}>
                    <FormCard>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#D4AF37" />
                        ) : usuario ? (
                            <View style={styles.infoContainer}>
                                
                                <View style={styles.dataRow}>
                                    <Text style={styles.dataLabel}>Nombre</Text>
                                    {modoEdicion ? (
                                        <TextInput 
                                            style={{ borderBottomWidth: 1, borderColor: '#ccc', flex: 1, marginLeft: 10, color: 'black' }}
                                            value={formData.nombre}
                                            onChangeText={(text) => setFormData({...formData, nombre: text})}
                                        />
                                    ) : (
                                        <Text style={styles.dataValue}>{usuario.nombre}</Text>
                                    )}
                                </View>

                                <View style={styles.dataRow}>
                                    <Text style={styles.dataLabel}>Apellido</Text>
                                    {modoEdicion ? (
                                        <TextInput 
                                            style={{ borderBottomWidth: 1, borderColor: '#ccc', flex: 1, marginLeft: 10, color: 'black' }}
                                            value={formData.apellido}
                                            onChangeText={(text) => setFormData({...formData, apellido: text})}
                                        />
                                    ) : (
                                        <Text style={styles.dataValue}>{usuario.apellido}</Text>
                                    )}
                                </View>

                                {/* El Email generalmente no se edita directamente o requiere otro proceso, lo dejamos estático */}
                                <View style={styles.dataRow}>
                                    <Text style={styles.dataLabel}>Correo Electrónico</Text>
                                    <Text style={styles.dataValue}>{usuario.email}</Text>
                                </View>

                                <View style={styles.dataRow}>
                                    <Text style={styles.dataLabel}>Domicilio Legal</Text>
                                    {modoEdicion ? (
                                        <TextInput 
                                            style={{ borderBottomWidth: 1, borderColor: '#ccc', flex: 1, marginLeft: 10, color: 'black' }}
                                            value={formData.domicilio}
                                            onChangeText={(text) => setFormData({...formData, domicilio: text})}
                                        />
                                    ) : (
                                        <Text style={styles.dataValue}>{usuario.domicilio || 'No especificado'}</Text>
                                    )}
                                </View>

                                <View style={styles.dataRow}>
                                    <Text style={styles.dataLabel}>País de Origen</Text>
                                    {modoEdicion ? (
                                        <TextInput 
                                            style={{ borderBottomWidth: 1, borderColor: '#ccc', flex: 1, marginLeft: 10, color: 'black' }}
                                            value={formData.pais}
                                            onChangeText={(text) => setFormData({...formData, pais: text})}
                                        />
                                    ) : (
                                        <Text style={styles.dataValue}>{usuario.pais || 'No especificado'}</Text>
                                    )}
                                </View>

                                {/* Categoría y Estado son datos administrativos, no editables por el usuario */}
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

                                {/* BOTONES DE ACCIÓN */}
                                {modoEdicion ? (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <TouchableOpacity style={[styles.backButton, { backgroundColor: 'gray' }]} onPress={() => {
                                            setModoEdicion(false);
                                            setFormData(usuario); // Restauramos la info si cancela
                                        }}>
                                            <Text style={styles.backButtonText}>Cancelar</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={[styles.backButton, { backgroundColor: '#D4AF37' }]} onPress={guardarCambios}>
                                            <Text style={styles.backButtonText}>Guardar</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View>
                                        <TouchableOpacity style={[styles.backButton, { backgroundColor: '#F6F1E7' }]} onPress={() => setModoEdicion(true)}>
                                            <Text style={[styles.backButtonText, { color: 'black' }]}>Editar Perfil</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                
                            </View>
                        ) : (
                            <Text style={styles.emptyText}>No se encontraron datos.</Text>
                        )}
                    </FormCard>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                                  <Text style={styles.backButtonText}>Volver</Text>
                        </TouchableOpacity>

                </ScrollView>
                <BottomNav />
            </View>
        </ImageBackground>
    );
}