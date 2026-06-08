import { StyleSheet } from 'react-native';

export const detalleDepositoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090909'
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40
  },
  header: {
    marginBottom: 20,
    marginTop: 20
  },
  title: {
    color: '#E0BF66',
    fontSize: 24,
    fontWeight: 'bold'
  },
  itemInfoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#1E1B16',
    padding: 12,
    borderRadius: 10
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15
  },
  itemName: {
    color: '#F6F1E7',
    fontSize: 18,
    fontWeight: 'bold'
  },
  itemId: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4
  },
  cardLogistica: {
    backgroundColor: '#1E1B16',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E0BF66'
  },
  cardTitle: {
    color: '#E0BF66',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  sectionTitle: {
    color: '#F6F1E7',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  label: {
    color: '#aaa',
    fontSize: 14
  },
  value: {
    color: '#F6F1E7',
    fontSize: 14,
    fontWeight: 'bold'
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 15
  },
  btnPrimary: {
    backgroundColor: '#E0BF66',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30
  },
  btnPrimaryText: {
    color: '#090909',
    fontSize: 16,
    fontWeight: 'bold'
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
    marginTop: 15
  },
  btnSecondaryText: {
    color: '#F6F1E7',
    fontSize: 16,
    fontWeight: 'bold'
  },
  cardListo: {
    backgroundColor: '#1E1B16',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#27AE60'
  },
  cardListoTitle: {
    color: '#27AE60',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});