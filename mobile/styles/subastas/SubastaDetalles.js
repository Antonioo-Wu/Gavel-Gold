import { StyleSheet } from 'react-native';

export const subastaDetallesStlyes = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1E1B16', 
    padding: 24 
  },
  backButton: {
    marginBottom: 16,
    paddingVertical: 8,
  },
  backText: {
    color: '#E0BF66',
    fontSize: 16,
    fontWeight: 'bold',
  },
  id: {
    color: '#777',
    fontSize: 14,
    marginBottom: 8,
  },
  desc: {
    color: '#CCC',
    fontSize: 14,
    marginBottom: 16,
  },
  card: { 
    backgroundColor: '#090909', 
    borderRadius: 16, 
    padding: 16,
    marginBottom: 100,
  },
  img: { 
    width: '100%', 
    height: 200, 
    resizeMode: 'contain', 
    backgroundColor: 'white',
    borderRadius: 8,
  },
  name: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 10 
  },
  price: { 
    color: '#FFD700', 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  btn: { 
    backgroundColor: '#E0BF66', 
    padding: 16, 
    borderRadius: 50, 
    marginTop: 20 
  },
  btnText: { 
    textAlign: 'center', 
    fontWeight: 'bold',
    color: '#1A1A1A'
  }
});