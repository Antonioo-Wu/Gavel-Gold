import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const backgroundSource = require('../../assets/fondo_dorado.jpg');
export const PerfilTheme = {
  blur: {
    intensity: 60,
    tint: 'dark',
  },
  iconGrid: {
    size: 28,
    color: '#ffffff',
  },
  iconInfo: {
    size: 22,
    color: '#333',
  },
  gridColors: {
    misDatos: 'rgba(189, 158, 73, 0.4)',
    metodosPago: 'rgba(97, 94, 87, 0.4)',
    misMetricas: 'rgba(255, 187, 0, 0.4)',
  }
};

export const PerfilStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  whiteCard: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 130,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#090909', 
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  categoryText: {
    fontSize: 14,
    color: '#ffffff',
    marginRight: 8,
    fontWeight: '600',
  },
  categoryBadge: {
    backgroundColor: '#E0BF66', 
    paddingHorizontal: 12,
    paddingVertical: 4, 
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 12, 
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24, 
  },
  gridItemWrapper: {
    alignItems: 'center',
    width: (width - 40) / 3.2, 
  },
  gridIconContainer: {
    width: 65, 
    height: 65, 
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    overflow: 'hidden', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)', 
  },
  gridIcon: {
    fontSize: 22,
  },
  gridLabel: {
    fontSize: 12,
    color: '#ffffff', 
    textAlign: 'center',
    fontWeight: '600',
  },
  subastasButton: {
    backgroundColor: '#090909',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 24,
  },
  subastasText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 16,
    paddingHorizontal: 16, 
    paddingVertical: 10,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#090909',
    marginBottom: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIconWrapper: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#090909',
    fontWeight: '500',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#A49A8A',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    paddingVertical: 14, 
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutText: {
    color: '#FFFFFF', 
    fontSize: 15,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F6F1E7',
  },
});