import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1814', // Fondo oscuro Gavel & Gold
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  
  // --- Header ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: {
    width: 35,
    height: 45,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F6F1E7',
  },

  // --- Tabs ---
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#E0BF66', // Dorado para la pestaña activa
  },
  tabText: {
    fontSize: 15,
    color: '#888888', // Gris para la inactiva
    fontWeight: '500',
  },
  activeTabText: {
    color: '#E0BF66', // Dorado para el texto activo
    fontWeight: 'bold',
  },

  // --- Buscador y Filtro ---
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F1E7', // Color crema
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#090909',
  },
  filterButton: {
    backgroundColor: '#F6F1E7',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // --- Lista y Tarjetas ---
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Espacio para el BottomNav
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardContent: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#090909',
    marginBottom: 8,
  },
  badgeContainer: {
    backgroundColor: '#27AE60', // Verde de "En Curso"
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardInfoText: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
    fontWeight: '500',
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#EAEAEA', // Color de fondo por si tarda en cargar la imagen
  },
  
  // --- Estados Vacíos ---
  emptyText: {
    color: '#888888',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  }
});