import { StyleSheet } from 'react-native';

export const CreacionBienPasosStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1B16',
    flex: 1, // Reemplaza a minHeight: '100vh'
    padding: 24,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 0,
    marginBottom: 24,
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  tagContainer: {
    backgroundColor: '#333',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 24,
    alignSelf: 'flex-start', // Simula el display: 'inline-block'
  },
  tagText: {
    color: 'white',
    fontSize: 12,
  },
  label: {
    color: '#555',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    width: '100%',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginRight: 16, // Simula el gap
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    padding: 0,
  },
  selectContainer: {
    marginBottom: 24,
    width: '100%',
  },
  selectMock: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  selectText: {
    color: '#333',
  },
  textArea: {
    width: '100%',
    height: 120,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginBottom: 24,
    textAlignVertical: 'top', // Hace que el texto empiece arriba en Android
  }
});