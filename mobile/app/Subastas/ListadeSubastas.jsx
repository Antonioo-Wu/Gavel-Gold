import React, { useState, useEffect } from 'react'; // Agregamos los hooks faltantes
import { View, Text, TextInput, ScrollView } from 'react-native';
import BottomNav from '../../components/BottomNav';
import AuctionCard from '../../components/AuctionCard';
import { API_URL } from '../../config/api';

import { listaDeSubastasStyles as styles } from '../../styles/subastas/ListaDeSubastas';

// Importamos los componentes de UI que armamos antes (Ajustar las rutas según tu proyecto)
import LoadingCatalogo from '../Loadings/LoadingCatalogo'; 
import GenericErrorScreen from '../../components/GenericErrorScreen'; 

export default function ListadeSubastas() {
  const [subastas, setSubastas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Nuevo estado para manejar errores visuales en lugar de usar Alert.alert
  const [errorType, setErrorType] = useState(null); 

  useEffect(() => {
    const obtenerSubastas = async () => {
      try {
        const response = await fetch(`${API_URL}/subastas`);
        
        if (response.ok) {
          const data = await response.json();
          setSubastas(data);
        } else {
          // Si el servidor responde con error (ej. 404 o 500)
          setErrorType('SERVER_DOWN'); 
        }
      } catch (error) {
        // Si el fetch falla por completo (ej. sin internet)
        setErrorType('WIFI_ERROR'); 
        console.error("Error al obtener subastas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    obtenerSubastas();
  }, []);

  // ==========================================
  // RENDERIZADO CONDICIONAL (La magia de React)
  // ==========================================

  // 1. Mostrar la pantalla de carga full-screen que diseñamos
  if (isLoading) {
    return <LoadingCatalogo />;
  }

  // 2. Mostrar la pantalla de error de conexión
  if (errorType === 'WIFI_ERROR') {
    return (
      <GenericErrorScreen 
        title="Se perdió la conexión con el servidor. Intentando reconectar..."
        errorIcon={require('../../assets/errores/error_internet.png')}
      />
    );
  }

  // 3. Mostrar la pantalla de error de servidor
  if (errorType === 'SERVER_DOWN') {
    return (
      <GenericErrorScreen 
        title="No pudimos cargar el catálogo en este momento."
        errorIcon={require('../../assets/errores/error_internet.png')}
        description="Por favor, intentá nuevamente más tarde."
      />
    );
  }

  // 4. Si todo salió bien, mostrar el catálogo normal
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subastas</Text>
      
      <TextInput 
        style={styles.search} 
        placeholder="Búsqueda..." 
        placeholderTextColor="#777" 
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {subastas.length === 0 ? (
          <Text style={styles.emptyText}>No hay subastas disponibles en este momento.</Text>
        ) : (
          subastas.map((subasta) => (
            <AuctionCard
              key={subasta._id}
              id={subasta._id}
              title={subasta.titulo}
              category={
                subasta.categoriaRequerida 
                  ? subasta.categoriaRequerida.charAt(0).toUpperCase() + subasta.categoriaRequerida.slice(1) 
                  : 'Común'
              }
              estado={subasta.estado}
              // Ojo acá: en el futuro esto debería venir de subasta.imagenUrl
              image={require('../../assets/images/totoro_clock.jpg')} 
            />
          ))
        )}
      </ScrollView>

      <BottomNav />
    </View>
  );
}