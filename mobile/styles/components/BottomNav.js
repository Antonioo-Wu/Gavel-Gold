import { StyleSheet } from 'react-native';


export const bottomNavStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#333',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    navButton: {
        alignItems: 'center',
        padding: 8,
    },
    active: {
        borderBottomWidth: 2,
        borderBottomColor: '#E0BF66',
    },
    navIcon: {
        fontSize: 20,
        marginBottom: 4,
    },
    navLabel: {
        fontSize: 12,
        color: '#090909',
    }
});