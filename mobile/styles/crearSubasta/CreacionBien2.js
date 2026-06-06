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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 140,
  },

  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 25,
    lineHeight: 34,
  },

  subtitle: {
    fontSize: 16,
    color: '#111',
    marginBottom: 20,
    textAlign: 'left',
  },

  photosGrid: {
    alignItems: 'center',
    marginBottom: 30,
  },

  addPhotoBtn: {
    width: 280,
    height: 280,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },

  uploadIcon: {
    fontSize: 80,
    opacity: 0.25,
  },

  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 4,
  },

  checkboxesWrapper: {
    width: '100%',
    marginBottom: 20,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 22,
  },

  checkboxItem: {
    width: 24,
    height: 24,
    marginRight: 15,
    marginTop: 2,
  },

  checkboxLabel: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    lineHeight: 24,
  },

  termsLink: {
    alignSelf: 'flex-start',
    marginBottom: 25,
  },

  termsLinkText: {
    fontSize: 16,
    color: '#111',
    textDecorationLine: 'underline',
  },

  loadingIndicator: {
    marginVertical: 15,
  },

  photosPreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },

  backButtonContainer: {
    marginTop: 15,
  },
});