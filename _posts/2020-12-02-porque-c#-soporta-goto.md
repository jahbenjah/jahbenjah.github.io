---
layout: post
title:  "Porque C# soporta el goto"
categories: csharp
date:   2020-12-01 19:00:01 +0000
permalink: /:categories/:title:output_ext
last_modified_at: 2020-11-21 20:00:01 +0000
---

La historia de este pequeño articulo surgio al leer el _capítulo 4 Programación estructurada_ del libro _Clean Architecture_ donde narran la historia de como Dijkstra intento hacer una
formulación matemática de la programación a la manenera de los **Elementos** de Euclides. La historia es muy amena e incluye la mención de los diferentes usos de goto  y la publicación del famoso articulo _Go To Statement Considered Harmful_.

Para no hacer más larga la historia el tio Bob hace una mencion sobre las razones de porque los lenguajes modernos de programación no incluyen el soporte al goto sin restricciones:

> "La mayoría de los lenguajes de progrmación modernos no tienen un enunciado `goto` y por supuesto LISP nunca lo tuvo". Robert C. Martin AKA Tipo Bob.

Como me considero un programador C# y creo que este es un lenguaje de programación moderno inmendiatemanete dije _¡pero C# tiene soporte para el `goto`!_. Para confirmar que mis recuerdos eran correctos comence a buscar en la especifiación de C#
el `goto` esto debido a que en mi corta carrera como programador nuenca lo he visto en un código de otro progrmador ni lo he utilizado en mi propio código. [La especificacion de C# tiene una sección dedicada al goto](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/statements#the-goto-statement) y menciona que los posibles usos y restricciones del enunciado goto.

Es ahi donde me surgieron diferentes dudas ¿porque razón los diseñadores del lenguaje C# decidieron incluirlo? ¿Que otros lenguajes lo tienen y porque ?
Comence a buscar en internert y en la especificacion de C# comentada que es una de mis favoritas que aunque abarca la version 4.0 la considero de mucho valor gracias a los comentarios de los diferentes autores.

* Go tiene soporte para el goto. En Stackoverflow dan un ejemplo de la libreria de GO que usa el goto
* Java y Kotlin no tiene soporte para el goto

En el caso de la edición comentada Peter Sestof un famoso profesor de ciencias de la computación da una idea probable del porque C# soporta el goto. Basicamente menciona hay ciertos tipos que pueden usarlo como parsers, lexer, automatas, graficas de estado, maquinas virtuales y programas similares.

Por último un ejemplo del uso del goto en C# 

```cs
static void Main(string[] args){
int i =0;
goto check;
loop:
Console.WriteLine(args[i++]);
check:
if(i<args.Length)
goto loop;
}
```
