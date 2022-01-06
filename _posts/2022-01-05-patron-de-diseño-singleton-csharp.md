---
layout: post
title:  "Patrón de diseño Singleton con C#"
date:   2022-01-05 08:00:01 +0000
categories: csharp
description: Implementaciones de ejemplo del patrón de diseño Singleton usando el lenguage de programacíon C#.
---

En esta ocasión hablaremos del patrón de diseño Singleton. Este patrón de diseño salió en el libro **Design Patterns: Elements of Reusable Object-Oriented Software** que fue escrito por estos cuatro autore  Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides, que son conocidos como "la banda de los cuatro" o en inglés Gang of Four (GoF).
En este libro se crean se describen 23 patrones que están clasificados en tres categorías esas tres categorías principales que son

* Creacionales
  * Abstract factory
  * Builder
  * Factory Method
  * Prototype
  * Singleton
* Estructurales
  * Adapte
  * Bridge
  * Composite
  * Decorator
  * Facade
  * Flyweight
  * Proxy
* De comportamiento (Behaviorales)
  *  Chain of responsability
  *  Command
  *  Interpreter
  *  Iterator
  *  Mediator
  *  Memento
  *  Observer
  *  State
  *  Strategy
  *  Template method
  *  Visitor

En el caso del patrón **Singleton** está clasificada dentro de la categoría creaciónal eso quiere decir que estos patrones tienen que ver con la distanciación de objetos y el patrón singleton tiene la responsabilidad de proveer únicamente un objeto y restringir como la creación de más objetos y provee un método para acceder a este objeto.
Aunque la discusión original fue de este libro yo estoy usando principalmente la información del libro de Robert C Martin y Micah Martin **Agile Principles, Patterns, and Practices in C#**.

# Implementación del patrón Singleton en C#

A continuación te muestro dos ejemplos de implementación del patrón Singleton en C# 10 y .NET 6 sería como esto:

> **Nota:** Estas implementación no son Thread Safe. Esta implementación del Singleton no tiene ninguna funcionalidad. La funcionalidad adicional que tú le requieras la deberías de adicionar a la clase.

La primera implementación es:

```cs
namespace Singleton;

public class Singleton
{
    private static Singleton _instance = null;
    private Singleton() 
    {
    }

    public static Singleton Instance
    {
        get
        {
            if (_instance == null)
                _instance = new Singleton();
            return _instance;
        }
    }
    // Otros funciones de la clase
}
```

* Incluye un solo campo statico y privado del mismo tipo de la clase.
* Un constructor privado 
* Una forma de acceder al campo privado. En este caso estoy usando una propiedad de solo lectura pero tambien puede ser un método.
* Usa la instanciación perezosa es decir solo crea el objeto en caso de ser necerio.
  
La segunda implementación del patrón Singleton:

```cs
namespace Singleton;

public sealed class Singleton2
{
    private Singleton2() { }

    private static readonly Singleton2 _instance = new();

    public static Singleton2 GetInstance()
    {
        return _instance;
    }
}
```
La segunda implementación tiene estas caracteristicas

* Incluye un solo campo statico y privado del mismo tipo de la clase.
* Un constructor privado 
* Una forma de acceder al campo privado. En este caso estoy usando un método.
  
* estático más ya es un poco diferente a lo que venimos manejando siempre creamos un constructor público el constructor privado lo que hará es evitar que cualquier clase diferente a singleton puede crear un objeto del tipo singleton

En el caso de la implementación básica que está usando una propiedad lo que está haciendo es primero validando si si la instancia 5 la variable singleton es esta nulo y sin si es así la crea estos son básicamente sirve como para garantizar que sólo se cree el objeto una vez que se requiere eso sería necesario cuando tú tienes una creación de un objeto que consume muchos recursos para evitar que consumir esos recursos antes de necesitarlos. 

Sobre la definición de la clase `Singleton2` hay que observar que está especificando la palabra clave `seales` y lo que hace esto es prohibir que esta clase se pueda extender mediante herencia pero en el caso de la primera si se podría instancia pero pero saldría un error porque el constructor es privado. Entonces para para heredar una clase necesitarías tener un constructor público o en su defecto protegido no para que una clase pudiera derivar lo otra.

De las cosas que vemos diferentes por ejemplo en la implementación inicial si usan la instanciación perezosa y en la segunda inmediatamente inicializar inicializa en la instancia con el `new()`. Va a crea el objeto sin validar nada. 

No será la primera vez que que vaya a llamar a este objeto a la primera vez que vaya a llamar a esta clase ese objeto se va a crear y en el método simplifica porque ya no está usando la distanciación perezosa le quita esta está ahí digamos si éste está utilizando un método que regresa a un objeto del Singleton y esta es una propiedad privada las dos funcionarían pues de la misma forma y aquí como que estaría la lógica de negocio.
 
## Pruebas unitarias para el patrón Singleton

Las pruebas unitarias que tenemos para este patron de diseño son dos. La primera verifica si se crean instancias diferentes y la segunda valida si la clase tiene constructores publicos.

Lo que haces hace dos invocaciones a la propiedad estatica y las asigna un objeto del tipo Singleton posteriormente compara que estas dos sean iguales para garantizar si es el mismo objeto.

```cs
[Fact]
public void TestCreateSingleton()
{
  Singleton s = Singleton.Instance;
  Singleton s2 = Singleton.Instance;
  Assert.Equal(s, s2);
}
```

La otra prueba unitarioa que tenemos para la implementación del patrón Singleton es  la verificación de los constructores publicos. Para ello  creamos un objeto del tipo `Type` usando el operador `typeof`  especificando la clase `Singleton` y buscamos los constructores  de este objeto.

Si tenemos una variable que vamos a usar para interar sobre los constructores. Un objeto puede tener muchos constructores pero en el caso de nosotros solamente tiene uno. Lo tiene privado nos vamos a validar que cada uno de estos constructores si es público o privado en el caso de que sea público pues ahí ya va ya sabemos que va a fallar esta prueba y le ponemos el `break` en el que finalmente va a validar el estado de la variable para ver si esta clase tiene un constructor público.

```cs
[Fact]
public void TestNoPublicConstructors()
{
    Type singleton = typeof(Singleton);
    ConstructorInfo[] constructors = singleton.GetConstructors();
    bool hasPublicConstructor = false;
    foreach (ConstructorInfo c in constructors)
    {
        if (c.IsPublic)
        {
            hasPublicConstructor = true;
            break;
        }
    }
    Assert.False(hasPublicConstructor);
}
```

# Implementación Thread Safe

Una de las fallas que tienes de implementación anteriores es que es no es **Thread Safe**, es decir, que puede haber ocasiones en entornos multihilo donde está donde se rompa esta funcionalidad y se pueden crear dos objetos distintos. Esto es difícil de probar y también difícil de refutar. Acontinuacion se muestra una implementación de ejemplo que es **Thread Safe**

```cs
namespace Singleton;

public sealed class ThreadSafeSingleton
{
  
    private static volatile ThreadSafeSingleton _instance;
    private static readonly object _syncLock = new object();
    private ThreadSafeSingleton()
    {
    }
    public static ThreadSafeSingleton Instance {
        get {
            if (_instance != null) return _instance;
            lock (_syncLock) {
                if (_instance == null) {
                    _instance = new ThreadSafeSingleton();
                }
            }
            return _instance;
        }
    }
}
```

* Usa la palabra clave volátil.
* usa un doble lock para asegurarse que en un entorno multihilos no se pueden crear crear dos objetos.

La palabra clave volátil asegura que la instanciación esté completa antes de que se pueda acceder a él, lo que ayuda aún más con la seguridad de los subprocesos.
