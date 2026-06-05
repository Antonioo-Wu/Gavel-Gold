import { StyleSheet } from 'react-native';

export const detallePropuestaStyles = StyleSheet.create({
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
  cardPropuesta: { 
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
    marginBottom: 20 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12 
  },
  label: { 
    color: '#aaa', 
    fontSize: 15 
  },
  value: { 
    color: '#F6F1E7', 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#333', 
    marginVertical: 15 
  },
  totalLabel: { 
    color: '#E0BF66', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  totalValue: { 
    color: '#E0BF66', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  noteText: { 
    color: '#888', 
    fontSize: 12, 
    marginTop: 15, 
    fontStyle: 'italic', 
    textAlign: 'center',
    lineHeight: 18
  },
  botonesContainer: { 
    marginTop: 25,
  },
  btnAceptar: { 
    backgroundColor: '#E0BF66', 
    paddingVertical: 15, 
    borderRadius: 8, 
    alignItems: 'center',
    marginBottom: 15
  },
  btnAceptarText: { 
    color: '#090909', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  btnRechazar: { 
    backgroundColor: 'transparent', 
    paddingVertical: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#d32f2f' 
  },
  btnRechazarText: { 
    color: '#d32f2f', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});