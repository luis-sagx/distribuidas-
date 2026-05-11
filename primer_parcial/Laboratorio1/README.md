# Biblioteca Distribuida

API REST para gestión de una biblioteca con autores y libros, usando Express.js y MySQL 8.0.

## Stack

- **Backend**: Express.js (Node.js)
- **Base de datos**: MySQL 8.0
- **ORM**: mysql2 con stored procedures
- **Contenedores**: Docker + Docker Compose

## Requisitos

- Node.js 18+
- Docker y Docker Compose

## Setup

### 1. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=biblioteca-distribuida
DB_USER=app_user
DB_PASSWORD=tu_password
DB_ROOT_PASSWORD=root_password
```

### 2. Levantar la base de datos

```bash
docker-compose up -d
```

Esto inicia MySQL 8.0 y ejecuta automáticamente el script `src/script/init.sql` que crea:
- Tablas `author` y `book`
- Stored procedures para operaciones CRUD
- Permisos para `app_user`

### 3. Instalar dependencias

```bash
npm install
```

### 4. Iniciar la API

**Desarrollo** (con hot reload):
```bash
npm run dev
```

**Producción**:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints

### Autores

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/authors` | Listar todos los autores |
| GET | `/api/authors?search=texto` | Buscar autores por nombre |
| POST | `/api/authors` | Crear autor |
| PUT | `/api/authors/:id` | Actualizar autor |
| DELETE | `/api/authors/:id` | Eliminar autor |

**Body para crear/actualizar autor:**
```json
{
  "firstName": "Gabriel",
  "lastName": "Garcia Marquez",
  "birthDate": "1927-03-06",
  "nationality": "Colombian",
  "email": "gabo@correo.com"
}
```

### Libros

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/books` | Listar todos los libros |
| POST | `/api/books` | Crear libro |
| PUT | `/api/books/:id` | Actualizar libro |
| DELETE | `/api/books/:id` | Eliminar libro |

**Body para crear/actualizar libro:**
```json
{
  "title": "Cien Anos de Soledad",
  "isbn": "978-0062884147",
  "publicationYear": 1967,
  "edition": "1st Edition",
  "language": "Spanish",
  "authorId": 1
}
```

## Estructura del proyecto

```
Laboratorio1/
├── src/
│   ├── app.js              # Entry point de Express
│   ├── config/
│   │   └── db.js           # Configuración del pool MySQL
│   ├── controller/
│   │   ├── authorController.js
│   │   └── bookController.js
│   ├── models/
│   │   ├── Author.js
│   │   └── Book.js
│   ├── routes/
│   │   └── app.js          # Definición de rutas
│   └── script/
│       └── init.sql        # Schema y stored procedures
├── docker-compose.yml
├── package.json
└── .env
```

## Comandos útiles

```bash
# Ver logs de MySQL
docker logs mysql_biblioteca_distribuidas

# Conectarse a MySQL
docker exec -it mysql_biblioteca_distribuidas mysql -u app_user -p biblioteca-distribuida

# Reiniciar la base de datos (borra datos)
docker-compose down -v && docker-compose up -d

# Detener todo
docker-compose down
```

## Notas

- Los libros tienen FK hacia autores (`authorId`)
- Los endpoints devuelven JSON con estructura `{ success, data }` o `{ success, message }`
- Los errores devuelven status 500 con `{ success: false, message }`
- La búsqueda de autores es case-insensitive y busca por nombre o apellido
