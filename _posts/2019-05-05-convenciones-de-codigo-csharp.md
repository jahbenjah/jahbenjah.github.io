---
layout: post
title:  "Convenciones de código para C#"
date:   2019-05-05 10:18:55 +0000
categories: C#
permalink: /:categories/:title:output_ext
---

La convenciones en  programación ayudan a entender mejor el código y lo hacen mas mantenible a través del tiempo. En esta guía se dan un conjunto de recomendaciones para principiantes en el lenguaje C# sobre como nombrar sus diferentes tipos, variables, propiedades y campos en C#. Si tienes una visión distinta por favor háznosla saber en los comentarios.

* Conoce las palabras [reservadas del lenguaje C#](https://docs.microsoft.com/dotnet/csharp/language-reference/keywords/) y las **palabras reservadas en un contexto** pero sobre todo evita utilizarlas como identificadores con el uso del `@`. El siguiente programa compila pero no comunica el verdadero sentido del programa.

```cs
class @class
{
    //Evitar el uso de palabras reservadas en los identificadores
    public int @int { get; set; }
    public void @string () => Console.WriteLine(@int.ToString());
}
```

* Usa nombres significativos para los identificadores. Compara las siguientes clases ambas compilan pero solo una expresa el sentido de la misma.

```csharp
class Circunferencia
{
public int Radio { get; set; }
public double CalcularDiametro => Radio * 2;
public double CalcularArea => Math.PI * Math.Pow(Radio,2);
}

class c
{
public int r { get; set; }
public double d => r * 2;
public double a => Math.PI * r * r;
}
```

* Conoce las expresiones idiomáticas de C#. Esto va desde lo más simple como propiedades y operadores `??` hasta cosas más complejas como eventos y delegados y cosas casi oscuras como tuplas, lambdas, **yield** , tipos anónimos y restricciones de tipos genericos. [Aqui](https://stackoverflow.com/questions/9033/hidden-features-of-c?sort=votes&page=1#sort-top) puedes ver una pregunta en StackOverFlow donde enumeran algunas de las características de C#.

* Usa la notación Pascal para nombrar espacios de nombres, clases, métodos, estructuras, enumeraciones y propiedades publicas.

* Usa la notación Camel para nombrar  campos, variables.

* Usar la notación de serpiente en los campos privados. 

```cs
namespace MiEmpresa.Ventas
{
    public class Producto
    {
        private readonly int _impuesto;
        public Producto(string nombre, decimal precio)
        {
            _impuesto = 16;
            Nombre = nombre;
            Precio = precio;
        }
        public int Iva { get { return _impuesto; } }
        public decimal Precio { get; set; }
        public string Nombre { get; private set; }
        public decimal CalcularDescuento(int descuento)
        {
            return Precio * descuento / 100;
        }
    }
}
```

* Procura tener una sola clase por archivo. Esto no aplica cuando usar la palabra clave `partial` para crear [tipos](https://docs.microsoft.com/es-es/dotnet/csharp/language-reference/keywords/partial-type) o [métodos](https://docs.microsoft.com/es-es/dotnet/csharp/language-reference/keywords/partial-method) parciales. Los diseñadores de código utilizan frecuentemente esta característica.

* Especifica el [modificador de acceso](https://docs.microsoft.com/es-es/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers) de forma explicita. Los diferentes miembros de un tipo de C# tienen un modificador de acceso predeterminado cuando no se especifica.

# Para llevar

Para más detalles puedes revisar el documento [Framework Design Guidelines - Convenciones generales de nomenclatura](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/naming-guidelines) que explica detalladamente estos conceptos.

Dos libros que te pueden ayudar a profundizar el C# son **Effective C# (Covers C# 6.0), (includes Content Update Program): 50 Specific Ways to Improve Your C#** y **More Effective C#: 50 Specific Ways to Improve Your C#** de autor [Bill Wagner](https://twitter.com/billwagner).