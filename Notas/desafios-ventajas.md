# principales ventajas y desafios de aplicaciones distribuidas

## Ventajas

### escalabilidad horizontal:

- Permite agregar más nodos para manejar mayor carga sin afectar el rendimiento.
- es clave en entornos cloud y aplicaciones con trafico variable
- ejem: e-commerce en temporada alta

### alta disponibilidad y tolerancia a fallos:

- al distribuir la carga y replicar servicios en multiples nodos, el sistema puede seguir funcionando incluso si algunos nodos fallan aunque uno o varios componentes fallen
- se logra mediante redundancia y patrones como el "disyuntor" (circuit breaker)

### mejor rendimiento mediante procesamiento paralelo:

- las tareas se pueden dividir entre varios nodos, lo que reduce el tiempo de respuesta
- ejm: analisis de big bata con Spark, IA distribuida

### comparticion eficionete de recursos:

- permite el uso compartido de hadware costoso (almacenamiento, GPU) entre varios usuarios o aplicaciones, lo que optimiza costos y acceso

### flexibilidad tecnologica:

- cada componente (microservicio, nodo) puede usar la tecnologia mas adecuada para su funcion, lo que facilita la innovacion y adaptacion a nuevas necesidades

## Desventajas

### mayor complejidad de desarrollo y mantenimiento:

- coordenar multiples servicios, gestionar la comunicacion asincrona, depurar fallos distribuidos y manejar versiones compatibles requiere herramientas y habilidades avanzadas

### costos operativos mas altos:

- aunque el hardware puede ser mas barato, los costos de red, monitoreo, seguridad y personal especializado pueden aumentar significativamente

### sobrecarga de red y procesamiento:

- la comunicacion constante entre nodos consume ancho de banda, CPU y memoria, lo que puede afectar el rendimiento si no se diseña cuidadosamente
- protocolos, serializacion, autenticacion y cifrado pueden agregar latencia y consumo innecesario si no se optimizan

### superficie de ataque ampliada:

- cada nodo y servicio adicional es un punto potencial de vulnerabilidad, lo que requiere medidas de seguridad robustas y actualizadas para proteger el sistema contra ataques
  -necesita defensa en profundidad, monitoreo constante y respuesta rápida a incidentes

### dificultad para garantizar la coherencia fuerte:

- masntener todos los datos sincronizados en tiempo real entre nodos es costoso y a menudo inviable
- muchos sistemas distribuidos optan por la coherencia eventual, lo que puede no ser adecuado para todas las aplicaciones (ejm: sistemas financieros)

## Desafios

### Gestion de la latencia de red

- la comunicacoin entre nodos introduce retrasos empredecibles.
- afecta la experiencia del usuario y el rendimiento general, especialmente en aplicaciones en tiempo real

### Observabilidad y monitoreo integral:

- es dificil rastrear una transaccion que atraviesa multiples servicios y nodos, lo que complica la deteccion y solucion de problemas
- requiere herramientas avanzadas de trazabilidad, logging, metricas y trazabilidad distribuida (como OpenTelemetry) para diagnosticar problemas.
