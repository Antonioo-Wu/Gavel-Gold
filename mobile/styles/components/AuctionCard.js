import { StyleSheet } from 'react-native';

export const auctionCardStyles = StyleSheet.create({
    card: {
        backgroundColor: '#1E1B16',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
    },
    info: {
        flex: 1
    },
    id: {
        color: '#E0BF66',
        marginVertical: 8,
        fontWeight: 'bold'
    },
    title: {
        color: '#F6F1E7'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginLeft: 16,
        backgroundColor: 'white'
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginTop: 4
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'
    },
    badgeActive: {
        backgroundColor: '#f44336',
    },
    badgeInactive: {
        backgroundColor: '#555555',
    }
});