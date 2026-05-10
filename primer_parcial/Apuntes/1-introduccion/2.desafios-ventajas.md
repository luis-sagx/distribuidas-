# Ventajas y Desafíos de Aplicaciones Distribuidas

---

## Ventajas

### 1. Escalabilidad Horizontal

| Aspecto                     | Descripción                                     |
| --------------------------- | ----------------------------------------------- |
| **Qué es**                  | Agregar más nodos para manejar mayor carga      |
| **Sin afectar rendimiento** | El sistema crece sin degradarse                 |
| **Entornos cloud**          | Trafico variable (ej: e-commerce en temporales) |

> **Ejemplo**: Tienda online en Black Friday = agregar más servidores

---

### 2. Alta Disponibilidad y Tolerancia a Fallos

| Aspecto           | Descripción                                      |
| ----------------- | ------------------------------------------------ |
| **Qué es**        | El sistema sigue funcionando aunque fallen nodos |
| **Cómo se logra** | Redundancia + patrones como _Circuit Breaker_    |
| **Resultado**     | Si un servidor se cae, otro toma su lugar        |

> **Patrón Circuit Breaker**: Si un servicio falla, "abre el circuito" para no saturar y permitir recuperación

---

### 3. Mejor Rendimiento (Procesamiento Paralelo)

| Aspecto       | Descripción                        |
| ------------- | ---------------------------------- |
| **Qué es**    | Dividir tareas entre varios nodos  |
| **Resultado** | Menor tiempo de respuesta          |
| **Ejemplos**  | Big Data con Spark, IA distribuida |

---

### 4. Compartición Eficiente de Recursos

| Aspecto          | Descripción                                      |
| ---------------- | ------------------------------------------------ |
| **Qué es**       | Compartir hardware costoso entre varios usuarios |
| **Optimización** | GPU, almacenamiento, etc.                        |
| **Beneficio**    | Reduce costos                                    |

---

### 5. Flexibilidad Tecnológica

| Aspecto       | Descripción                              |
| ------------- | ---------------------------------------- |
| **Qué es**    | Cada microservicio usa la tecnología适合 |
| **Beneficio** | Innovación y adaptación rápida           |
| **Resultado** | No tied a una sola tecnología            |

---

## Desventajas

### 1. Mayor Complejidad de Desarrollo y Mantenimiento

| Problema              | Por qué                          |
| --------------------- | -------------------------------- |
| Múltiples servicios   | Coordinae Comunicación asíncrona |
| Fallos distribuídos   | Depurar es más difícil           |
| Versiones compatibles | Gestión de cambios               |

> **Solución**: Herramientas avanzadas + habilidades especializadas

---

### 2. Costos Operativos Más Altos

| Componente | Costo adicional              |
| ---------- | ---------------------------- |
| Red        | Más tráfico entre nodos      |
| Monitoreo  | Herramientas de trazabilidad |
| Seguridad  | Medidas robustas             |
| Personal   | Especializado                |

---

### 3. Sobrecarga de Red y Procesamiento

| Problema                 | Impacto                |
| ------------------------ | ---------------------- |
| Comunicación entre nodos | Consume ancho de banda |
| Serialización, cifrado   | Agrega latencia        |
| Si no se diseña bien     | Rendimiento baja       |

> **Clave**: Diseñar cuidadosamente los protocolos

---

### 4. Superficie de Ataque Ampliada

| Problema                           | Implicación                  |
| ---------------------------------- | ---------------------------- |
| Más nodos = más puntos vulnerables | Cada servicio es un objetivo |
| Necesita                           | Defensa en profundidad       |
| Monitoreo constante                | Detectar ataques rápido      |

---

### 5. Dificultad con Coherencia Fuerte

| Problema                             | Por qué                                          |
| ------------------------------------ | ------------------------------------------------ |
| Sincronizar datos en tiempo real     | Costoso y a veces inviable                       |
| Mayoría opta por coherencia eventual | Puede no funcionar para todas las apps           |
| **No sirve para**                    | Sistemas financieros que necesitan datos exactos |

> **Coherencia eventual**: Los datos se sync eventually, pero no inmediatamente

---

## Desafíos Técnicos

### 1. Gestión de Latencia de Red

| Desafío                  | Impacto                            |
| ------------------------ | ---------------------------------- |
| Comunicación entre nodos | Retrasos impredecibles             |
| Aplicaciones tiempo real | Experiencia de usuario afectada    |
| Solución                 | Cacheo, optimización de protocolos |

---

### 2. Observabilidad y Monitoreo Integral

| Desafío              | Por qué                                         |
| -------------------- | ----------------------------------------------- |
| Rastrear transacción | Atraviesa múltiples servicios                   |
| Detectar problemas   | Difícil de identificar raíz                     |
| **Herramientas**     | Trazabilidad, logging, métricas (OpenTelemetry) |

> **Trazabilidad distribuida**: Seguir una petición a través de todos los servicios

---

### 3. Coordinación de Transacciones Distribuidas

| Problema                     | Solución                                                      |
| ---------------------------- | ------------------------------------------------------------- |
| ACID en distribuídos         | Difícil por latencia y fallos                                 |
| **2PC (Two-Phase Commit)**   | Protocolo de compromiso en dos fases                          |
| **3PC (Three-Phase Commit)** | Más seguro pero complejo                                      |
| **SAGA**                     | Alternativa sin bloquear recursos, usa lógica de compensación |

> **Transacciones SAGA**: Dividir en pasos, si uno falla, se ejecutan "compensaciones" (acciones inversas)

---

### 4. Gestión de la Heterogeneidad

| Desafío                                                 | Solución                 |
| ------------------------------------------------------- | ------------------------ |
| Dispositivos, protocolos, lenguajes distintos           | Estándares abiertos      |
| Integración compleja                                    | Middleware y adaptadores |
| **Ejemplo IoT**: LoRa para comunicación de bajo consumo | Seguridad robusta        |

> **Estándares abiertos**: Garantizan interoperabilidad

---

### 5. Actualización y Despliegue Continuo

| Desafío                    | Solución                               |
| -------------------------- | -------------------------------------- |
| Hundreds de microservicios | Sin interrumpir servicio               |
| **Canary Release**         | Probar conmall % de usuarios           |
| **Blue-Green Deployment**  | Dos ambientes, switch instantáneo      |
| **Feature Flags**          | Encender/apagar features sin desplegar |
| **Requiere**               | CI/CD robusto y automatizado           |

---

## Resumen: Trade-offs Clave

| Ventaja                  | Desventaja relacionada |
| ------------------------ | ---------------------- |
| Escalabilidad            | Complejidad de gestión |
| Disponibilidad           | Costos operativos      |
| Rendamiento paralelo     | Sobrecarga de red      |
| Flexibilidad tecnológica | Heterogeneidad         |
| Recursos compartidos     | Superficie de ataque   |

---

## Glosario Rápido

| Término                      | Definición                                         |
| ---------------------------- | -------------------------------------------------- |
| **Escalabilidad Horizontal** | Agregar más nodos al sistema                       |
| **Tolerancia a Fallos**      | Sistema sigue si un nodo falla                     |
| **Circuit Breaker**          | Patrón que evita saturación al detectar fallos     |
| **Coherencia Final**         | Datos se sync eventualmente, no inmediato          |
| **Coherencia Fuerte**        | Todos los datos siempre sync                       |
| **2PC/3PC**                  | Protocolos para transacciones distribuidas         |
| **SAGA**                     | Transacciones como serie de pasos con compensación |
| **Canary Release**           | Desplegar amall % primero                          |
| **Blue-Green**               | Dos ambientes, switch instantáneo                  |
| **Feature Flags**            | Activar/desactivar features sin código             |
| **Observabilidad**           | Capacidad de ver el interior del sistema           |
| **OpenTelemetry**            | Estándar para métricas y trazabilidad              |

---

## Preguntas de Examen

1. ¿Qué es la escalabilidad horizontal y por qué es clave en cloud?
2. ¿Cómo logra un sistema distribuidos la alta disponibilidad? Explica el patrón Circuit Breaker.
3. ¿Por qué es difícil mantener coherencia fuerte en sistemas distribuídos?
4. Explica la diferencia entre coherencia eventual vs coherencia fuerte.
5. ¿Qué son las transacciones SAGA y cuándo se usan?
6. ¿Qué es 2PC y qué problema solve?
7. ¿Por qué la superficie de ataque es mayor en sistemas distribuídos?
8. ¿Qué herramientas se usan para observabilidad en sistemas distribuídos?
9. Explica qué es un Canary Release y para qué sirve.
10. ¿Cuál es el trade-off entre rendimiento y sobrecarga de red?
