import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// 1. Extraemos los valores visuales en línea para el JSX
export const PujaTheme = {
  iconSize: 20,
  placeholderColor: '#A49A8A',
};

// 2. Estilos principales de la pantalla de Puja
export const pujaStyles = StyleSheet.create({
  // --- LAYOUT PRINCIPAL ---
  container: {
    flex: 1,
    backgroundColor: '#1E1B16', // Fondo oscuro de la app
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width * 0.85,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  scrollCardWrapper: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 130,
  },
  buttonDisabled: {
    opacity: 0.7,
  },

  // --- HEADER DE LA TARJETA ---
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 40,
    height: 50,
    resizeMode: 'contain',
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  tagOro: {
    backgroundColor: '#E0BF66',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  itemId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#090909',
  },
  itemName: {
    fontSize: 12,
    color: '#666666',
  },

  // --- IMAGEN Y CONTROLES ---
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  itemImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 24,
    color: '#090909',
  },

  // --- ESTADO Y DETALLES ---
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  statusBadge: {
    backgroundColor: '#F6F1E7',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  statusBadgeText: {
    color: '#090909',
    fontSize: 12,
  },
  detailsButton: {
    backgroundColor: '#1E1B16',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  // --- SECCIÓN DE OFERTA ---
  offerText: {
    fontSize: 16,
    color: '#090909',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F1E7',
    borderWidth: 1,
    borderColor: '#E0BF66',
    borderRadius: 12,
    width: '100%',
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
  },
  currencySymbol: {
    fontSize: 18,
    color: '#E0BF66',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#090909',
  },
  limitsText: {
    fontSize: 10,
    color: '#666666',
    width: '100%',
    marginBottom: 20,
    lineHeight: 14,
  },

  // --- SELECTOR DE MÉTODO DE PAGO ---
  paymentLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#090909',
    width: '100%',
    marginBottom: 8,
  },
  paymentSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D4AF37', // Dorado principal
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
  },
  paymentSelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 10,
  },
  paymentText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // --- BOTÓN REALIZAR PUJA ---
  submitButton: {
    backgroundColor: '#5A4A2A', // Marrón oscuro/dorado
    width: '100%',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // --- NAVBAR MOCK ---
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    width: width * 0.85,
    paddingVertical: 15,
    borderRadius: 16,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    color: '#090909',
    marginTop: 4,
  }
});

// 3. SEPARAMOS LOS ESTILOS DEL MODAL PARA QUE QUEDEN INDEPENDIENTES
export const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo oscuro semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: width * 0.85,
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 5,
    marginRight: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#090909',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#090909',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F1E7',
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentOptionIcon: {
    fontSize: 18,
    color: '#090909',
    marginRight: 15,
  },
  paymentOptionText: {
    fontSize: 14,
    color: '#090909',
  },
  checkIcon: {
    fontSize: 16,
    color: '#090909',
  },
  confirmButton: {
    backgroundColor: '#090909',
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});