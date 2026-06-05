import { StyleSheet } from 'react-native';

const subastaDetallesStlyes = StyleSheet.create({
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
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingIndicator: {
    marginTop: 50,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  catalogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#1A1A1A',
  },
  cardContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  participateBtn: {
    backgroundColor: '#D4AF37',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 10,
  }
});

export { subastaDetallesStlyes };
export default subastaDetallesStlyes;