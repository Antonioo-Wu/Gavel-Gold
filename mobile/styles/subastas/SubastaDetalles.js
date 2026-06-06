import { StyleSheet } from 'react-native';

export const subastaDetallesStyles = StyleSheet.create({
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
  mainWrapper: {
    flex: 1,
    backgroundColor: '#1E1B16',
  },
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  backText: {
    color: '#E0BF66',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  catalogTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#D4AF37',
    marginTop: 12,
    fontSize: 16,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cardContainer: {
    backgroundColor: '#090909',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  imgContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#111',
    marginBottom: 12,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  desc: {
    color: '#CCC',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#222',
    paddingTop: 12,
  },
  priceLabel: {
    color: '#888',
    fontSize: 14,
  },
  price: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // --- BOTÓN ---
  participateBtn: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  btnText: {
    color: '#1A1A1A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionButtonContainer: {
    marginBottom: 40,
  }
});