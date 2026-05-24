import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import BottomNav from '../../components/BottomNav';
import AuctionCard from '../../components/AuctionCard';
import { API_URL } from '../../config/api';

import { listaDeSubastasStyles as styles } from '../../styles/subastas/ListaDeSubastas';

export default function ListadeSubastas() {
  const [subastas, setSubastas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerSubastas = async () => {
      try {
        const response = await fetch(`${API_URL}/subastas`);
        const data = await response.json();

        if (response.ok) {
          setSubastas(data);
        } else {
          Alert.alert("Error", "No se pudieron cargar las subastas.");
        }
      } catch (error) {
        Alert.alert("Error de red", "No se pudo conectar con el servidor.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    obtenerSubastas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subastas</Text>
      <TextInput style={styles.search} placeholder="Búsqueda..." placeholderTextColor="#777" />

      {isLoading ? (
        <ActivityIndicator size="large" color="#D4AF37" style={styles.loadingIndicator} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {subastas.length === 0 ? (
            <Text style={styles.emptyText}>No hay subastas disponibles en este momento.</Text>
          ) : (
            subastas.map((subasta) => (
              <AuctionCard
                key={subasta._id}
                id={subasta._id}
                title={subasta.titulo}
                category={subasta.categoriaRequerida ? subasta.categoriaRequerida.charAt(0).toUpperCase() + subasta.categoriaRequerida.slice(1) : 'Común'}
                estado={subasta.estado}
                image={require('../../assets/images/totoro_clock.jpg')}
              />
            ))
          )}
        </ScrollView>
      )}

      <BottomNav />
    </View>
  );
}