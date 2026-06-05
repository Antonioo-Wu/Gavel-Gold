import { StyleSheet } from 'react-native';

export const CreacionBienTheme = {
  colors: {
    primary: '#D4AF37',
    transparent: undefined,
  },
  indicatorSize: 'large',
};

export const CreacionBienStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1B16',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1A1A1A',
    lineHeight: 30,
  },
  tagContainer: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  tagText: {
    color: 'white',
    fontSize: 12,
  },
  label: {
    color: '#555',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  pickerContainer: {
    marginBottom: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
  },
  textarea: {
    width: '100%',
    height: 120,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginBottom: 24,
    textAlignVertical: 'top',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
    marginBottom: 24,
  },
  uploadBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#F6F1E7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadIcon: {
    fontSize: 48,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  termsLink: {
    paddingLeft: 24,
    marginBottom: 24,
  },
  termsLinkText: {
    fontSize: 14,
    color: '#555',
    textDecorationLine: 'underline',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  checkboxItem: {
    marginRight: 10,
  },
  volverButtonWrapper: {
    width: '100%',
    outlineColor: '#F6F1E7',
  },
  createButton: {
    backgroundColor: '#F6F1E7',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#090909',
  },
});
