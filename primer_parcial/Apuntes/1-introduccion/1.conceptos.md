# Aplicaciones Distribuidas - Conceptos Fundamentales

---

## 1. Programa

Un **programa** es la unidad más básica de software. Es un conjunto de instrucciones que la computadora ejecuta para realizar una tarea específica.

| Aspecto        | Descripción                       |
| -------------- | --------------------------------- |
| **Naturaleza** | Archivo ejecutable o script       |
| **Interfaz**   | No requiere interfaz gráfica      |
| **Alcance**    | Una tarea específica y focalizada |

### Ejemplos

- Script en Python que renombra archivos automáticamente
- El comando `ls` en Linux
- Una calculadora en la terminal

---

## 2. Aplicación

Una **aplicación** (software de aplicación) es un programa diseñado específicamente para que el usuario final interactúe y realice tareas útiles.

| Aspecto        | Descripción                                           |
| -------------- | ----------------------------------------------------- |
| **Naturaleza** | Enfocada en utilidad, productividad o entretenimiento |
| **Requisito**  | Siempre corre sobre un sistema operativo              |
| **Interfaz**   | Tiene interfaz para el usuario                        |

### Ejemplos

- **Productividad**: Microsoft Word, Excel
- **Comunicación**: WhatsApp, Telegram
- **Entretenimiento**: Spotify, Netflix
- **Diseño**: Photoshop, Figma

---

## 3. Sistema

Un **sistema** (sistema informáticos) es el concepto más amplio. Es una colección de componentes interconectados que trabajan juntos para lograr un objetivo complejo.

| Aspecto         | Descripción                                       |
| --------------- | ------------------------------------------------- |
| **Naturaleza**  | Infraestructura completa                          |
| **Alcance**     | Puede contener múltiples programas y aplicaciones |
| **Componentes** | Hardware, software, redes y personas              |

### Componentes típicos

- **Hardware**: servidores, dispositivos
- **Software**: aplicaciones, bases de datos
- **Redes**: conexión entre componentes
- **Personas**: operadores, administradores

### Ejemplo: Sistema de Gestión Hospitalaria

```
┌─────────────────────────────────────────────────────┐
│              Sistema de Gestión Hospitalaria        │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │ App Médico  │  │ App Paciente│  │App Recepcion│  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │
│         │                │                │         │
│         └────────────────┼────────────────┘         │
│                          ▼                          │
│              ┌─────────────────────┐                │
│              │   Base de Datos     │                │
│              │   (Pacientes,       │                │
│              │    Turnos, Hist.)   │                │
│              └─────────────────────┘                │
│                          │                          │
│                          ▼                          │
│              ┌─────────────────────┐                │
│              │  Servidores / Red   │                │
│              └─────────────────────┘                │
└─────────────────────────────────────────────────────┘
```

---

## Resumen Comparativo

| Concepto       | Alcance                          | Ejemplo                         |
| -------------- | -------------------------------- | ------------------------------- |
| **Programa**   | Una tarea específica             | Script que renombra archivos    |
| **Aplicación** | Utilidad para el usuario         | WhatsApp, Spotify               |
| **Sistema**    | Múltiples componentes integrados | Sistema de gestión hospitalaria |

---

> **Diferencia clave**: Una aplicación HACE algo para el usuario. Un sistema INTEGRA múltiples partes para lograr un objetivo complejo.
