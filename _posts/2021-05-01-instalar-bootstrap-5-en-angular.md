---
layout: post
title:  "Como instalar Bootstrap 5 en Angular"
date:   2021-05-01 12:00:01 +0000
categories: angular
permalink: /:categories/:title:output_ext
image:
  path: /img/angular-vista.png
  height: 358
  width: 683
last_modified_at: 2021-05-01 12:00:01 +0000
description: Aprende cómo instalar Bootstrap 5 en una aplicación con Angular 11 editando el archivo angular.json. 
---

Una aplicación creada con con la Angular CLI esta compuesta básicamente es un componente que trae unos estilos personalizados que luce de esta manera:

<img src="/img/angular-vista.png" loading="lazy" alt="Vista de una aplicación creada con Angular CLI versión 11.">

Con Angular es posible utilizar Bootstrap 5 que es la última versión que es la versión de esta popular libreria y ya no tiene la dependencia obligatoria del la tan odiada jQuery. Actualmente está la disponible la beta 3 en mu poco tiempo puede salir la versión oficial.

## Usar un CDN o versión local

Una pregunta importante antes de instalar es definir si donde se desplegara la aplicacion que estamos desarrollando tendrá acceso a Internet y si vamos a realizar a utilizar la libreria sin muchas modificaciones . Si la respuestas son a ambas preguntas es si entonces puedes optar por usar un CDN.

Para usar los estilos de Bootstrap 5 en una aplicacion de Angular tienes que editar el archivo `index.html` y agregar la etiqueta `link` con la url del CDN:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
```

## Instalar Bootstrap 5 con NPM

Para instalar Bootstrap usamos el comando `npm` o Node Package Manager con la siguiente instrucción

```bash
npm install bootstrap@next
```

Con el `@next` estamos especificando a npm que instale la ultima versión disponible en modo beta. Al momento de escribir esto  corresponde a la version la beta 3 de la popular libreria.

A continuación vamos a editar el archivo angular.json que es aquí se pueden especificar los estilos a utilizar de forma global. Este archivo json trae un arreglo llamado _styles_ que especifica los estilos de la aplicación:

```json
"styles": 
[
 "node_modules/bootstrap/dist/css/bootstrap.css",
 "src/styles.css"
],
```

Para utilizar Bootstrap con Angular es necesario agregar al arreglo la url donde se instalo el paquete tanto en las secciones build como en test. Por default las librerías instaladas con npm se guardan en la carpeta _node_modules_

```json
"styles": 
[
 "node_modules/bootstrap/dist/css/bootstrap.css",
 "src/styles.css"
]
```

> Nota: Estamos usando la versión no minificada porque en el momento de compilar la aplicación para producción la cli de angular minifica.

Con esto ya tenemos todas las clases de Bootstrap en nuestra aplicación de Angular pero faltan los archivos de Javascript que son necesarios par algunos componentes de Bootstrap.
## Usando 

como son las alertas, el carrusel y los drop down, los modales ,las barras de navegación pero lo dejare,os para otra ocasión.
