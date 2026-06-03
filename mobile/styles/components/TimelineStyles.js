import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  timelineContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  stepWrapper: {
    flexDirection: 'row',
    minHeight: 60, // Da espacio para que se dibuje la línea vertical
  },
  // --- Columna del Icono y Línea ---
  iconColumn: {
    width: 40,
    alignItems: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2, // Asegura que el icono quede por encima de la línea
  },
  // La línea que conecta los nodos
  verticalLine: {
    position: 'absolute',
    top: 24, // Empieza justo debajo del icono
    bottom: 0, // Se estira hasta el final del contenedor
    width: 2,
    backgroundColor: '#333333', // Color de línea inactiva por defecto
    zIndex: 1,
  },
  verticalLineActive: {
    backgroundColor: '#27AE60', // Línea verde si el paso está completado
  },
  // --- Columna de Textos ---
  textColumn: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 20, // Espacio antes del siguiente paso
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  titlePending: {
    color: '#666666', // Título grisado si es un paso futuro
  },
  subtitle: {
    fontSize: 12,
    color: '#A49A8A', // Color crema oscurecido
  },
  errorText: {
    color: '#EB5757', // Texto rojo para errores/rechazos
    fontWeight: 'bold',
    marginTop: 2,
  }
});