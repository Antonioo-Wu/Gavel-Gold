import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco como en el diseño
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    marginTop: height * 0.1, // Margen superior dinámico según la pantalla
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Centra el contenido verticalmente
    width: '100%',
    paddingBottom: height * 0.15, // Compensa el logo para que quede bien centrado
  },
  title: {
    fontFamily: 'Inter-Bold', // Asegurate de tener linkeada la fuente Inter
    fontSize: 22,
    fontWeight: 'bold',
    color: '#090909', // Negro de tu paleta
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 28,
  },
  iconPlaceholder: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#090909',
    textAlign: 'center',
    lineHeight: 22,
  }
});