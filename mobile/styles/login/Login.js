import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // ESTO ES LA MAGIA: Le devuelve los márgenes laterales a tu tarjeta blanca
    paddingHorizontal: 24,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  link: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 15,
  },
  container: {
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
});