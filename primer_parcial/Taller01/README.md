# Taller 01 - Calculadora Cliente-Servidor

## Descripción

Pequeño proyecto de sistemas distribuidos que implementa una calculadora básica usando sockets TCP. El servidor realiza operaciones matemáticas y los clientes se conectan para enviar cálculos.

### Arquitectura

```
┌──────────┐          Socket TCP          ┌──────────┐
│  Cliente │ ──────────────────────────────│ Servidor │
└──────────┘    localhost:12345           └──────────┘
                                                │
                                          ┌─────┴─────┐
                                          │ calculator│
                                          │  + - * /  │
                                          └───────────┘
```

### Archivos

- `server.py` - Servidor TCP en Python que escucha en puerto 12345
- `client.py` - Cliente en Python
- `client.ts` - Cliente en TypeScript/Node.js

---

## Cómo levantar el proyecto

### 1. Levantar el servidor (Python)

```bash
python3 server.py
```

El servidor escuchará en `localhost:12345`. Podés ejecutarlo desde cualquier terminal.

### 2. Ejecutar cliente Python

En otra terminal, después de levantar el servidor:

```bash
python3 client.py
```

El cliente te pedirá ingresar una operación en formato: `operador numero1 numero2`

Ejemplos:
- `+ 5 3` → Resultado: 8
- `- 10 4` → Resultado: 6
- `* 2 6` → Resultado: 12
- `/ 15 3` → Resultado: 5

### 3. Ejecutar cliente TypeScript/Node.js

Primero instalá las dependencias (solo si vas a usar el cliente TS):

```bash
npm install
```

Compilá el archivo TypeScript:

```bash
npx tsc client.ts
```

Ejecutalo:

```bash
node client.js
```

Igual que el cliente Python, te pide el formato: `operador numero1 numero2`

---

## Formato de comunicación

El cliente envía al servidor:
```
operador num1 num2
```

Ejemplos válidos: `+ 5 3`, `- 10 4`, `* 2 6`, `/ 15 3`

El servidor responde con el resultado o mensaje de error.

---

## Detener el servidor

Ctrl+C para detener el servidor. El cliente puede cerrarse con Ctrl+C o simplemente cerrar la terminal.

---

## Requisitos

- Python 3.x
- Node.js y npm (solo para cliente TypeScript)
- TypeScript instalado globalmente o vía npx (`npx tsc`)