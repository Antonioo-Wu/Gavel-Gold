import { StyleSheet, Platform } from 'react-native';

export const DatosUsuarioTheme = {
  colors: {
    primary: '#D4AF37',
  },
  indicatorSize: 'large',
};

export const datosUsuarioStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: Platform.OS === 'ios' ? 50 : 30,
    },
    // --- Estilos Header FUERA de la tarjeta ---
    headerOutside: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    logoHeader: {
        width: 30,
        height: 38,
        resizeMode: 'contain',
        marginRight: 10,
    },
    titleHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF', // Blanco sobre dorado
    },
    
    // --- NUEVO: Wrapper del Scroll ---
    scrollWrapper: {
        paddingHorizontal: 20, // Despega la tarjeta de los bordes laterales
        paddingBottom: 130,
    },

    // --- Estilos INFO DENTRO de la tarjeta ---
    infoContainer: {
        padding: 15, // Margen interno para que los textos no toquen el borde de la tarjeta blanca
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    dataRowLast: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    dataLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555555',
        flex: 1,
    },
    dataValue: {
        fontSize: 14,
        color: '#1A1A1A',
        textAlign: 'right',
        flex: 1.5,
    },
    
    // --- Otros ---
    loadingIndicator: {
        marginTop: 30,
        marginBottom: 30,
    },
    emptyText: {
        color: '#555555',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    statusActive: {
        color: '#27AE60',
        fontWeight: 'bold',
    },
    statusInactive: {
        color: '#E67E22',
        fontWeight: 'bold',
    },

    // Botón de regreso
  backButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#F6F1E7',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: '10%',
    width: '80%',
  },
  backButtonText: {
    color: '#F6F1E7',
    fontSize: 16,
    fontWeight: 'bold',
  }
});