# gestion de concurrencia

- conturrencia en aplicaciones distribuidos
- hilos de ejecucion en un mismo proceso

- concurrencia: capacidad de un sistema para ejecutar múltiples tareas al mismo tiempo, ya sea en paralelo o intercalando su ejecución.

- la concurrencia permite manejar multiples tareas simultáneamente, mejorando la eficiencia y la capacidad de respuesta de las aplicaciones.
- mejora el rendimiento al aprovechar los recursos disponibles, como múltiples núcleos de CPU o conexiones de red.
- introduce desafios unicos: latencia de red, fallos parciales y problemas en la consistencia de datos.

- la concurrencia distribuida crea una ilusion de que las tareas se ejecutan simultáneamente, aunque en realidad pueden estar intercalando su ejecución debido a la latencia de red y otros factores.

- las condiciones de carrera ocurren cuando dos o más tareas acceden a un recurso compartido al mismo tiempo y el resultado depende del orden de acceso. Esto puede llevar a resultados impredecibles y errores difíciles de reproducir.

- otros riesgos: deadlocks (bloqueos mutuos) que bloquean procesos mutualmente, y starvation (inanición) donde un proceso no obtiene acceso a los recursos necesarios para continuar su ejecución.

- en cassandra priorizan la consistencia con respecto a la desponibilidad
