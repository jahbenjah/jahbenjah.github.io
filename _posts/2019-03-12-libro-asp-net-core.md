---
layout: post
title:  "El pequeño libro de ASP.NET Core "
date:   2019-03-17 12:00:01 +0000
categories: asp.net core
image:
  path: https://aspnetcoremaster.com/little-aspnetcore-book/cover.jpg
seo:
  date_modified: 2019-03-24 12:00:01 +0000
---

Los mayoría de los recursos para aprender "ASP.NET! Core están en inglés. Esta traducción del libro "The Little ASP.NET Core Book" de [Nate Barbettini](https://twitter.com/nbarbettini) es un intento de tener más materiales en nuestro propio idioma.

![Portada de El pequeño libro de ASP.NET Cote](https://aspnetcoremaster.com/little-aspnetcore-book/cover.jpg)

La traducción sin duda puede contener errores así que te animamos a reportar cualquier error que encuentres en el libro. Puedes abrir una incidencia en el [repositorio Github](https://github.com/jahbenjah/little-aspnetcore-book/issues).

Los planes a futuro para esta traducción son mantenerla actualizada cada que se actualice la edición en ingles esta sera gratuita siempre. Adicionalmente tengo planeado hacer un **versión extendida** con explicaciones detalladas donde sea necesario , un glosario, sección de ejercicios resueltos y propuestos y por su puesto actualizada con la version 3.0 que esta por salir en este 2019.

# Una introducción amigable a la programación web

El pequeño libro de ASP.NET Core está estructurado como un tutorial. Construirás una aplicación de principio a fin y con ello aprenderás:

* Los fundamentos del patrón MVC (Modelo-Vista-Controlador)
* Cómo funciona el código del lado del cliente (HTML, CSS y Javascript) junto con el código del lado del servidor.
* Qué es la inyección de dependencias y porque es tan útil
* Cómo leer y escribir datos a una base de datos
* Cómo agregar inicio de sesión, registro y seguridad
* Cómo desplegar la aplicación en la web

No te preocupes, no necesitas conocer nada sobre ASP.NET Core (o algo de lo anterior) para iniciar.

# Nota de la traducción

Este libro fue escrito usando la version 2.0 de ASP.NET Core para que todo lo descrito en el libro funcione correctamente es necesario tener instalado el [SKD de .NET Core 2.0](https://dotnet.microsoft.com/download/dotnet-core/2.0).

Esto es debido a que si usa la última versión del SDK, se crea un proyecto con la última versión de forma predeterminada.

Si utiliza la linea de comandos `dotnet` necesita ,primero crear un archivo `global.json`.
Antes de lo que se describe en el capítulo [Crear un proyecto de ASP.NET Core](https://aspnetcoremaster.com/little-aspnetcore-book/chapters/your-first-application/create-aspnetcore-project.html)

Cree un nuevo directorio para almacenar todo su proyecto y muévase a él:

```
mkdir AspNetCoreTodo
cd AspNetCoreTodo
```

Debe asegurarse que tiene instalado el SDK 2.0

```
dotnet --list-sdks
2.0.3 [C:\Archivos de programa\dotnet\sdk]
```

Crea un archivo global.json con el comando .

```
dotnet new globaljson --sdk-version 2.0.3
```

donde la versión 2.0.3 es la que da la salida del comando anterior.

Si usas **Visual Studio** hay un combo que permite seleccionar la versión 2.0 al momento de crear el proyecto.

# Como obtener el libro

Puedes leer en línea desde el sitio [aspnetcoremaster.com](https://aspnetcoremaster.com/little-aspnetcore-book/) o descargar la version en [pdf](https://github.com/jahbenjah/little-aspnetcore-book/blob/spanish/ElPeque%C3%B1oLibroDeASPNETCore.pdf) desde aquí

Para obtener la versión más reciente de la edición en español de _El pequeño libro de ASP .NET Core_ puedes visitar regularmente este sitio ya que este sera actualizado constantemente.