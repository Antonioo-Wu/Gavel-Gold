import { StyleSheet } from 'react-native';

export const seleccionMetodoStyles = StyleSheet.create({
  containerDark: {
    flex: 1,
    backgroundColor: '#1E1B16', // Fondo oscuro característico
    padding: 24,
    justifyContent: 'center'
  },
  containerCenter: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 96,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold'
  },
  headerCentered: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#090909',
  },
  
  // --- Fila de botones de pago ---
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10, // Espacio entre los 3 botones
    marginBottom: 24,
  },
  paymentBtn: {
    backgroundColor: '#F6F1E7', // Color crema
    paddingVertical: 14,
    paddingHorizontal: 5,
    borderRadius: 8,
    flex: 1, // Para que los 3 ocupen el mismo ancho
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  paymentBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#090909',
    textAlign: 'center',
  },

  // --- Contenedor del Botón Volver ---
  // --- Botón Volver con Borde ---
  backButton: {
    marginTop: 20,
    backgroundColor: 'transparent', 
    borderWidth: 1.5,               
    borderColor: '#F6F1E7',         
    borderRadius: 20,                
    paddingVertical: 10,            
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',           
    width: '80%',
  },
  backButtonText: {
    color: '#F6F1E7',               // Texto del mismo color que el borde
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default seleccionMetodoStyles;