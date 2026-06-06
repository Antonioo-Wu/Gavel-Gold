import { StyleSheet } from 'react-native';

export const CategoryPillTheme = {
    colors: {
        platino: { bg: '#40E0D0', text: '#090909' },
        oro: { bg: '#E0BF66', text: '#090909' },
        especial: { bg: '#FF6347', text: '#090909' },
        plata: { bg: '#C0C0C0', text: '#090909' },
        comun: { bg: '#555555', text: '#FFFFFF' }
    }
};

export const categoryPillStyles = StyleSheet.create({
    pill: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 50,
        alignSelf: 'flex-start'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 12
    }
});