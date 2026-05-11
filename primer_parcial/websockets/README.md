# Chat en Tiempo Real con WebSockets

Proyecto de chat en tiempo real implementado con Flask y Socket.IO. Permite que múltiples usuarios se conecten a una sala y envíen mensajes instantáneos sin necesidad de actualizar la página.

## Características

- **Tiempo real**: Mensajes instantáneos mediante WebSockets
- **Multi-usuario**: Varios usuarios conectados simultáneamente
- **Notificaciones**: Sistema de eventos cuando alguien entra o sale
- **Lista de usuarios**: Panel lateral que muestra los usuarios conectados
- **Interfaz moderna**: Diseño responsive con componentes web nativos

## Requisitos Previos

- Python 3.8+
- Node.js (para el cliente Socket.IO)

## Instalación

### 1. Clonar o entrar al directorio del proyecto

```bash
cd websockets
```

### 2. Crear entorno virtual (recomendado)

```bash
python -m venv venv
```

### 3. Activar el entorno virtual

**Linux/Mac:**
```bash
source venv/bin/activate
```

**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate
```

### 4. Instalar dependencias de Python

```bash
pip install flask flask-socketio flask-cors eventlet
```

### 5. Instalar dependencias de Node.js

```bash
npm install
```

## Ejecución

### Iniciar el servidor Flask

```bash
python app.py
```

El servidor arrancará en `http://localhost:5000`

### Acceder a la aplicación

Abre tu navegador en: `http://localhost:5000`

## Uso

1. **Pantalla de entrada**: Ingresa un nombre de usuario y presiona "Entrar"
2. **Sala de chat**: Serás redirigido a la sala donde puedes:
   - Ver la lista de usuarios conectados en el panel izquierdo
   - Enviar mensajes en el área de chat
   - Recibir mensajes de otros usuarios en tiempo real
3. **Notificaciones automáticas**: Verás mensajes del sistema cuando un usuario entre o salga

## Estructura del Proyecto

```
websockets/
├── app.py                 # Servidor Flask con Socket.IO
├── package.json           # Dependencias Node.js
├── client.js              # Cliente Socket.IO (opcional)
├── templates/
│   ├── join.html          # Página de entrada
│   └── chat.html          # Página del chat
└── static/
    ├── css/
    │   ├── base.css       # Estilos base
    │   ├── join.css      # Estilos página entrada
    │   └── chat.css      # Estilos página chat
    └── js/
        └── components.js # Componentes web (UI)
```

## Tecnologías

- **Backend**: Flask + Flask-SocketIO + eventlet
- **Frontend**: Vanilla JavaScript con Web Components
- **Comunicación**: Socket.IO (WebSocket + fallback polling)
- **Estilos**: CSS moderno con fuentes IBM Plex Sans