import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerCenter: {
    padding: 24,
    alignItems: 'center',
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