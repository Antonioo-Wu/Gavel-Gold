import { StyleSheet } from 'react-native';

export const feedbackScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    touchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    emoji: {
        fontSize: 48,
        marginBottom: 16,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.6)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
});