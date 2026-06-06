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
  // --- MEJORA DEL SCROLL ---
  scrollContent: {
    flexGrow: 1, // Esto obliga al scroll a expandirse y soluciona cortes
    padding: 24,
    paddingBottom: 150, // Más espacio libre al final para que BottomNav no lo tape
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
  subtitle: {
    textAlign: 'center',
    fontSize: 13,
    color: '#555',
    marginBottom: 24,
    fontWeight: '500',
  },

  // --- GRILLA DE FOTOS ---
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
    justifyContent: 'center',
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#EAEAEA',
  },
  addPhotoBtn: {
    width: 80,
    height: 80,
    backgroundColor: '#F6F1E7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderStyle: 'dashed', // Un bordecito punteado dorado queda lindo
  },
  uploadIcon: {
    fontSize: 30,
  },

  // --- CHECKBOXES SEPARADOS ---
  checkboxesWrapper: {
    marginBottom: 10,
    width: '100%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Para que el check quede arriba si el texto ocupa 2 renglones
    marginBottom: 15,
    paddingRight: 10,
  },
  checkboxItem: {
    marginRight: 12,
    marginTop: 2, // Pequeño ajuste para alinear con el texto
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },

  termsLink: {
    marginBottom: 24,
    alignSelf: 'center',
  },
  termsLinkText: {
    fontSize: 14,
    color: '#555',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});