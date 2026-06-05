import { StyleSheet, Platform } from 'react-native';

export const UsuarioMediosPagoStyles = StyleSheet.create({
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
        color: '#FFFFFF', // Blanco nítido sobre el oro
    },
    
    // --- Wrapper del Scroll (Evita que la tarjeta quede estirada al fondo) ---
    scrollWrapper: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    infoContainer: {
        padding: 15,
    },
    listContainer: {
        paddingBottom: 1,
    },
    
    // --- Filas limpias de Métodos de Pago ---
    paymentItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0', // Separador sutil gris claro
    },
    paymentItemLast: {
        paddingVertical: 10,
    },
    paymentHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    paymentTypeTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#555555', // Gris oscuro elegante
    },
    
    // --- Badges Adaptados ---
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeValidated: {
        backgroundColor: '#E8F5E9', // Fondo verde sutil
    },
    badgePending: {
        backgroundColor: '#FFF3E0', // Fondo naranja sutil
    },
    badgeTextValidated: {
        color: '#27AE60',
        fontSize: 11,
        fontWeight: 'bold',
    },
    badgeTextPending: {
        color: '#E67E22',
        fontSize: 11,
        fontWeight: 'bold',
    },
    
    // --- Textos de Información ---
    detailsContent: {
        paddingLeft: 2,
    },
    paymentDetailText: {
        fontSize: 14,
        color: '#1A1A1A', // Negro nítido sobre la tarjeta blanca
        marginBottom: 4,
    },
    emptyText: {
        color: '#555555',
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 15,
    },
    loadingIndicator: {
        marginTop: 30,
        marginBottom: 30,
    },
    
    // --- Botones de Acción Internos ---
    addButton: {
        backgroundColor: '#090909', // Negro sólido
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 12,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    backButton: {
    marginTop: 20,
    backgroundColor: 'transparent', 
    borderWidth: 1.5,               
    borderColor: '#F6F1E7',         
    borderRadius: 20,                
    paddingVertical: 10,            
    alignItems: 'center',
    alignSelf: 'center',           
    width: '80%',
  },
  backButtonText: {
    color: '#F6F1E7',               // Texto del mismo color que el borde
    fontSize: 16,
    fontWeight: 'bold',
  }
});