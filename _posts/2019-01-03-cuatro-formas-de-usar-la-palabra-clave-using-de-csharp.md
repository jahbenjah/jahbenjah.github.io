---
layout: post
title:  "Cuatro formas de usar la palabra clave using de C#"
categories: C# dotnet using 
description: ▷ Como usar using en C# using para importar espacios de nombres y miembros estáticos, alias, liberar recursos no administrados y declaraciones using. 
last_modified_at: 2019-11-20 11:33:26 +0000

---
Cada lenguaje de programación cuenta con un conjunto de palabras claves que son utilizadas por el compilador. En este articulo te mostramos 4 formas de usar la palabra reservada **using** de C# con el clásico hola mundo.

<img data-src="/img/csharp.webp" class="lazyload"  alt="Logo del lenguaje de programación C#">

Puedes consultar la lista completa de:[Palabras clave de C#](https://docs.microsoft.com/dotnet/csharp/language-reference/keywords/) en la documentación.

Un programa **Hola Mundo**sin la instrucción luce de la siguiente manera:

```cs
namespace Using
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Console.WriteLine("Hola Mundo : sin using");
        }
    }
}
```

Básicamente se observa que es necesario escribir el nombre calificado (incluyendo el espacio de nombre) del los tipos que utiliza el programa en este caso `System.Console.WriteLine`. Esto no es un problema para programas simples y sin sentido como este pero en un programa más complejo en el que se utilizan varias clases esto se vuelve en martirio ya que una clase real puede tener más de 10 instrucciones `using`. Por ejemplo un controlador de una aplicación que cre en ASP.NET Core principal tiene 18

```cs
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using MiAplicacion.Interfaces;
using MiAplicacion.Services;
using MiAplicacion.Data;
using MiAplicacion.Identity;
using MiAplicacion.Interfaces;
using MiAplicacion.Models;
```

 Adicionalmente hay un rumor de que _los programadores somos flojos por naturaleza_ por lo que no nos gusta escribir tanto, para ello esta el primer caso de uso:

# **using** para importar espacios de nombres

Con la instrucción `using System` a principio del programa es posible reducir el enunciado `System.Console.WriteLine("Hola Mundo : sin using");` por `Console.WriteLine("using espacios de nombres");`

```cs
using System;

namespace Using
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("using para importar espacios de nombres");
        }
    }
}
```

En este caso permite usar un método estático `WriteLine` sin escribir el espacio de nombres de la clase `Console`.

# **using** para importar miembros estáticos

Este es especialmente util cuando nuestro programa hace un gran uso de miembros estáticos (métodos ,campos y propiedades). Como una aplicación que use varias funciones matemáticas:

 Ejemplos de clases estáticas son:

1. [System.Console](https://docs.microsoft.com/es-mx/dotnet/api/system.console?view=netframework-4.7.2).
2. [System.IO.File](https://docs.microsoft.com/es-mx/dotnet/api/system.io.file?view=netframework-4.7.2)
3. [System.Math](https://docs.microsoft.com/es-mx/dotnet/api/system.math?view=netframework-4.7.2)

```cs
using static System.Console;

namespace Using
{
    class Program
    {
        static void Main(string[] args)
        {
            WriteLine("Hello World!");
        }
    }
}
```

Como nota la característica `using static` también funciona con **enumeraciones**. [Ver ejemplo](https://twitter.com/STeplyakov/status/1075277979603722240) en Twitter de @STeplyakov

# **using** para crear un alias

En raras ocasiones, pero si pasa, dos o más tipos tienen el mismo nombre pero están en diferentes ensamblados si ambos se usan en en una clase ocurre una colisión de nombres y el compilador no sabe cual tipo elegir y lo que es peor `using` para importar espacio de nombres no ayuda.

Podemos crear un alias para un tipo usando la palabra using seguida del alias igualando con el nombre completo de la clase : `using Consola = System.Console;`.

```cs

using Consola = System.Console;

namespace Using
{
    class Program
    {
        static void Main(string[] args)
        {
            Consola.WriteLine("using para crear un alias");
        }
    }
}
```

Con el alias se resuelve el problemas de las colisión de nombres y la clase `System.Console` es identificada como `Consola`. Esto solo afecta la clase en la que se declara el alias.

# `using` para clases que implementan `IDisposable`

El ultimo caso es cuando una clase implementa la interfaz [IDisposable](https://docs.microsoft.com/dotnet/api/system.idisposable?view=netframework-4.7.2) esto asegura que tendrá el método `Dispose` que es utilizado para liberar recursos no administrados como un archivo, una conexión de red, una conexión con base de datos entre otros. Este caso es muy similar al [<span lang="en">try with resources</span>](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html) de Java.

```cs

namespace Using
{
    class Program
    {
        static void Main(string[] args)
        {
            using (System.IO.StreamReader lector = System.IO.File.OpenText("archivo.txt"))
            {
                System.Console.WriteLine(lector.ReadToEnd());
            }
        }
    }
}
```

Esto asegura que se ejecute en método `Dispose` de la clase `StreamReader` al terminar el bloque de código encerrado por el enunciado `using`.

La especificación de C# sobre el [using statement](https://docs.microsoft.com/dotnet/csharp/language-reference/language-specification/statements#the-using-statement)

> Para ver si una clase o su clase padre implementa implementa la interfaz `IDisposable` puedes usar la característica del _Visual Studio_  **Ir a definición F12**.

# Declaraciones using C# 8.0

Como punto adicional a este articulo esta la característica conocida como _declaraciones using_ recién liberada con C# 8.0 el pasado 23-09-2019 durante la [.NET Conf 2019]({% post_url 2019-09-23-net-conf-2019 %}).

Básicamente permite declarar una variable precedida de la palabra reservada `using`. Con esto se establece que la recurso declarada debe ser liberado al final del alcance donde se declaro. Eso se puede ver como una simplificación de caso anterior por ejemplo para declarar una conexion tenemos las siguientes dos opciones.

```cs
static void Main(string[] args)
{
    using (SqlConnection connection = new SqlConnection()))
    {
      // Realizar operaciones con la conexión
    } // aquí se libera la conexion
}
```

Con las declaraciones using de C# 8.0 el codigo se veria de la siguiente manera.

```cs
static void Main(string[] args)
{
    using SqlConnection connection = new SqlConnection());
    // Realizar operaciones con la conexión  
}   // aquí se libera la conexion
```

> **Nota** Puedes ver que version de C# usas en tu proyecto de Visual Studio en las propiedades del proyecto dentro de la pestaña _Build>Output>Advanced_. C# 8.0 solo esta habilitado por default para proyectos _NET Core 3.x_ y _.NET Standard 2.1_. En todos los demás casos tienes que habilitarlo como se describe aquí: [Control de versiones del lenguaje C#](https://docs.microsoft.com/dotnet/csharp/language-reference/configure-language-version).

# Conclusión

* El lenguaje de programación en el que programamos es una elección. Por lo que debemos familiarizarnos con las características y los llamados [**Programming idioms**](https://en.wikipedia.org/wiki/Programming_idiom).

* Ya lo escribió Jon Skeet si elegiste C#:

> La especificación de C# debe ser tu nueva mejor amiga

* ¿ Conoces el patrón Dispose ?