---
layout: post
title:  "Tipos de proyectos de ASP.NET Core "
date:   2019-02-09 20:00:01 +0000
categories: asp.net core
---

Una aplicación de ASP\.NET Core no es más que una aplicación de consola que ejecuta un servidor web en el método `Main`. En este artículo describo los tipos de proyectos disponibles con el SDK de dotnet.

Todo comienza con el comando `dotnet new` por lo que es importante saber cuales son las opciones disponibles para el mismo . Invocaremos la ayuda sobre mediante la instrucción `dotnet new --help` en la consola o terminal. La salida se muestra en lo siguiente 

<img data-src="/img/dotnetnewhelp.PNG" class="lazyload"  alt="Captura de pantalla del comando dotnet new --help">

Hay varias observaciones para esta salida:

* Las opciones tienen una forma corta precedida por un guion medio `-h` y una forma larga precedida por dos guiones medios `--help`. Es decir es equivalente `dotnet new --help` a `dotnet new -h`.

* Las opciones que me parecen importantes son :
    `--name` Permite especificar el nombre del proyecto
    `--output` Permite especifica la ubicación de los archivos de salida
    `--install` Permite extender el sistema de plantillas. El escenario me viene a la mente que se pueden crear plantillas personalizadas con las políticas establecidas de tal forma que permitan reutilizar código.
    `--type` permite mostrar los diferentes tipos de plantillas: `project`, `items` y `others`
    `--language` Permite elegir el lenguaje de programación para algunas plantillas puede ser C# , VB o F#.

* Cada plantillas de proyecto contiene un nombre corto como por ejemplo **mvc**, **web** , **webapp** o **webapi** que es usado para crearlo.

* Se pueden crear proyectos de las plantillas  **mvc**, **web** y **webapi** usando C# y F#.

# Los proyectos web de ASP.NET Core

Podemos clasificar los tipos de proyectos de ASP.NET Core en las siguientes categorías:  
_Aplicaciones web tradicionales basadas en **MVC**_
_Aplicaciones we tradicionales basadas en **Razor Pages**_,
_Aplicaciones una sola página (SPA Single Page Application)_

 Veamos los tipos de proyectos disponibles y como crear un proyecto.

|Proyecto|Nombre Corto|Comando|
|-|-|-|
|ASP.NET Core Empty|web|`dotnet new web`|
|ASP.NET Core Web App (Model-View-Controller)|mvc|`dotnet new mvc`|
|ASP.NET Core Web API|webapi|`dotnet new webapi`|
|ASP.NET Core with Angular|angular|`dotnet new angular`|
|ASP.NET Core with React.js|react|`dotnet new react`|
|ASP.NET Core with React.js and Redux|reactredux|`dotnet new reactredux`|
|ASP.NET Core Web App|webapp|`dotnet new webapp`|
|Razor Class Library|razorclasslib|`dotnet new razorclasslib`|

## Visual Studio 

Si usas Visual Studio puedes crear  nuevo proyecto mediante _Archivo> Nuevo Proyecto > Web > Aplicación Web ASP.NET Core_

<img data-src="/img/ProyectoNuevo.PNG" class="lazyload"  alt="Nuevo Proyecto ASP.NET Core">