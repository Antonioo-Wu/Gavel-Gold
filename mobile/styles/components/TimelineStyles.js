import { StyleSheet } from 'react-native';

export const timelineStyles = StyleSheet.create({
  timelineContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  pasoWrapper: {
    flexDirection: 'row',
    minHeight: 70,
    position: 'relative',
  },
  lineaVertical: {
    position: 'absolute',
    left: 17,
    top: 30,
    width: 2,
    bottom: -10,
    zIndex: 1,
  },
  lineaPendiente: {
    backgroundColor: '#333',
  },
  lineaCompletada: {
    backgroundColor: '#E0BF66', 
  },
  circuloBase: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderWidth: 2,
  },
  circuloPendiente: {
    backgroundColor: '#1E1B16',
    borderColor: '#333',
  },
  circuloActual: {
    backgroundColor: '#1E1B16',
    borderColor: '#E0BF66',
  },
  circuloCompletado: {
    backgroundColor: '#E0BF66',
    borderColor: '#E0BF66',
  },
  circuloError: {
    backgroundColor: '#d32f2f',
    borderColor: '#d32f2f',
  },
  iconoText: {
    fontSize: 14,
  },
  infoPaso: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'flex-start',
    paddingTop: 6,
  },
  labelBase: {
    fontSize: 16,
    fontWeight: '600',
  },
  textoPendiente: {
    color: '#666',
  },
  textoActual: {
    color: '#E0BF66',
  },
  textoCompletado: {
    color: '#F6F1E7',
  },
  textoError: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  subtexto: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 4,
  },
  boxRechazo: {
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: '#d32f2f',
    padding: 8,
    marginTop: 6,
    borderRadius: 4,
  },
  textoMotivoRechazo: {
    color: '#ff8a80',
    fontSize: 13,
  }
});