import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    marginTop: 40,
    width: 96,
    height: 96,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  link: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 15,
  },
  container: {
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  formWrapper: {
    alignItems: 'center',
    paddingHorizontal: 24,
    width: '100%',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  requirementsContainer: {
    marginBottom: 20,
  },
  requirementText: {
    fontSize: 13,
    color: '#333333',
    lineHeight: 20,
  },
  formButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  }
});