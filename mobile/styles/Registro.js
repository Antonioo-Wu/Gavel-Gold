import { StyleSheet } from 'react-native';

export const registroStyles = StyleSheet.create({
  background: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  container: { 
    padding: 24 
  },
  containerDark: { 
    flex: 1, 
    backgroundColor: '#1E1B16', 
    padding: 24, 
    justifyContent: 'center' 
  },
  title: { 
    color: 'white', 
    fontSize: 24, 
    textAlign: 'center', 
    marginBottom: 24, 
    fontWeight: 'bold' 
  },
  subtitle: { 
    color: '#333', 
    textAlign: 'center', 
    marginBottom: 24, 
    fontWeight: 'bold' 
  },
  headerDark: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
  headerCentered: { 
    textAlign: 'center', 
    marginBottom: 24 
  },
  subtext: { 
    fontSize: 12, 
    color: '#555', 
    marginBottom: 24 
  },
  list: { 
    marginBottom: 24, 
    paddingLeft: 16 
  },
  listItem: { 
    fontSize: 12, 
    color: '#777', 
    marginBottom: 4 
  },
  paymentRow: { 
    flexDirection: 'row', 
    gap: 16, 
    marginBottom: 16 
  },
  paymentBtn: { 
    backgroundColor: '#F5F5F5', 
    padding: 16, 
    borderRadius: 8, 
    flex: 1, 
    alignItems: 'center' 
  }
});