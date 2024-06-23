# Frontend Nodepop con React Avanzado

## Visión General

Este proyecto consiste en la mejora del desarrollo de una aplicación web similar a Wallapop que se realizó para el laboratorio del módulo 'Fundamentos de React' del bootcamp 'Desarrollo Web Full Stack' de 'KeepCoding Tech School'. Esta mejora es para el laboratorio del módulo 'React avanzado'.

El objetivo fue crear una plataforma donde los usuarios puedan iniciar y cerrar sesión, publicar anuncios de compra y venta de productos, así como consultar productos publicados por otros usuarios.

El objetivo de esta práctica es: integrar redux con la solución anterior y añadir tests unitarios para probar la funcionalidad de nuestra aplicación.

## Tecnologías Utilizadas

- **React**: El proyecto está construido utilizando la biblioteca React, que proporciona una forma moderna y eficiente de crear interfaces de usuario.
- **JSX**: JSX, una extensión de sintaxis para JavaScript, que se utiliza para definir los componentes de la interfaz de usuario de manera más intuitiva.
- **Vite**: Vite se emplea como la herramienta de construcción del proyecto.
- **Jest**: Jest es un framework de pruebas para JavaScript diseñado para garantizar la corrección del código. Proporciona un entorno de pruebas completo con funciones integradas como aserciones, mocks y pruebas de snapshots, facilitando la creación y ejecución de pruebas unitarias y de integración.

## Características

- **Autenticación de Usuarios**: Los usuarios pueden iniciar sesión y cerrar sesión de manera segura.
- **Gestión de Anuncios**: Los usuarios pueden crear sus anuncios.
- **Exploración de Anuncios**: Los usuarios pueden explorar los anuncios publicados por ellos y otros usuarios.
- **Funcionalidad de Búsqueda**: La aplicación incluye una función de búsqueda para filtrar anuncios según criterios específicos.

## Backend de Soporte

Para simular un backend real y adaptarse a las necesidades de esta práctica, utilizaremos `nodepop-api`, un proyecto disponible en [GitHub](https://github.com/davidjj76/nodepop-api) que proporciona un completo API REST que se ajusta perfectamente a los requisitos de la aplicación.

Para descargar el proyecto, puedes clonar el repositorio desde GitHub utilizando el siguiente comando:

```bash
git clone git@github.com:davidjj76/nodepop-api.git
```

Una vez clonado el repositorio, sigue las instrucciones proporcionadas en la documentación del proyecto para arrancar el servidor de `nodepop-api`. Una vez arrancado, podrás acceder a un Swagger en la ruta `/swagger`, donde podrás probar los diferentes endpoints y ver cómo se pasan los datos a las distintas peticiones.

Este backend de soporte nos permite simular un entorno realista para el desarrollo y prueba de nuestra aplicación frontend.

## Empezar la aplicación

Para ejecutar el proyecto localmente, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Accede a la carpeta del proyecto `NODEPOP-FRONT`.
3. Instala las dependencias usando `npm install`.
4. Asegúrate de que la variable de entorno `VITE_REACT_APP_API_BASE_URL` en el archivo `.env` coincide con la URL donde está alojado el servidor backend. Modifícala si es necesario.
5. Inicia el servidor de desarrollo con `npm run dev`.
6. Accede a la aplicación en tu navegador usando la url devuelta por terminal.

Para probar los tests unitarios de la aplicación, en vez de realizar el paso 5 anterior:

5. Inicia el servidor de testeo con `npm run test`.

## Contribuciones

Este proyecto es parte de un laboratorio académico y no acepta contribuciones externas en este momento.

Autor: Jorge Quintero Bermejo
