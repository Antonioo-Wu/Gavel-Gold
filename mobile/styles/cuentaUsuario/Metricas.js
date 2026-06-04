import { StyleSheet, Platform } from 'react-native';


export const backgroundSource = require('../../assets/fondo_dorado.jpg');

export const MetricasStyles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: '#1A1814', // Fondo oscuro característico de la app
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  // Textos de cabecera
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F6F1E7', // Blanco tiza / Crema
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E0BF66', // Dorado Gavel & Gold
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  // Contenedor del Scroll (El truco para la grilla de 2 columnas)
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Espacio para que el BottomNav no tape las últimas tarjetas
    flexDirection: 'row', // Pone los elementos en fila
    flexWrap: 'wrap', // Si no entran, los baja a la siguiente línea
    justifyContent: 'space-between',
  },
  // Tarjetas de Métricas
  metricCard: {
    backgroundColor: '#FFFFFF',
    width: '47%', // Al ser 47%, entran dos por fila dejando un margen en el medio
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    // Sombras sutiles para darle relieve
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666', // Texto secundario gris
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#090909', // Negro fuerte para el número
  }
});