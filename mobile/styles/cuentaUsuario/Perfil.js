import { StyleSheet, Platform, Dimensions } from 'react-native';

// Obtenemos el ancho exacto de la pantalla del celular
const { width } = Dimensions.get('window');

export const backgroundSource = require('../../assets/fondo_dorado.jpg');

export const PerfilStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  // Contenedor general (solo ocupa la pantalla)
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30, // Margen superior seguro
  },
  // ESTE ES EL SECRETO: El contenido del scroll NO DEBE tener flex: 1
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Deja espacio para que la navbar no lo pise
  },
  
  // --- Textos ---
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#090909', // Si tu fondo es muy oscuro, cambialo a '#FFFFFF'
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  categoryText: {
    fontSize: 14,
    color: '#090909',
    marginRight: 8,
    fontWeight: '600',
  },
  categoryBadge: {
    backgroundColor: '#E0BF66', // Dorado
    paddingHorizontal: 12,
    paddingVertical: 4, 
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 12, 
    fontWeight: 'bold',
  },
  
  // --- Grilla de Íconos (Adaptable a cualquier pantalla) ---
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24, 
  },
  gridItemWrapper: {
    alignItems: 'center',
    // Divide el ancho disponible en 3, asegurando que nunca se aplasten
    width: (width - 40) / 3.2, 
  },
  gridIconContainer: {
    backgroundColor: '#090909',
    width: 50, 
    height: 50, 
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  gridIcon: {
    fontSize: 22,
  },
  gridLabel: {
    fontSize: 12,
    color: '#090909', 
    textAlign: 'center',
    fontWeight: '600',
  },

  // --- Botón Mis Subastas ---
  subastasButton: {
    backgroundColor: '#090909',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14, // Usa padding, no height fijo
    borderRadius: 12,
    marginBottom: 24,
  },
  subastasText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  // --- Lista de Información (Caja Blanca) ---
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

  // --- Botón Cerrar Sesión ---
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    paddingVertical: 14, // Usa padding, no height fijo
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutText: {
    color: '#FFFFFF', 
    fontSize: 15,
    fontWeight: 'bold',
  }
});