# E-commerce API 🛒

Esta API RESTful está diseñada para gestionar productos, carritos de compra y procesos de checkout en una tienda online. Con ella, podés:

+ Crear, listar, actualizar y eliminar productos.

+ Gestionar carritos de compra de usuarios.

+ Realizar procesos de checkout y cancelación de carritos.

## 🚀 Tecnologías utilizadas

+ **[Node.js](https://nodejs.org/es)**: Entorno de ejecución para JavaScript.
+ **[Express.js](https://expressjs.com/)**: Framework web para Node.js.
+ **[Sequelize](https://sequelize.org/)**: ORM para interactuar con bases de datos SQL.
+ **[PostgreSQL](https://www.postgresql.org/)**: Base de datos.
+ **[bcrypt](https://www.npmjs.com/package/bcrypt)**: Para el hasheo de contraseñas
+ **[JWT (Json Web Tokens)](https://www.npmjs.com/package/jsonwebtoken)**: Autenticación y autorización de usuarios.
+ **[express-validator](https://express-validator.github.io/docs)**: Validaciones en el cuerpo de las peticiones.
+ **[nodemon](https://www.npmjs.com/package/nodemon)**: Herramienta de desarrollo para actualizar el servidor a medida que se realizan los cambios
+ **[dotenv](https://www.npmjs.com/package/dotenv)**: Manejo de variables de entorno.
+ **[Postman](https://www.postman.com/downloads/)**: Herramienta para probar y documentar la API.


## 🛠 Instalación

1. Clona el repositorio

```bash
git clone https://github.com/AxelIbarrola/Ecommerce-api.git
```

2. Instala las dependencias

```bash
cd Ecommerce-api
npm install
```

3. Configura las variables de entorno en un archivo `.env`

```env
PORT=puerto_donde_correras_el_servidor

NAME_DB=nombre_base_de_datos
DB_PASSWORD=contraseña
USER_DB=user
HOST_DB=localhost
DIALECT_DB=postgres
PORT_DB=puerto_donde_corra_la_bbdd

JWT_ACCESS_SECRET=tu_secreto_para_accessTokens
JWT_REFRESH_SECRET=tu_secreto_para_refreshTokens
```

4. Conecta la base de datos

```bash
npm run conn
```

5. Sincroniza base de datos

```bash
npm run sync
```
6. Inicia la aplicación

```bash
npm run dev
```

7. Configuraciones en Postman

+ Scripts

```js
const jsonData = pm.response.json();
if (jsonData.accessToken) {
    pm.environment.set("authToken", jsonData.accessToken)
}
if (jsonData.refreshToken) {
    pm.environment.set("refreshToken", jsonData.refreshToken)
}
```

+ Headers

    key = Content Type | Value = application/json
    key = Authorization | Value = Bearer {{authToken}}

## 📚 Endpoints

### Usuarios

+ **POST /api/auth/register**: Registrarse | Ejemplo en Postman:

```json
{
    "email": "email@gmail.com",
    "password": "password",
    "role": "admin" // es opcional, por default es "user", el rol de admin te permite crear, eliminar y actualizar productos.
}
```
+ **POST /api/auth/login**: Login | Ejemplo en Postman:

```json
{
    "email": "email@gmail.com",
    "password": "password"
}
```

+ **POST /api/logout** : logout | Ejemplo en Postman:

```json
{
    "email": "email@gmail.com",
    "password": "password",
    "refreshToken": "{{refreshToken}}"
}
```

+ **POST /api/logout-all** : logout-all | Ejemplo en Postman:

```json
{
    "email": "email@gmail.com",
    "password": "password",
    "refreshToken": "{{refreshToken}}"
}
```

+ **POST /api/auth/resfresh-token**: Generar un nuevo token de acceso | Ejemplo en Postman:

```json
{
    "email": "email@gmail.com",
    "password": "password",
    "refreshToken": "{{refreshToken}}"
}
```
### Productos

+ **POST /api/products**: Crear producto (solo para admins) | Ejemplo en Postman:

```json
{
    "name": "remera",
    "description": "remera de algodón negra",
    "price": 3000,
    "stock": 40,
    "refreshToken": "{{refreshToken}}"
}
```

+ **DELETE /api/products/:Id**: Eliminar producto (solo para admins) | Ejemplo en Postman:

```json
{
    "refreshToken": "{{refreshToken}}"
}
```

+ **PUT /api/products/:Id**: Modifica producto (solo para admins) | Ejemplo en Postman:

```json

// Todas las propiedades son opcionales, se actualizarán solo las que se envíen
// sino se manda nada a través del body, el producto se mantendrá tal y como está.
{
    "name": "remera S", // opcional
    "description": "remera de algodón blanca", // opcional
    "price": 5000, // opcional
    "stock": 10, // opcional
    "refreshToken": "{{refreshToken}}"
}
```

+ **GET /api/products**: Mostrar todos los productos | Ejemplo en Postman:

```json
{
    "refreshToken": "{{refreshToken}}"
}
```

+ **GET /api/products/:id**: Buscar producto por id | Ejemplo en Postman:

```json
{
    "refreshToken": "{{refreshToken}}"
}
```

### Carrito

+ **POST /api/cart**: Crear carrito | Ejemplo en Postman:

```json
{
    "refreshToken": "{{refreshToken}}"
}
```
+ **POST /api/cart/items**: Agregar producto al carrito | Ejemplo en Postman:

```json
{
    "productId": 2,
    "quantity" 4, // se agregan 4 unidades del producto con id 2
    "refreshToken": "{{refreshToken}}"
}
```

+ **GET /api/cart**: Obtener carrito | Ejemplo en Postman:

```json
{
    "refreshToken": "{{refreshToken}}"
}
```

+ **DELETE /api/cart/items/:id**: Eliminar producto (todas las unidades) del carrito | Ejemplo en Postman:

```json
{
    "refreshToken": "{{refreshToken}}"
}
```
+ **PUT /api/cart/items/:id**: Restar unidades dadas de un producto dentro del carrito | Ejemplo en Postman:

```json
{
    "quantity": 3, // cantidad a restar, es opcional, por default es igual a 1.
    "refreshToken": "{{refreshToken}}"
}
```

+ **PATCH /api/cart/checkout**: Realizar checkout, el carrito pasara al status "completed" | Ejemplo en Postman:

```json
{
    "refreshToken": "{{refreshToken}}"
}
```
+ **PATCH /api/cart/cancel**: Cancelar carrito, el carrito pasara al status "canceled" | Ejemplo en Postman:

```json
{
    "refreshToken": "{{refreshToken}}"
}
```

## 🔐 Autenticación

La API utiliza JWT para la autenticación. Para acceder a los endpoints protegidos, recorda incluir el token en los encabezados de tus solicitudes:

```http
Authorization: Bearer <tu_token>
```

## 🛒 Estados del carrito

+ `pending`: carrito abierto, puede modificarse.
+ `completed`: se realizó el checkout.
+ `canceled`: el usuario canceló la compra.

## Estructura del proyecto 

```bash
├── src/
│   ├── config/            # Configuración de la base de datos
│   ├── controllers/       # Lógica de negocio
│   ├── middlewares/       # Funciones intermedias (autenticación, validaciones)
│   ├── models/            # Modelos de datos (productos, carritos, usuarios)
│   ├── routes/            # Definición de rutas
│   └── scripts            # Funciones específicas (sincronización con la base de datos y conexión con la base de datos)
│   └── utils              # Funciones reutilizables   (creación de token)
│   └── validators         # Validadores con express-
├── app.js                 # Configuración principal de la aplicación
├── .gitignore             # Archivos y carpetas a ignorar por Git
├── package.json           # Dependencias y scripts del proyecto
└── README.md              # Documentación del proyecto
```

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENCE) para más detalles.
