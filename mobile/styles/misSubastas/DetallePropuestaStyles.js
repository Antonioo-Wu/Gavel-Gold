import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1814',
    alignItems: 'center',
    paddingTop: 40,
  },
  // --- Header ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: {
    width: 30,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F6F1E7',
  },
  // --- Tarjeta Principal Blanca ---
  card: {
    backgroundColor: '#FFFFFF',
    width: width * 0.85,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  tagContainer: {
    backgroundColor: '#7B61FF', // Violeta de "Pendiente de Aprobación"
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  itemInfoContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  itemId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#090909',
  },
  itemName: {
    fontSize: 14,
    color: '#666666',
  },
  // --- Carrusel de Imagen ---
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 24,
    color: '#090909',
  },
  itemImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  // --- Caja de Propuesta ---
  proposalBox: {
    backgroundColor: '#F6F1E7', // Color crema
    width: '100%',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  proposalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#090909',
    marginBottom: 10,
  },
  proposalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  proposalLabel: {
    fontSize: 14,
    color: '#333333',
  },
  proposalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#090909',
  },
  proposalPercentage: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 5,
  },
  // --- Botones de Acción ---
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 45,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnAccept: {
    backgroundColor: '#27AE60', // Verde
  },
  btnReject: {
    backgroundColor: '#EB5757', // Rojo
  },
  btnBack: {
    backgroundColor: '#090909', // Negro
    width: '50%',
    marginTop: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  }
});