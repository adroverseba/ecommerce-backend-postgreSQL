# E-commerce Backend con Node.js y base de datos PostgreSQL

Este es un proyecto desarrollado del lado del servidor con Node.js, logrando una persistencia de datos con PostgreSQL.
En el mismo se da solucion a diversos problemas del lado del backend como:

- Resolver problemas de **migraciones** con **Sequelize**, **Heroku** y **Node.js**
- Trabajo en **Postgres** con interfaces graficas, terminal y codigo Javascript
- Configuracion de entorno de desarrollo con **Docker**
- Manejo de **API REST** con Express.js
- Autenticacion y autorizacion de usuarios
- Integracion de **Passport.js** y **JSON Web Tokens** a Express.js
- **Proteccion** de rutas y control de roles
- **Envio de emails** con tokens para recupero de contraseñas

## Routes

#### 1. El router base _'/api/v1/products'_ implementa las siguientes funcionalidades:

- `GET: '/'` - permite listar todos los productos disponibles siendo posible realizar paginacion y filtrado por **query params** colocando valores para _limit y offset_, _price_, _price_min_ y _price_max_.
  - ejemplo de Request URL:
    ```console
    https://enigmatic-journey-93971.herokuapp.com/api/v1/products?limit=5&offset=0
    ```
- `GET: '/:id'` - Permite listar un producto por su id
- `POST: '/'` - Para incorporar productos al listado(se necesita primero tener creada una categoria de productos)
- `PATCH: '/:id'` - Para realizar un update con informacion parcial del producto
- `DELETE: '/:id'` - Borra un producto por su id

#### 2. El router base _'/api/v1/users'_:

- `GET: '/'` - Lista los ususarios
- `GET: '/:id'` - Muestra un usuario por su id
- `POST: '/'` - Genera el registro de un usuario, el valor por defecto de role es 'customer'
- `PATCH: '/:id'` - Para realizar un update con informacion del usuario. **No esta permitido** hacer la modificacion de password ni role por medio de este endpoint
- `DELETE: '/:id'` - Borrado de usuario. Tener en cuenta la relacion con la tabla _customers_

#### 3. El router base _'/api/v1/categories'_:

- `GET: '/'` - Lista las categorias
- `GET: '/:id'` - Muestra categoria filtrada por su numero de id, la categoria seleccionada tambien retornara la asociacion debida a los productos contenidos dentro de si misma.
- `POST: '/'` - Genera el registro de una categoria

#### 4. El router base _'/api/v1/customers'_:

- `GET: '/'` - Lista los customers, los valores retornados ademas cuentan con las asociaciones a la tabla users
- `POST: '/'` - Genera el registro de un customer junto con el , en el body de la request debe ser enviado tambien informacion del usuario

## Deploy en Heroku

🔗[e-commerce](https://enigmatic-journey-93971.herokuapp.com/)

## Estado

Frontend y doc. con Swagger en desarrollo... 👨🏻‍💻⏳🛠️🚧
