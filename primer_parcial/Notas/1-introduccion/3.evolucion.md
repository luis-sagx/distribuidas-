# Evolución de los Sistemas Informáticos

---

## Conceptos Base

### Sistema Centralizado

- Todos los componentes están en un **lugar fijo** (un solo lugar)
- Un servidor principal maneja todo
- Ejemplo: mainframe con terminales tontas

### Sistema Distribuido

- Componentes ubicados en **varios nodos** (varias máquinas)
- El usuario ve **una sola aplicación** (como si fuera local)
- Ejemplo: Google Docs, Netflix

---

## Línea de Tiempo por Décadas

### Década 1960-1970: Orígenes

| Año      | Acontecimiento                                                                      |
| -------- | ----------------------------------------------------------------------------------- |
| **1961** | CTSS (MIT) — primer sistema operativo multiusuario y multitarea                     |
| **1969** | Unix (AT&T Bell Labs)                                                               |
| **1969** | **ARPANET** — precursor de Internet, punto de partida de la computación distribuida |
| **1972** | Nace el correo electrónico                                                          |

---

### Década 1980: Redes Locales y Cliente-Servidor

| Año      | Acontecimiento                                                                    |
| -------- | --------------------------------------------------------------------------------- |
| **1980** | LAN (Ethernet) — surgimiento de redes locales                                     |
| **1980** | Modelo **cliente-servidor** se establece como estándar                            |
| **1982** | Conferencia **PODC** (Principles of Distributed Computing) — fundamentos teóricos |
| **1985** | Proyecto **ANSA** (DARPA) — investigación en sistemas distribuidos                |
| **1989** | Nace el **OMG** (Object Management Group) — luego desarrolla CORBA                |

> **Concepto clave**: Cliente-Servidor = varias máquinas conectadas, donde el cliente pide servicios al servidor

---

### Década 1990: Objetos Distribuidos y Middleware

| Año      | Acontecimiento                                                                                      |
| -------- | --------------------------------------------------------------------------------------------------- |
| **1990** | Primera especificación de **CORBA** (Common Object Request Broker Architecture)                     |
| **1992** | Implementaciones comerciales de CORBA                                                               |
| **1993** | **CGI** (Common Gateway Interface) — permite crear páginas web dinámicas                            |
| **1995** | **Java RMI** (Remote Method Invocation) — invocar métodos entre objetos Java en diferentes máquinas |
| **1999** | Cliente-servidor se vuelve común en empresas                                                        |

> **Middleware**: Software intermedio que permite la comunicación entre aplicaciones distribuidas

---

### Década 2000: Web Services y SOA

| Año           | Acontecimiento                                                                         |
| ------------- | -------------------------------------------------------------------------------------- |
| **2000**      | **REST** (Roy Fielding) — arquitectura de servicios web moderna                        |
| **2000**      | **Web Services** — usando HTTP, XML, SOAP                                              |
| **2001-2003** | **SOAP** (Simple Object Access Protocol) — protocolo para servicios web XML            |
| **2005**      | **SOA** (Service-Oriented Architecture) — diseño de sistemas flexibles y reutilizables |
| **2007-2008** | Primeras plataformas de **Cloud Computing** (Google App Engine)                        |

> **SOA**: Enfoque de diseño basado en servicios independientes que se comunican entre sí

---

### Década 2010: Cloud, Microservicios y Contenedores

| Año      | Acontecimiento                                                          |
| -------- | ----------------------------------------------------------------------- |
| **2013** | **Docker** — revolución en empaquetado de aplicaciones con contenedores |
| **2014** | **AWS Lambda** — computación **serverless** (sin gestionar servidores)  |
| **2015** | **Kubernetes** — orquestación de contenedores para escalar aplicaciones |
| **2016** | Google Cloud Functions y Azure Functions — funciones serverless         |
| **2017** | **Microservicios** — arquitectura dominante para sistemas distribuidos  |

> **Contenedor**: Paquete que incluye la aplicación y todo lo que necesita para ejecutarse
>
> **Microservicios**: Dividir una aplicación en servicios pequeños e independientes
>
> **Serverless**: El proveedor gestiona la infraestructura, tú solo escribes código

---

### Década 2020: Cloud-Native y Automatización

| Año           | Acontecimiento                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| **2020**      | **Cloud-Native** — apps diseñadas para la nube (microservicios + contenedores + Kubernetes + DevOps) |
| **2021-2025** | **Event-Driven Architecture** — sistemas que reaccionan a eventos                                    |
| **2021-2025** | **Service Mesh** — gestión de comunicación entre servicios                                           |
| **2021-2025** | **GitOps + CI/CD** — automatización total del ciclo de vida                                          |

> **Event-Driven**: Los componentes reaccionan a eventos (mensajes) en lugar de llamadas directas
>
> **Service Mesh**: Capa de infraestructura que maneja comunicación entre servicios (balanceo, seguridad, monitoreo)
>
> **GitOps**: Gestionar infraestructura y aplicaciones usando Git como fuente de verdad

---

## Resumen Visual

```
1960s ──► 1980s ──► 1990s ──► 2000s ──► 2010s ──► 2020s
  │        │        │        │        │        │
Mainframe LAN/     CORBA/   REST/    Docker/  Cloud-
 (mono)  Client-   Middle-  SOAP/    K8s/     Native
         Server    ware     SOA      Server-  Event-
                                     less     Driven
```

---

## Glosario Rápido (para estudiar)

| Término                  | Definición corta                                  |
| ------------------------ | ------------------------------------------------- |
| **Sistema Centralizado** | Todo en un solo lugar/servidor                    |
| **Sistema Distribuido**  | Componentes en varios nodos, parece uno solo      |
| **Cliente-Servidor**     | Modelo donde clientes piden servicios al servidor |
| **Middleware**           | Software intermedio que conecta aplicaciones      |
| **CORBA**                | Estándar para objetos distribuidos (1990)         |
| **REST**                 | Arquitectura para servicios web (2000)            |
| **SOAP**                 | Protocolo para servicios web XML                  |
| **SOA**                  | Arquitectura orientada a servicios                |
| **Contenedor**           | Paquete portable de aplicación                    |
| **Microservicios**       | App dividida en servicios pequeños                |
| **Serverless**           | Computación sin gestionar servidores              |
| **Cloud-Native**         | Diseñado para correr en la nube                   |
| **Event-Driven**         | Reacciona a eventos, no a llamadas directas       |
| **Service Mesh**         | Capa de infraestructura para comunicar servicios  |
| **GitOps**               | Automatización con Git                            |

---

## Preguntas de Examen (típicas)

1. ¿Cuál fue el precursor de Internet y en qué año apareció?
2. ¿Qué es el modelo cliente-servidor?
3. ¿Qué solved CORBA? ¿En qué década apareció?
4. ¿Qué aportan los microservicios frente a una arquitectura monolítica?
5. Explica la diferencia entre IaaS, PaaS y SaaS (relacionado con cloud)
6. ¿Qué es serverless y qué ventaja ofrece?
7. ¿Qué es Kubernetes y para qué sirve?
8. ¿En qué consiste la arquitectura event-driven?
