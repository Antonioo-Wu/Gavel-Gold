export const datosUsuarioStyles = StyleSheet.create({
    dataCard: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        marginBottom: 20,
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dataLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    dataValue: {
        fontSize: 14,
        color: '#1A1A1A',
        textAlign: 'right',
        flex: 1,
        paddingLeft: 16,
    },
    backButton: {
        backgroundColor: '#333',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 40,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingIndicator: {
    marginTop: 40,
  },
  dataValueCategory: {
    fontWeight: 'bold', 
    color: '#D4AF37',
  },
  dataRowLast: {
    borderBottomWidth: 0,
  },
  statusTextBase: {
    fontWeight: 'bold',
  },
  statusActive: {
    color: '#2e7d32',
  },
  statusInactive: {
    color: '#f57c00',
  }
})