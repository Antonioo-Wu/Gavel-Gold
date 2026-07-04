import { StyleSheet } from 'react-native';

export const multasUsuarioStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#D4AF37',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    textAlign: 'center',
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardInactiva: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  motivo: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  estado: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  estadoPendiente: {
    color: '#FF6B6B',
  },
  estadoPagada: {
    color: '#4CAF50',
  },
  monto: {
    color: '#CCC',
    fontSize: 14,
    marginBottom: 15,
  },
  payButton: {
    backgroundColor: '#D4AF37',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 35,
    backgroundColor: 'transparent', 
    borderWidth: 1.5,               
    borderColor: '#F6F1E7',
    borderRadius: 20,
    paddingVertical: 10,            
    alignItems: 'center',
    alignSelf: 'center',           
    width: '80%',
  },
  backButtonText: {
    color: '#F6F1E7',
    fontSize: 16,
    fontWeight: 'bold',
  }
});