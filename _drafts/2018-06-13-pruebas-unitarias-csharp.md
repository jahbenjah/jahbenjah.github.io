---
layout: post
title:  "Pruebas unitarias con C#"
comments: true
categories: dotnet 
---

 La práctica llamada desarrollo guiado por pruebas o por sus siglas en ingles TDD <span lang="en">Test Driven Development</span>) es algo que no he encontrado en los proyectos que he visto y participado. En está se busca codificar inicialmente las pruebas que cubran los requerimiento deL proyecto y posteriormente escribir la menor cantidad de código que permita pasar las pruebas implementando el ciclo conocido como Rojo-Verde-Refactorizar o (Red-Green-Refactor).

> Nunca pidas permiso para [refactorizar](https://es.wikipedia.org/wiki/Refactorizaci%C3%B3n). Nunca pidas permiso para escribir pruebas. Haces estas cosas porque SABES que son la mejor manera de avanzar más rápido. Cuando pides permiso, le estás pidiendo a alguien que se haga responsable de tus acciones. [Tio Bob Martin](https://twitter.com/unclebobmartin/status/1134824807969804291)

El ciclo Red-Green-Refactor lleva 3 etapas : La primera RED, implica escribir una prueba unitaria está debe fallar ya que aun no contamos con el código escrito y el ejecutar de pruebas la marca en rojo. La segunda etapa se alcanza cuando se ha escrito código suficiente para pasar la prueba unitaria y el ejecutor de pruebas indica un estado verde. El último paso es refactorizar nuestro código para este optimizado y que sea que sea legible se debe asegurar que el estado quede en verde.

En este articulo se da una guía de como crear un proyecto con pruebas unitarias usando C# la línea de comando. Para crear el proyecto se usa el SDK de .NET Core 2.2.

1. Abrir una terminal y crear una nueva solución en blanco

```bash
dotnet new sln -o MiApp
```

2. Abrir la carpeta MiApp mediante el comando: cd MiApp

3. Crear un proyecto biblioteca de clases : dotnet new classlib -o src/MiApp

4. Crear un proyecto de pruebas.

5. Agregar referencia.

6. Implementar ciclo Red , Green , Refactor.