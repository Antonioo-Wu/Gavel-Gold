import { StyleSheet } from 'react-native';

export const detalleRechazoStyles = StyleSheet.create({
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
  cardMotivo: { 
    backgroundColor: '#1E1B16', 
    padding: 20, 
    borderRadius: 10, 
    marginTop: 20, 
    borderWidth: 1, 
    borderColor: '#d32f2f' // Borde rojo de alerta
  },
  cardTitle: { 
    color: '#d32f2f', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  cardText: { 
    color: '#F6F1E7', 
    fontSize: 14, 
    lineHeight: 22 
  },
  backButton: { 
    backgroundColor: '#333', 
    paddingVertical: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 30 
  },
  backButtonText: { 
    color: '#F6F1E7', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});