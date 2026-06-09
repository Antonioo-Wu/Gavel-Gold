import { StyleSheet } from 'react-native';

export const metodosDePagoStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1E1B16', 
    padding: 24, 
    justifyContent: 'center' 
  },
  title: { 
    color: 'white', 
    textAlign: 'center', 
    marginBottom: 24, 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  type: { 
    color: 'white', 
    textAlign: 'center', 
    marginBottom: 24, 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  header: { 
    color: '#1A1A1A', 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
  subtext: { 
    fontSize: 11, 
    color: '#777', 
    marginBottom: 20 
  },
  buttons: { 
    flexDirection: 'row', 
    gap: 16, 
    marginTop: 24 
  },
  inputRowCheque: {
    flexDirection: 'row',
    gap: 10,
  },
  inputRowTarjeta: {
    flexDirection: 'row',
    gap: 15,
  },
  inputItem: {
    flex: 1,
  }
});