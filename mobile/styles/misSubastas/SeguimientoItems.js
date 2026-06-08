import { StyleSheet } from 'react-native';

export const seguimientoStyles = StyleSheet.create({
  // --- CONTENEDORES PRINCIPALES ---
  mainContainer: {
    flex: 1,
    backgroundColor: '#090909',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    color: '#E0BF66', // Dorado de tu diseño original
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  // --- BOTÓN DE VOLVER ---
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingVertical: 4,
  },
  backButtonText: {
    color: '#E0BF66', 
    fontSize: 16,
    fontWeight: 'bold',
  },

  // --- TARJETA DEL ARTÍCULO (Arriba) ---
  itemCard: {
    backgroundColor: '#1E1B16',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#2A251D',
    resizeMode: 'cover', 
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: '#F6F1E7',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemId: {
    color: '#888888',
    fontSize: 13,
    marginTop: 4,
  },

  // --- TÍTULOS DE SECCIÓN ---
  sectionTitle: {
    color: '#E0BF66',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },

  // --- TARJETAS DINÁMICAS DE ESTADO (Propuesta, Depósito, etc) ---
  infoCard: {
    backgroundColor: '#1E1B16',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E0BF66', // Borde dorado por defecto
  },
  infoCardTitle: {
    color: '#E0BF66',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  textDescription: {
    color: '#F6F1E7',
    fontSize: 14,
    lineHeight: 22,
  },

  // --- VARIANTES DE ERROR (Rechazos) ---
  infoCardError: {
    borderColor: '#d32f2f', // Borde rojo para rechazos
  },
  infoCardTitleError: {
    color: '#d32f2f',
  },

  // --- FILAS DE DATOS (Precio, Comisión, Sector, etc) ---
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    color: '#AAAAAA',
    fontSize: 15,
  },
  infoValue: {
    color: '#F6F1E7',
    fontSize: 15,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 12,
  },

  // --- BOTONES DE ACCIÓN ---
  buttonGroup: {
    marginTop: 25,
  },
  btnPrimary: {
    backgroundColor: '#E0BF66',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnPrimaryText: {
    color: '#090909',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
  },
  btnSecondaryText: {
    color: '#F6F1E7',
    fontWeight: 'bold',
    fontSize: 16,
  }
});