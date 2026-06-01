import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1814', // Fondo oscuro de la app
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    position: 'absolute',
    top: height * 0.15, // Mantiene el logo en la parte superior
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 60,
    height: 75,
    resizeMode: 'contain',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loadingText: {
    fontFamily: 'Inter-SemiBold', // O la tipografía que estén usando
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 24,
  },
  spinnerContainer: {
    marginBottom: 50,
  },
  warningContainer: {
    position: 'absolute',
    bottom: height * 0.10, // Fija el texto de advertencia abajo
    width: '100%',
    alignItems: 'center',
  },
  warningText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  }
});