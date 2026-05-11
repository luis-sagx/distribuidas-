# Aplicaciones Distribuidas

Repositorio de la materia de Aplicaciones Distribuidas en la Univerisidad de las Fuerzas Armadas ESPE. Contiene laboratorios, talleres y actividades.

## Estructura

```
primer_parcial/
├── Taller01/      # Calculadora con sockets TCP
├── Taller02/      # Servidor con select() y balanceo de carga
├── laboratorio2/  # Chat en tiempo real con WebSockets
├── websockets/     # Ejemplo básico de WebSockets
├── Laboratorio1/  # Introducción a sockets
├── Apuntes/       # Apuntes teóricos
└── material/      # Material del profesor
```

## Trabajos

### Taller01 - Calculadora TCP
Servidor de calculadora usando sockets TCP puros. Envía operación (ej: `+ 5 3`) y retorna el resultado.

**Ejecutar:**
```bash
cd primer_parcial/Taller01
python server.py        # Terminal 1 (servidor)
python client.py        # Terminal 2 (cliente)
node client.ts           # Terminal 3 (cliente Node.js)
```

### Taller02 - Servidor con Balanceo de Carga
Servidor que usa `select()` para manejar múltiples conexiones y delega a un servidor multihilo cuando detecta carga alta.

**Ejecutar:**
```bash
cd primer_parcial/Taller02
python server.py        # Terminal 1 (servidor principal)
python server-multi.py  # Terminal 2 (servidor multihilo)
python client.py        # Terminal 3 (cliente)
node client.ts           # Terminal 4 (cliente Node.js)
```

### Laboratorio1 - Biblioteca

API REST para gestión de una biblioteca con autores y libros, usando Express.js y MySQL 8.0.

#### Instalar dependencias
```bash
npm install
```

#### Iniciar la API

**Desarrollo** (con hot reload):
```bash
npm run dev
```

**Producción**:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

### Laboratorio2 - Chat con WebSockets
Chat en tiempo real con Flask-SocketIO. Múltiples usuarios pueden conectar, setear username y chatear en vivo.

**Ejecutar:**
```bash
cd primer_parcial/laboratorio2/ChatTempralMessages
python server.py
# Abrir http://localhost:5000 en el navegador
```

### WebSockets - Ejemplo Básico
Pequeña aplicación demostrativa de WebSockets con Flask-SocketIO.

**Ejecutar:**
```bash
cd primer_parcial/websockets
source venv/bin/activate
python app.py
# Abrir http://localhost:5000
```

---

## WebSockets

Protocolo de comunicación bidireccional que permite comunicación en tiempo real sobre una conexión TCP persistente (a diferencia de HTTP que es request-response).

**Casos de uso:** chat en tiempo real, notificaciones en vivo, dashboards, juegos multiplayer, colaboración en tiempo real.

El curso usa **Flask-SocketIO** para implementar WebSockets en Python.