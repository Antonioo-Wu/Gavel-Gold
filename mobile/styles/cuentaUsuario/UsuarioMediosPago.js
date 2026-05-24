import { StyleSheet } from 'react-native';

export const UsuarioMediosPagoStyles = StyleSheet.create({
    paymentCard: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    paymentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    paymentType: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    badgeValidated: {
        backgroundColor: '#e8f5e9',
    },
    badgePending: {
        backgroundColor: '#fff3e0',
    },
    badgeTextValidated: {
        color: '#2e7d32',
        fontSize: 12,
        fontWeight: 'bold',
    },
    badgeTextPending: {
        color: '#f57c00',
        fontSize: 12,
        fontWeight: 'bold',
    },
    paymentDetailText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    emptyContainer: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: '#888',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    addButton: {
        backgroundColor: '#D4AF37',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 16,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});