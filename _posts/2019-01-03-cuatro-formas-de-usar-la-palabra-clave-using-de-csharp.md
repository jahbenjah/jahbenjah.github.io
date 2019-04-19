---
layout: post
title:  "Cuatro formas de usar la palabra clave using de C#"
comments: true
categories: C# dotnet using 
---
Cada lenguaje de programación cuenta con un conjunto de palabras claves que son utilizadas por el compilador. En este articulo te mostramos 4 formas de usar la palabra reservada **using** de C# con el clásico hola mundo.

<img data-src="/img/csharp.jpg" class="lazyload"  alt="Logo del lenguaje de programación C#">

La lista completa la encuentras aca:[Palabras clave de C#](https://docs.microsoft.com/es-mx/dotnet/csharp/language-reference/keywords/)

Un programa **Hola Mundo**sin la instrucción luce de la siguiente manera:
```
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

Básicamente se observa que es necesario escribir el nombre calificado (incluyendo el espacio de nombre) de tipos que utiliza el programa en este caso ``System.Console.WriteLine``. Esto no es un problema para programas simples y sin sentido como este pero en un programa más complejo se utilizan varias clases lo que dificulta su escritura. Adicionalmente hay un rumor de que _los programadores somos flojos por naturaleza_ por lo que no nos gusta escribir tanto, para ello esta el primer caso de uso:

# using para importar espacios de nombres

Con la instrucción ``using System`` a principio del programa es posible reducir el enunciado ``System.Console.WriteLine("Hola Mundo : sin using");`` por ``Console.WriteLine("using  espaciones de nombres");``

```
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

En este caso permite usar un método estático sin escribir el espacio de nombre.

# **using** para import miembros estáticos

Este es especialmente util cuando nuestro programa hace un gran uso de miembros estáticos (métodos ,campos y propiedades). Como una aplicación que use varias funciones matemáticas:

 Ejemplos de clases estáticas son:

1. [System.Console](https://docs.microsoft.com/es-mx/dotnet/api/system.console?view=netframework-4.7.2).
2. [System.IO.File](https://docs.microsoft.com/es-mx/dotnet/api/system.io.file?view=netframework-4.7.2)
3. [System.Math](https://docs.microsoft.com/es-mx/dotnet/api/system.math?view=netframework-4.7.2)

```
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

Como nota la característica ``using static`` también funciona con **enumeraciones**. [Ver ejemplo](https://twitter.com/STeplyakov/status/1075277979603722240) en Twitter de @STeplyakov

# **using** para crear un alias

En raras ocasiones , pero si pasa , dos o más tipos tienen el mismo nombre por lo que ocurre una colisión de nombres y el compilador no sabe cual tipo elegir por lo que usar  **using** para importar espacio de nombres no ayuda.

Podemos crear un alias para un tipo usando la palabra using seguida del alias  igualando con el nombre completo de la clase : ``using Consola = System.Console;``.

```csharp

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

# *using* para clases que implementan IDisposable

El ultimo caso es cuando una clase implementa la interfaz [IDisposable](https://docs.microsoft.com/es-mx/dotnet/api/system.idisposable?view=netframework-4.7.2) esto asegura que tendrá el método ``Dispose`` que es utilizado para liberar recursos no administrados como un archivo , una conexión de red, una conexión con base de datos. Este es similar al try with resources de Java.

```csharp

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

> Para ver si una clase o su clase padre implementa implementa la interfaz ``IDisposable`` puedes usar la característica del _Visual Studio_  **Ir a definición F12**.

# Para llevar

* El lenguaje de programación en el que programamos es una elección. Por lo que debemos familiarizarnos con las características y los llamados [**Programming idioms**](https://en.wikipedia.org/wiki/Programming_idiom).

* Ya lo escribió Jon Skeet si elegiste C#: 
> La especificación de C# debe ser tu nueva mejor amiga

* ¿ Conoces el patrón Dispose ?