---
layout: post
title: "Tipos de proyectos de ASP.NET Core "
date: 2019-02-09 20:00:01 +0000
categories: asp.net core
last_modified_at: 2019-05-25 09:42:55 +0000
description: "Se describen las plantillas del SDK de NET Core disponibles para crear proyectos de consola, web"
image:
  path: /img/csharp.webp
  height: 324
  width: 619
---

Una aplicación de ASP.NET Core no es más que una aplicación de consola que ejecuta un servidor web en el método `Main`. En este artículo describo los tipos de proyectos disponibles con el <abbr lang="en" title="Software Developer Kit">SDK</abbr> de *dotnet*.

Todo comienza con el comando `dotnet new` por lo que es importante saber cuales son las opciones disponibles para el mismo . Invocaremos la ayuda sobre mediante la instrucción `dotnet new --help` en la consola o terminal. La salida se muestra en lo siguiente:

<img src="/img/dotnetnewhelp.webp" loading="lazy" alt="Captura de pantalla del comando dotnet new --help">

Hay varias observaciones para esta salida:

* Las opciones tienen una forma corta precedida por un guion medio `-h` y una forma larga precedida por dos guiones medios `--help`. Es decir, es equivalente `dotnet new --help` a `dotnet new -h`.

* Las opciones que me parecen importantes son :
    `--name` Permite especificar el nombre del proyecto
    `--output` Permite especifica la ubicación de los archivos de salida
    `--install` Permite extender el sistema de plantillas. El escenario me viene a la mente que se pueden crear plantillas personalizadas con las políticas establecidas de tal forma que permitan reutilizar código.
    `--type` permite mostrar los diferentes tipos de plantillas: `project`, `items` y `others`
    `--language` Permite elegir el lenguaje de programación para algunas plantillas puede ser C# , VB o F#.

* Cada plantilla de proyecto contiene un nombre corto, por ejemplo, **mvc**, **web** , **webapp** o **webapi** y este nombre corto se usa como argumento para el comando `dotnet new <nombre_corto>`.

* Se pueden crear proyectos de las plantillas **mvc**, **web** y **webapi** usando los lenguajes de programación C# o F#.

## Los proyectos de NET Core

Las plantillas instaladas en el SDK de .NET Core incluyen proyectos para aplicaciones de consola, librearías DLL , Interfaces gráficas, [pruebas unitarias]({% post_url 2019-06-13-pruebas-unitarias-csharp %}) y servicios.

```bash
Plantillas                                        Nombre corto            Lenguaje            Etiquetas                       
----------------------------------------------------------------------------------------------------------------------------------
Console Application                               console                  [C#], F#, VB      Common/Console                       
Class library                                     classlib                 [C#], F#, VB      Common/Library                       
WPF Application                                   wpf                      [C#]              Common/WPF                           
WPF Class library                                 wpflib                   [C#]              Common/WPF                           
WPF Custom Control Library                        wpfcustomcontrollib      [C#]              Common/WPF                           
WPF User Control Library                          wpfusercontrollib        [C#]              Common/WPF                           
Windows Forms (WinForms) Application              winforms                 [C#]              Common/WinForms                      
Windows Forms (WinForms) Class library            winformslib              [C#]              Common/WinForms                      
Worker Service                                    worker                   [C#]              Common/Worker/Web                    
Unit Test Project                                 mstest                   [C#], F#, VB      Test/MSTest                          
NUnit 3 Test Project                              nunit                    [C#], F#, VB      Test/NUnit                           
xUnit Test Project                                xunit                    [C#], F#, VB      Test/xUnit                             
```

## Los proyectos web de ASP.NET Core

Podemos clasificar los tipos de proyectos de ASP.NET Core en las siguientes categorías: 
* _Aplicaciones web tradicionales basadas en **MVC** y [Web API]({% post_url 2019-12-25-introduccion-web-api %})_ 
* _Aplicaciones web tradicionales basadas en **Razor Pages**_,
* _Aplicaciones de una sola página con C# usando **Blazor**_, 
* _Aplicaciones una sola página (<abbr lang="en" title="Single Page Application">SPA</abbr> ) con Javascript_. Estas requieren tener instalado [Node.js](https://nodejs.org/en/)

Veamos los tipos de proyectos disponibles y como crear un proyecto. Puedes ejecutar el comando `dotnet new --type project` para revisar las plantillas de proyecto que tienes instaladas: En este caso mostramos solo las de tipo web, observa que especifican los lenguajes de programación para los que las plantillas de proyecto están disponibles.

 ```bash
Plantillas                                        Nombre corto       Idioma            Etiquetas
----------------------------------------------------------------------------------------------------------------------------
Blazor Server App                                 blazorserver             [C#]              Web/Blazor                           
Blazor WebAssembly App                            blazorwasm               [C#]              Web/Blazor/WebAssembly               
ASP.NET Core Empty                                web                      [C#], F#          Web/Empty                            
ASP.NET Core Web App (Model-View-Controller)      mvc                      [C#], F#          Web/MVC                              
ASP.NET Core Web App                              webapp                   [C#]              Web/MVC/Razor Pages                  
ASP.NET Core with Angular                         angular                  [C#]              Web/MVC/SPA                          
ASP.NET Core with React.js                        react                    [C#]              Web/MVC/SPA                          
ASP.NET Core with React.js and Redux              reactredux               [C#]              Web/MVC/SPA                          
Razor Class Library                               razorclasslib            [C#]              Web/Razor/Library/Razor Class Library
ASP.NET Core Web API                              webapi                   [C#], F#          Web/WebAPI                           
ASP.NET Core gRPC Service                         grpc                     [C#]              Web/gRPC                             
```

En la tabla siguiente se muestran ejemplos de como crear proyectos con la linea de comandos. Se utiliza como ejemplo el proyecto <abbr lang="en" title="Model View Controller">MVC</abbr>. Cada tipo de plantilla tiene diferentes opciones que puedes ver con el comando.

```bash
dotnet new <nombre-corto> --help
```

| Comando                                       | Descripción                                                                                                                                                          |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dotnet new mvc --help`                       | Obtiene las opciones disponibles para este tipo de plantilla                                                                                                         |
| `dotnet new mvc`                              | Crea un proyecto tipo MVC en la capeta actual. El nombre del proyecto predeterminado es igual al nombre de la carpeta desde donde se ejecuta el comando `dotnet new` |
| `dotnet new mvc -o HolaMvc`                   | Crea un proyecto tipo MVC en la capeta _HolaMvc_ si la carpeta no existe esta sera creada                                                                            |
| `dotnet new mvc -o HolaMvc --name MiProyecto` | Crea un proyecto MVC en la carpeta _HolaMvc_ y con nombre _MiProyecto_                                                                                               |
| `dotnet new mvc -lang F# -o HelloMvcFSharp`   | Crea un proyecto MVC en la carpeta _HolaMvc_ y con nombre _MiProyecto_                                                                                               | } |

Recomendamos que por lo menos uses el argumento `-o` para especificar la carpeta donde se colocara el proyecto de salida. Puedes cambiar el nombre corto por el de otro tipo de proyecto y utilizar los ejemplos anteriores con otro tipo de proyecto.

## Visual Studio 

Si usas **Visual Studio** puedes crear un nuevo proyecto mediante _Archivo> Nuevo Proyecto > Web > Aplicación Web ASP.NET Core_.

<img src="/img/ProyectoNuevo.webp" loading="lazy" alt="Nuevo Proyecto ASP.NET Core">