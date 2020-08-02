---
layout: post
title: "Agregar iconos a un proyecto de ASP.NET Core "
date: 2019-02-16 12:00:01 +0000
categories: asp.net core
image:
  path: /img/og-iconos.webp
  height: 339
  width: 647
last_modified_at: 2020-08-01 12:29:55 +0000
description: "Aprende como agregar Font Awesome a un proyecto de ASP.NET Core. También se agregan los iconos de Feather "
---

Los elementos gráficos de las aplicaciones web le dan un atractivo adicional a nuestra interfaz gráfica. Un elemento que puede mejorar significativamente la apariencia de tu sitio web son los iconos. En este tutorial te mostramos como usar agregar los iconos [Feather](https://feathericons.com/) y [Fontaweosme](https://fontawesome.com/) a un proyecto de ASP.NET Core. Feather es un conjunto de 274 iconos en formato [SVG](https://svgontheweb.com/#svg).

<img src="/img/feather-sample.webp" loading="lazy" alt="Muestra de los iconos de Feather">

La plantilla para crear una aplicación ASP.NET Core viene integrada con Bootstrap 4 que precisamente desde esta versión [dejo de incluir los iconos](https://getbootstrap.com/docs/4.0/extend/icons/) y los iconos de Feather están dentro de una de las opciones recomendadas para sustituir a los que estaban incluidos en versiones anteriores de Bootstrap.

Partimos de un nuevo proyecto ASP.NET Core 3.1 creado en Visual Studio 2019 con control de código fuente para visualizar los cambios realizados. A grandes rasgos el proyecto de ASP.NET Core se crea asi

_Archivo > Nuevo proyecto > .NET Core > Aplicación Web ASP.NET Core (Agregar a control de Código Fuente)_ después seleccionar _.NET Core 3.1 > Aplicación Web (MVC)_

## Cómo instalar Font Awesome en un proyecto de ASP.NET Core **LibMan**

La librería de iconos más famosa es sin duda es [Font Awesome](https://fontawesome.com/) en esta sección te muestro como utilizar la herramienta global para .NET Core de **LibMan** para instalar Font Awesome dentro de un proyecto MVC de ASP.NET Core. Si prefieres utilizar una interfaz gráfica revisa la sección anterior que utiliza **LibMan** pero con Visual Studio.

Para instalar **LibMan** en un proyecto de ASP.NET Core realiza el siguiente procedimiento dentro de la carpeta del proyecto

1. Instalar **LibMan** como herramienta global: `dotnet tool install -g Microsoft.Web.LibraryManager.Cli`

2. Inicializa **LibMan** dentro del proyecto con el comando `LibMan init` . Se te solicitara elegir entre los proveedor de CDN disponibles *cdnjs*, *filesystem* , *jsdelivr* ,*unpkg*. El proveedor default es *cdnjs*. Esto creara un archivo json con la siguiente contenido.

```json
{
  "version": "1.0",
  "defaultProvider": "cdnjs",
  "libraries": []
}
```

3. Instalar Font Awesome con el comando especificando la ruta donde se guardaran los archivos en este caso _wwwroot/lib/font-awesome_ . La siguiente acción descargara los 46 archivos (hojas de estilos, scripts y fuentes) de Font Awesome desde el CDN. Adicionalmente puedes usar la opción _--files_ para especificar unicamente los archivos que deseas por ejemplo `--files css/all.min.css`

```bash
libman install font-awesome@5.14.0 --destination wwwroot/lib/font-awesome
```

Al finalizar veras el mensaje `la biblioteca "font-awesome@5.14.0" se instaló en "wwwroot/lib/font-awesome"`. Y el archivo _libman.json_ quedara de la siguiente manera

```json
{
  "version": "1.0",
  "defaultProvider": "cdnjs",
  "libraries": [
    {
      "library": "font-awesome@5.14.0",
      "destination": "wwwroot/lib/font-awesome"
    }
  ]
}
```

Con esto ya se puede utilizar la librería en nuestra aplicación puedes agregar en elemento **head** del archivo del _Layout.cshtml_. Pero considera que esto agregara la el archivo css a todas las vistas que utilicen este layout.

```html
 <link rel="stylesheet" href="~/lib/font-awesome/css/all.min.css" />
```

Otra opción que te permite agregar de forma selectiva en cada vista el css es agregan una sección opcional al elemento _head_ con la instruccións `@RenderSection("Estilos", required: false)` del archivo layout y especificar en cada vista que requiera usar los iconos de la siguiente manera

```html
@section Estilos {
    <link rel="stylesheet" href="~/lib/font-awesome/css/all.min.css" />
}
```

## Como para instalar Feather con LibMan

[LibMan](https://docs.microsoft.com/es-mx/aspnet/core/client-side/LibMan/?view=aspnetcore-3.1) es el gestor de librearías del lado del client incluido en Visual Studio 2019 que básicamente lo que permite es agregar librerías js y css fácilmente a un proyecto de ASP. NET Core.

1. En el explorador de soluciones dar clic derecho sobre el archivo del proyecto _Agregar > Biblioteca del lado del cliente_.
 
2. En la pantalla emergente selecciona **cdnjs** como proveedor y el Biblioteca coloca **feather-icons@4.17.0** deja la ubicación default **wwwroot/lib/feather-icons/** y presiona aceptar.
Esto descargará los archivos de la librería y los colocara en la carpeta _wwwroot/lib/feather-icons/_ adicionalmente agregar el archivo **LibMan.json**.

3. Abrir el archivo **Layout.cshtml** ubicado en la carpeta _Views/Shared_ dentro en el **Tag Helper Environment** `<environment include="Development">..` agregar la siguiente linea para hacer disponibles los iconos de Feather a todas la pagina que hagan referencia a este *layout*.

```html
    <script src="~/lib/feather-icons/feather.js"></script>
```

4. En el segundo **Tag Helper Environment** `<environment exclude="Development">...`

```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.17.0/feather.min.js"
        asp-fallback-src="~/lib/feather-icons/feather.min.js"
        asp-fallback-test="feather"
        integrity="sha256-XcN55BkQ8zLrLvJmpE4nPHW+zYKGwW10JaYd7bq49gQ="
        crossorigin="anonymous">
    </script>
```

5. Por último agrega la siguiente línea al archivo _site.js_ ubicado en e _wwwroot/js/_

```js
    feather.replace();
```

Con esto ya tenemos listo todo para poder usar los iconos de Feather en nuestro proyecto de ASP .NET Core por ejemplo agrega el siguiente código a el archivo *Index.cshtml*.

```html
    <i data-feather="circle"></i>
```

El ejemplo [Dashboard de Bootstrap 4](https://getbootstrap.com/docs/4.0/examples/dashboard/) usar estos iconos.

Puedes revisar todos los cambios realizados en el Team Explorer y veras que se han hecho: 5 archivos agregados y 3 archivos modificados.
