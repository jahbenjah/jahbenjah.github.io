---
layout: post
title:  "C# Records"
date:   2021-12-26 10:00:01 +0000
categories: csharp
last_modified_at: 2021-12-26 10:00:01 +0000
description: Un record es como una clase pero con algunos comportaminetos similarea a los tipos de valor.
---

En este articulo les explicaré que son los Récords de C# o registros y para qué se utilizan. Esta característica fua agregada inicialmente en C# 9.0  que salio en conjunto con .NET 5 y en C# 10 con .NET 6 se añadio el soporte a los `records structs`.

Los records son datos inmutables que básicamente tienen un comportamiento como transporte de datos viniendo como a sustituir este uso de los objetos que tenemos conocidos como DTOs que básicamente no tienen comportamiento solamente traen las propiedades para para transportar datos.

Lo que hizo el equipo del lenguaje de programación C# fue crear una nueva palabra clave para declarar los records esta palabra clave es `record`.  Anteriormente estaban manejando `data class` que es similar a otros como se declara en otro lenguajes que ya soportan los registros por ejemplo **Kotlin**, **Scala** y **Java 14**.

## Declarar un record 

Para que declarar un récord con propiedades inmutables puedes usar una sintaxis simialar a la de una clase por ejemplo:

```cs
public record Person
{
    public string FirstName { get; init; }
    public string LastName { get; init; }
}
```

Tambien se puede declarar un record con propiedades inmutables con una nueva sintaxis conocida como parametros posicionales:

```cs
public record Person(string FirstName, string LastName);
```

* Un record puede ser `partial`- Si es parcial es decir que lo puedes dividir en varios archivos.

* Los records soportan herencia


## Manejar a herencia con los Records

Los records pueden heredar unicamente de otro record. Un record no puede extender una clase diferente a `object`.


## Record structs

A partir de C# 10 puedes declarar un record usando `record struct` o `readonly record struct`.

## Conclusión

Por este articulo sería todo seguimos en contacto y hasta la próxima.
