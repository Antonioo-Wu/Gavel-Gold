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
  },
  paymentCard: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeValidated: {
    backgroundColor: '#e8f5e9',
  },
  badgePending: {
    backgroundColor: '#fff3e0',
  },
  badgeTextValidated: {
    color: '#2e7d32',
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgeTextPending: {
    color: '#f57c00',
    fontSize: 12,
    fontWeight: 'bold',
  },
  paymentDetailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});