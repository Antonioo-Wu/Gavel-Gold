import { StyleSheet } from 'react-native';

export const searchBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1E1B16',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 10,
    padding: 4,
  }
});