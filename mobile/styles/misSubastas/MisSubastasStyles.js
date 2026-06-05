import { StyleSheet } from 'react-native';

export const ItemCardTheme = {
  tagColors: {
    'Pendiente de Revisión': '#666666',
    'Pendiente de Aprobación del Usuario': '#7B61FF',
    'Aprobado': '#27AE60',
    'Rechazado': '#EB5757',
    'En Subasta': '#2D9CDB',
    'default': '#090909'
  }
};

export const misSubastasStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1814', // Fondo oscuro Gavel & Gold
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F6F1E7',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F1E7',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#090909',
  },
  listContainer: {
    // Reducimos el padding bottom porque los botones ya no flotan
    paddingBottom: 100, // Espacio suficiente para que el BottomNav no tape los botones
  },
  // --- Estilos de la Tarjeta ---
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginLeft: 15,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  itemId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#090909',
    marginBottom: 2,
  },
  itemName: {
    fontSize: 14,
    color: '#333333',
  },

  // --- BOTONES AL FINAL DEL SCROLL ---
  footerButtonsContainer: {
    marginTop: 10,
    paddingBottom: 20, // Aire adicional al final
  },
  createButton: {
    backgroundColor: '#F6F1E7',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15, // Separación con el botón de Volver
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#090909',
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
    width: '60%',
  },
  backButtonText: {
    color: '#F6F1E7',
    fontSize: 16,
    fontWeight: 'bold',
  }
});