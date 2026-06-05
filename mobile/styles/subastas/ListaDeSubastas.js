import { StyleSheet } from 'react-native';

export const listaSubastasStyles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#1E1B16',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 12,
  },
  brandText: {
    color: '#E0BF66',
    fontWeight: 'bold',
    fontSize: 18,
  },
  screenTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 8,
    borderRadius: 8,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
    color: '#E0BF66'
  },
  searchInput: {
    flex: 1,
    color: '#fff'
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 6,
  },
  sectionIcon: { marginRight: 8 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  scrollListContent: { paddingBottom: 100 },
  emptyContainer: { padding: 20 },
  emptyText: { color: '#666', textAlign: 'center' },
  auctionCard: {
    backgroundColor: '#090909',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  cardHeader: { marginBottom: 8 },
  auctionTitle: { color: '#fff', fontWeight: '700', fontSize: 16 },
  statusBadgeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  statusDot: { width: 10, height: 10, borderRadius: 10, marginRight: 8 },
  statusText: { marginRight: 12, fontWeight: '600' },
  timeRemainingText: { color: '#ccc' },
  catalogPreviewTitle: { color: '#E0BF66', marginTop: 8, marginBottom: 6 },
  previewImagesContainer: { flexDirection: 'row' },
  previewItemBox: { width: 60, height: 60, backgroundColor: '#fff', borderRadius: 8, marginRight: 8, justifyContent: 'center', alignItems: 'center' },
  previewIcon: { fontSize: 24 },
  img: { width: 56, height: 56, resizeMode: 'contain' },
  itemCountText: { color: '#ccc', marginTop: 8 },
  viewCatalogButton: { marginTop: 10, backgroundColor: '#E0BF66', padding: 10, borderRadius: 8, alignItems: 'center' },
  viewCatalogButtonText: { color: '#111', fontWeight: '700' },
});

export default listaSubastasStyles;