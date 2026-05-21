import { StyleSheet } from 'react-native';

export const auctionButtonStyles = StyleSheet.create({
    button: {
        padding: 16,
        borderRadius: 50,
        alignItems: 'center',
        marginVertical: 8
    },
    solid: {
        backgroundColor: '#1A1A1A'
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#1A1A1A'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textSolid: {
        color: '#FFFFFF'
    },
    textOutline: {
        color: '#1A1A1A'
    }
});