import { StyleSheet } from 'react-native';

export const seleccionMetodoStyles = StyleSheet.create({
  containerDark: {
    flex: 1,
    backgroundColor: '#1E1B16',
    padding: 24,
    justifyContent: 'center'
  },
  containerCenter: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 96,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold'
  },
  headerCentered: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#090909',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 24,
  },
  paymentBtn: {
    backgroundColor: '#F6F1E7',
    paddingVertical: 14,
    paddingHorizontal: 5,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  paymentBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#090909',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: 'black', 
    borderWidth: 1.5,               
    borderColor: '#F6F1E7',         
    borderRadius: 20,                
    paddingVertical: 10,            
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',           
    width: '80%',
  },
  backButtonText: {
    color: '#F6F1E7',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default seleccionMetodoStyles;