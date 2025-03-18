# Foccuz API

Esta es una API RESTful simple desarrollada en Node.js para la prueba Foccuz. La API realiza una llamada asíncrona para obtener datos de una API externa y expone los siguientes endpoints:

- **GET /books:** Lista todos los libros.
- **GET /books/author?search=NOMBRE_DEL_AUTOR:** Devuelve una lista de libros escritos por el autor especificado.
- **GET /books/:isbn:** Devuelve el libro que corresponde al ISBN proporcionado.

## Requisitos

- Node.js (v14 o superior)
- npm

## Instrucciones de Instalación

1. Clonar el repositorio o extraer el ZIP.
2. Navegar al directorio del proyecto.
3. Instalar las dependencias:
   ```bash
   npm install
4. Compilar el proyecto
    ```bash
    npm run build
5. Iniciar el servidor:
    ```bash
    npm start
6. Acceder a la api en http://localhost:3000
