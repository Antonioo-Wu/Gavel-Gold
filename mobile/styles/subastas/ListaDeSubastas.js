import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  mainWrapper: { flex: 1, backgroundColor: '#121212' },
  container: { flex: 1, padding: 20 },
  headerContainer: { marginBottom: 20 },
  brandText: { color: '#D4AF37', fontSize: 14, letterSpacing: 1 },
  screenTitle: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },

  // Buscador y filtro
  noResultsContainer: {
    marginTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noResultsText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row', backgroundColor: '#1E1B16',
    padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 20
  },
  searchInput: { flex: 1, color: '#FFF', marginLeft: 10 },

  auctionCard: {
    backgroundColor: '#090909', borderRadius: 16, marginBottom: 20, overflow: 'hidden'
  },
  mainImageContainer: { width: '100%', height: 180 },
  mainImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  placeholderImg: { width: '100%', height: '100%', backgroundColor: '#222' },

  cardContent: { padding: 16 },
  badgeContainer: {
    marginVertical: 12,
  },
  auctionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, alignItems: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusText: { color: '#FFF', 
  fontSize: 14,
  fontWeight: '600' },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // Espacio entre el estado y la categoría
  },
  categoryText: { color: '#888', fontSize: 13, marginLeft: 6 },
categoryRow: {
  // Aquí la categoría queda alineada a la izquierda automáticamente
  alignSelf: 'flex-start',
},
  viewCatalogButton: {
    backgroundColor: '#D4AF37', padding: 14, borderRadius: 8, alignItems: 'center'
  },
  viewCatalogButtonText: { color: '#090909', fontWeight: 'bold' },
  scrollListContent: { paddingBottom: 100 }
});

export default styles;