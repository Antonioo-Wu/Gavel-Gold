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
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 120,
  },

  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    lineHeight: 34,
  },

  tagContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 25,
  },

  tagText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },

  label: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 10,
  },

  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 25,
  },

  currencySymbol: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 8,
  },

  amountInput: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    minWidth: 220,
    paddingVertical: 0,
  },

  pickerContainer: {
    width: 150,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 12,
    marginBottom: 25,
    overflow: 'hidden',
  },

  picker: {
    height: 50,
  },

  textarea: {
    minHeight: 220,
    backgroundColor: '#F1EEE5',
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 4,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 30,
  },

  createButton: {
    backgroundColor: '#111',
    borderRadius: 20,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  createButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
  },

  volverButtonWrapper: {
    marginTop: 5,
  }
  ,sectionTitle: {
  fontSize: 18,
  fontWeight: '600',
  color: '#111',
  marginBottom: 10,
},

tagInputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 15,
},

tagInput: {
  flex: 1,
  borderWidth: 1,
  borderColor: '#DDD',
  borderRadius: 10,
  paddingHorizontal: 12,
  height: 45,
  backgroundColor: '#FFF',
},

addTagButton: {
  width: 45,
  height: 45,
  backgroundColor: '#000',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 8,
},

addTagText: {
  color: '#FFF',
  fontSize: 24,
  fontWeight: 'bold',
},

tagsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 25,
},

tagChip: {
  backgroundColor: '#333',
  borderRadius: 20,
  paddingHorizontal: 12,
  paddingVertical: 8,
  marginRight: 8,
  marginBottom: 8,
},

tagChipText: {
  color: '#FFF',
  fontSize: 14,
},
photosGrid: {
  alignItems: 'center',
  marginBottom: 30,
},

photoThumbnail: {
  width: 280,
  height: 280,
  borderRadius: 0,
},

addPhotoBtn: {
  width: 280,
  height: 280,
  backgroundColor: '#EFEFEF',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 0,
  borderWidth: 0,
},
});