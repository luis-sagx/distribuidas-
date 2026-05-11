# Taller 02 - Calculadora Distribuida con Balanceo de Carga

## Descripción del Proyecto

Sistema cliente-servidor de calculadora que implementa **balanceo de carga básico** utilizando un servidor principal (Python) que delega operaciones a un servidor multihilo (Node.js/TypeScript) cuando detecta alta demanda.

### Arquitectura

```
        ┌─────────────┐
        │   Cliente   │
        │ (Py/TS)     │
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐     ┌──────────────────┐
        │  Servidor   │────▶│  Servidor Multi   │
        │  Principal  │     │  (Worker Threads)│
        │  (Python)   │     │  (Node.js)       │
        └─────────────┘     └──────────────────┘
              ▲
              │
        ┌─────┴─────┐
        │ Clientes  │
        │ Adicionales│
        └───────────┘
```

### Componentes

| Archivo | Lenguaje | Descripción |
|---------|----------|-------------|
| `server.py` | Python | Servidor principal con I/O no bloqueante (select) |
| `server-multi.ts` | TypeScript | Servidor multihilo usando Worker Threads |
| `client.py` | Python | Cliente de consola |
| `client.ts` | TypeScript | Cliente de consola |

### Puerto

- **Servidor principal**: `12345`
- **Servidor multihilo**: `12346`

---

## Requisitos

### Para Python
- Python 3.x (ya viene instalado en la mayoría de sistemas)

### Para TypeScript/Node.js
- Node.js
- TypeScript (incluido en `node_modules`)

---

## Cómo Ejecutar

### 1. Compilar TypeScript

```bash
npm install   # Instalar dependencias (ya hecho)
npm run build  # Compilar archivos .ts a .js
```

### 2. Iniciar los Servidores

**Terminal 1 - Servidor Multihilo (Node.js):**
```bash
npm run start:multi
```

**Terminal 2 - Servidor Principal (Python):**
```bash
python server.py
```

### 3. Ejecutar Clientes

**Cliente Python:**
```bash
python client.py
```

**Cliente TypeScript:**
```bash
npm run start:client
```

---

## Uso

El cliente solicita una operación matemática en formato:
```
<operador> <numero1> <numero2>
```

### Operadores Soportados
- `+` : Suma
- `-` : Resta
- `*` : Multiplicación
- `/` : División

### Ejemplos

```
Ingrese la operación (por ejemplo: + 5 3): + 10 5
Resultado: 15

Ingrese la operación (por ejemplo: + 5 3): * 3 4
Resultado: 12

Ingrese la operación (por ejemplo: + 5 3): / 20 4
Resultado: 5
```

---

## Comportamiento del Balanceo de Carga

1. El servidor principal procesa todas las solicitudes inicialmente.
2. Cuando hay **más de un cliente en cola**, activa el flag `offload_next_client`.
3. El siguiente cliente se delega al servidor multihilo en el puerto `12346`.
4. El servidor multihilo procesa la operación usando **Worker Threads** (ejecución paralela real).

---

## Formato de Error

El servidor responde con mensajes de error cuando:
- El formato de entrada es incorrecto (debe ser: `operador num1 num2`)
- Los números no son válidos
- Se intenta dividir por cero

```
Error: Invalid input format
Error: Invalid number format
Error: Division by zero
```

---

## Notas

- El servidor principal usa `select()` para I/O no bloqueante
- El servidor multihilo usa Worker Threads de Node.js para procesamiento paralelo real
- Los clientes pueden iniciarse en cualquier orden después de que el servidor esté corriendo