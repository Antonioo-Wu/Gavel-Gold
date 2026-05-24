import { StyleSheet } from 'react-native';

export const listaDeSubastasStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 24, 
    backgroundColor: '#090909' 
  },
  title: { 
    fontSize: 24, 
    color: 'white', 
    marginBottom: 16, 
    fontWeight: 'bold' 
  },
  search: { 
    backgroundColor: '#1E1B16', 
    padding: 12, 
    borderRadius: 8, 
    color: 'white', 
    marginBottom: 16 
  },
  loadingIndicator: {
    marginTop: 40,
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});