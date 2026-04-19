# GavelandGold

Sistema de Subastas Online - TPO DAI 2026

## Descripción del proyecto

Gavel-Gold es una solución integral para llevar el negocio de subastas presenciales al entorno digital. El sistema contempla una aplicación orientada a postores y vendedores, junto con un backend encargado de validar usuarios, administrar subastas, gestionar medios de pago y registrar pujas en tiempo real.

La propuesta se integra con una infraestructura local preexistente que conserva información histórica de rematadores, postores y ofertas, por lo que el diseño prioriza la interoperabilidad y la consistencia de los datos.

## Funcionalidades principales

### Para postores

- Registro en dos etapas: carga inicial de datos personales y validación posterior por parte de la empresa.
- Clasificación por categorías: Común, Especial, Plata, Oro y Platino.
- Gestión de medios de pago: cuentas bancarias, tarjetas de crédito y cheques certificados como garantía.
- Participación en tiempo real: visualización de subastas y realización de pujas con límites de incremento.
- Métricas personales: historial de participaciones, subastas ganadas e importes ofertados.

### Para vendedores

- Postulación de artículos: carga de bienes con descripción, fotos y declaración de origen lícito.
- Seguimiento logístico: consulta de ubicación en depósito y póliza de seguro contratada.
- Gestión de aceptación: notificación del valor base y de las comisiones asignadas tras la inspección física.

## Especificaciones técnicas

### Reglas de negocio críticas

- Validación de pujas: el monto debe ser al menos el valor actual más el 1% del valor base, y no superar el valor actual más el 20% del valor base, salvo para las categorías Oro y Platino.
- Garantías: las compras no pueden superar el monto dejado como garantía.
- Concurrencia: un usuario no puede estar conectado a más de una subasta al mismo tiempo.
- Moneda: cada subasta es monomética y se define en ARS o USD al momento de su creación.

## API

La documentación de la API se encuentra en [swagger.yaml](swagger.yaml). Entre los endpoints principales se incluyen:

- `POST /usuarios/registro-inicial` para el registro inicial.
- `POST /usuarios/{id}/verificar` para validar usuarios y asignar categoría.
- `POST /usuarios/activar` para activar una cuenta mediante token.
- `POST /auth/login` para autenticación.
- `GET /subastas` para listar subastas disponibles.
- `POST /subastas/{id}/participar` para validar acceso a una subasta.
- `POST /subastas/{id}/pujar` para registrar una oferta.

## Modelo de funcionamiento

1. El usuario completa el registro inicial.
2. La empresa revisa y verifica la información, asignando categoría si corresponde.
3. El usuario activa su cuenta y accede al sistema.
4. Se agregan y validan medios de pago.
5. El usuario participa en subastas habilitadas y realiza pujas dentro de las reglas permitidas.

## Maquetado de la app y plano de despliegue
El maquetado de la app y plano de despliegue de la misma se realizó y encuentra en [Figma](https://www.figma.com/design/hE5gqPQgfzyvRvSACKsC6m/App-de-Subastas?node-id=2402-3334&t=cZx4Tldvxzk2BkR3-1). Dentro del mismo se puede observar:
- Sus wireframes.
- La paleta de colores.
- El icono de la app.
- La pantalla splash de la app.
- Prototipo que muestra el flujo de la app entre sus distintos wireframes.

$$ Primer Entrega - Desarrollo de Pantallas utilziando la Herramienta Android Studio
El desarrollo frontend alojado en este repositorio corresponde a una serie de pantallas implementadas de forma complementaria. El objetivo principal de este código es poner en práctica el uso del entorno Android Studio, aplicando los conceptos de diseño de interfaces nativas (XML) y navegación móvil enseñados durante las clases teóricas y prácticas de la materia. [GavelandGold Pantallas](https://github.com/defrancisco/GavelandGold)

