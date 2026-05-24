import { StyleSheet } from 'react-native';

export const PerfilStlyes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flex: 1,
    padding: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  category: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  gridItem: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
  },
  gridIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoCard: {
    marginTop: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1A1A1A',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#333',
  },
  logoutButton: {
    margin: 16,
    marginBottom: 80,
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});