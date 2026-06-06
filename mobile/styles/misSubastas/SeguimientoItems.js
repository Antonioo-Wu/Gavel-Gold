import { StyleSheet } from 'react-native';

export const seguimientoStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#090909',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingVertical: 4,
  },
  backButtonText: {
    color: '#E0BF66', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#F6F1E7',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemCard: {
    backgroundColor: '#1E1B16',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#2A251D',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#2A251D',
    resizeMode: 'contain', // Asegura que las imágenes no se deformen
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    color: '#F6F1E7',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemCategory: {
    color: '#E0BF66',
    fontSize: 14,
    marginTop: 4,
  },
  itemId: {
    color: '#888888',
    fontSize: 13,
    marginTop: 2,
  },
  sectionTitle: {
    color: '#E0BF66',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  // Tarjeta de información variable (Propuesta, Depósito, Rechazo, etc)
  infoCard: {
    backgroundColor: '#1E1B16',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#3D3526',
  },
  infoCardError: {
    borderColor: '#D32F2F', // Borde rojo para rechazos
    backgroundColor: 'rgba(211, 47, 47, 0.05)',
  },
  infoCardTitle: {
    color: '#F6F1E7',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoCardTitleError: {
    color: '#ff8a80',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  infoValue: {
    color: '#F6F1E7',
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 12,
  },
  textDescription: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 22,
  },
  buttonGroup: {
    marginTop: 25,
  },
  btnPrimary: {
    backgroundColor: '#E0BF66',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnPrimaryText: {
    color: '#090909',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
  },
  btnSecondaryText: {
    color: '#F6F1E7',
    fontWeight: 'bold',
    fontSize: 16,
  },
});