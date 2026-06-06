import { StyleSheet, Platform } from 'react-native';

export const BottomNavTheme = {
    iconSize: 20,
};

export const bottomNavStyles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff', // O el color que tengas
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 50, 
    left: 0, 
    right: 0,
    // LA MAGIA: Redondeamos solo las esquinas superiores del Navbar
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    
    // Opcional: Podés agregarle una sombrita suave para que resalte más sobre el fondo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10, // Sombra para Android
  },
    navButton: {
        alignItems: 'center',
        padding: 8,
    },
    active: {
        borderBottomWidth: 2,
        borderBottomColor: '#E0BF66',
    },
    navIcon: {
        fontSize: 20,
        marginBottom: 4,
    },
    navLabel: {
        fontSize: 12,
        color: '#090909',
    }
});