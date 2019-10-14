---
layout: post
title:  "Agregar iconos a un proyecto de ASP.NET Core "
date:   2019-02-16 12:00:01 +0000
categories: asp.net core
image:
  path: /img/og-iconos.jpg
  height: 339
  width: 647
---

Los elementos gráficos de las aplicaciones web le dan un atractivo adicional a nuestra interfaz gráfica. Un elemento que puede mejorar significativamente la apariencia de tu sitio web son los iconos. En este tutorial te mostramos como usar agregar los iconos [Feather](https://feathericons.com/) a un proyecto de ASP.NET Core. Feather es un conjunto de 274 iconos en formato [SVG](https://svgontheweb.com/#svg).

<img data-src="/img/feather-sample.webp" class="lazyload"  alt="Muestra de los iconos de Feather">

La plantilla para crear una aplicación ASP.NET Core viene integrada con Bootstrap 4 que  precisamente desde esta versión [dejo de incluir los iconos](https://getbootstrap.com/docs/4.0/extend/icons/) y los iconos de Feather están dentro de una de las opciones recomendadas para sustituir a los que estaban incluidos en versiones anteriores de Bootstrap.

Partimos de un nuevo proyecto ASP.NET Core 2.2 creado en Visual Studio 2017 con control de código fuente para visualizar los cambios realizados. A grandes rasgos el proyecto de ASP.NET Core se crea asi

_Archivo > Nuevo proyecto > .NET Core > Aplicación Web ASP.NET Core (Agregar a control de Código Fuente)_ después seleccionar _.NET Core 2.2  > Aplicación Web (MVC)_

## Instrucciones para instalar Feather con LibMan

[LibMan](https://docs.microsoft.com/es-mx/aspnet/core/client-side/libman/index?view=aspnetcore-2.2) es el gestor de librearías del lado del client incluido en Visual Studio 2017 que básicamente lo que permite es agregar librerías js, css fácilmente a un proyecto de ASP. NET Core.

1. En el explorador de soluciones dar clic derecho sobre el archivo del proyecto _Agregar > Biblioteca del lado del cliente_.
   
2. En la pantalla emergente selecciona **cdnjs** como proveedor y el Biblioteca coloca **feather-icons@4.17.0** deja la ubicación default **wwwroot/lib/feather-icons/** y presiona aceptar.
Esto descargará los archivos de la librería y los colocara en la carpeta _wwwroot/lib/feather-icons/_ adicionalmente agregar el archivo **libman.json**.

3. Abrir el archivo **Layout.cshtml** ubicado en la carpeta _Views/Shared_ dentro en el **Tag Helper Environment**   `<environment include="Development">..`  agregar la siguiente linea para hacer disponibles los iconos de Feather a todas la pagina que hagan referencia a este *layout*.

```html
    <script src="~/lib/feather-icons/feather.js"></script>
```

4. En el segundo **Tag Helper Environment**  `<environment exclude="Development">...`

```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.17.0/feather.min.js"
        asp-fallback-src="~/lib/feather-icons/feather.min.js"
        asp-fallback-test="feather"
        integrity="sha256-XcN55BkQ8zLrLvJmpE4nPHW+zYKGwW10JaYd7bq49gQ="
        crossorigin="anonymous">
    </script>
```

5. Por último agrega la siguiente línea al archivo site.js ubicado en e _wwwroot/js/_

```js
    feather.replace();
```

Con esto ya tenemos listo todo para poder usar los iconos de Feather en nuestro proyecto de ASP .NET Core por ejemplo agrega el siguiente código a el archivo *Index.cshtml*.

```html
    <i data-feather="circle"></i>
```

El ejemplo [Dashboard de Bootstrap 4](https://getbootstrap.com/docs/4.0/examples/dashboard/)  usar estos iconos.

Puedes revisar todos los cambios realizados en el Team Explorer y veras que se han hecho: 5 archivos agregados y 3 archivos modificados.