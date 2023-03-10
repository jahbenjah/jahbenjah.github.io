---
layout: post
title:  "Delegados en  C#"
date:   2023-03-09 12:00:01 +0000
categories: csharp
last_modified_at: 2022-09-06 08:50:25 +0000
description: En C#, los delegados son un tipo de datos especiales que permiten la creación de funciones que pueden ser tratadas como variables. 
---

Introducción

En C#, los delegados son un tipo de datos especiales que permiten la creación de funciones que pueden ser tratadas como variables. Se utilizan para permitir que un método pueda ser pasado como parámetro a otro método. Los delegados son una característica importante de la programación orientada a objetos (POO) y son esenciales para el desarrollo de aplicaciones robustas y flexibles.

En este artículo, explicaremos qué son los delegados y cómo pueden ser utilizados en C#. También discutiremos algunos tipos de delegados y proporcionaremos ejemplos de cómo se pueden utilizar en diferentes situaciones.

Qué son los delegados

Un delegado es un tipo de datos que hace referencia a un método en particular. En otras palabras, un delegado es una variable que almacena un método en lugar de un valor. Los delegados se utilizan para pasar métodos como parámetros a otros métodos, lo que permite una mayor flexibilidad y modularidad en el código.

Un delegado se puede pensar como un puntero a una función en otros lenguajes de programación. Los delegados tienen un tipo de datos específico y pueden ser declarados y utilizados como cualquier otra variable. Pueden ser asignados a cualquier método que cumpla con su firma, que es el tipo de parámetro y el tipo de valor devuelto del método.

Los delegados pueden ser utilizados para crear eventos, que son notificaciones que se envían cuando una acción ocurre. Los eventos son una forma de comunicación entre dos objetos, lo que permite la ejecución de un método en un objeto cuando se produce un cambio en otro objeto.

Cómo se utilizan los delegados en C#

Para utilizar un delegado en C#, es necesario declararlo y asignarle un método que coincida con su firma. El siguiente código muestra cómo se declara un delegado y se le asigna un método:

```csharp
// Declarar el delegado
delegate int delegadoEjemplo(int x, int y);

// Asignarle un método
delegadoEjemplo métodoDelegado = Suma;
```

El método `Suma` es un método que toma dos argumentos enteros y devuelve la suma de ambos. El delegado `delegadoEjemplo` toma dos argumentos enteros y devuelve un valor entero, lo que lo hace compatible con el método `Suma`.

Una vez que se asigna un método a un delegado, se puede llamar al método utilizando el delegado, como se muestra en el siguiente código:

```csharp
// Llamar al método a través del delegado
int resultado = métodoDelegado(2, 3);
```

El resultado de la suma de 2 y 3 se almacena en la variable `resultado`. Este ejemplo muestra cómo se puede utilizar un delegado para pasar un método como parámetro a otro método.

Tipos de delegados en C#

Existen varios tipos de delegados en C#, algunos de los cuales se discuten a continuación:

1. Delegados con devolución de llamada: Estos delegados se utilizan para crear un mecanismo de devolución de llamada, donde un método se llama después de que se ha completado otro método. Este tipo de delegado se utiliza para implementar métodos asincrónicos en C#. Un ejemplo de delegado con devolución de llamada es el delegado `AsyncCallback`.

```csharp
// Delegado AsyncCallback
public delegate void AsyncCallback(IAsyncResult ar);
```

2. Delegados genéricos: Estos delegados se utilizan para crear métodos genéricos que pueden funcionar con diferentes tipos de datos. Por ejemplo, el delegado `Func<T, TResult>` toma un argumento de cualquier tipo `T` y devuelve un valor del tipo `TResult`.

```csharp
// Delegado genérico Func
public delegate TResult Func<T, TResult>(T arg);
```

3. Delegados multicast: Estos delegados pueden invocar múltiples métodos encadenados juntos. Se utilizan para crear eventos en C#. Los delegados multicast se crean utilizando el operador `+=`.

```csharp
// Delegado multicast
public delegate void DelegadoMulticast();

DelegadoMulticast miDelegado = metodo1;
miDelegado += metodo2;
```

En este ejemplo, se asignan dos métodos `metodo1` y `metodo2` al delegado `miDelegado`. Cuando se llama al delegado, se llamarán ambos métodos.

Ejemplos de uso de delegados en C#

A continuación se presentan algunos ejemplos de cómo se pueden utilizar los delegados en C#.

1. Delegado para ordenar una lista

Suponga que tiene una lista de números y desea ordenarlos en orden ascendente. En lugar de escribir su propio código de clasificación, puede utilizar el método `Sort()` de la lista y pasar un delegado que especifique cómo se deben ordenar los elementos.

```csharp
List<int> numeros = new List<int>() { 5, 2, 1, 8, 4 };

// Delegado para ordenar la lista
numeros.Sort(delegate (int x, int y) { return x.CompareTo(y); });
```

El delegado utilizado aquí toma dos argumentos `x` e `y` y devuelve el resultado de la comparación. En este caso, se utiliza el método `CompareTo()` de la clase `int` para comparar los dos valores y devolver su diferencia.

2. Delegado para filtrar elementos en una lista

Suponga que tiene una lista de personas y desea filtrar aquellos que tienen más de 30 años. Puede utilizar un delegado con el método `FindAll()` de la lista para filtrar los elementos y devolver solo aquellos que cumplen con un criterio específico.

```csharp
// Persona
public class Persona
{
    public string Nombre { get; set; }
    public int Edad { get; set; }
}

List<Persona> personas = new List<Persona>() {
  new Persona() { Nombre = "Pedro", Edad = 25},
  new Persona() { Nombre = "Ana", Edad = 35},
  new Persona() { Nombre = "Juan", Edad = 40},
};

// Delegado para filtrar personas mayores de 30 años
List<Persona> personasMayores = personas.FindAll(delegate (Persona p) { return p.Edad > 30; });
```

En este ejemplo, se utiliza el método `FindAll()` de la lista de personas y se pasa un delegado que especifica el criterio de filtrado. El delegado toma un objeto `Persona` y devuelve `true` si la edad es mayor de 30.

3. Delegado para crear un método asincrónico

Suponga que desea crear un método en su aplicación que realice una operación en segundo plano y llame a un método cuando se haya completado. Puede utilizar un delegado con el método `BeginInvoke()` para crear un método asincrónico que llame a un método cuando se haya completado.

```csharp
public delegate void FinalizacionDelegado(string resultado);

public void OperacionAsincronica(int valor, FinalizacionDelegado finalizacion)
{
    // Operación en segundo plano
    Thread.Sleep(2000);

    string resultado = $"El valor es {valor}";

    // Llamada al delegado cuando se completa la operación
    finalizacion(resultado);
}

// Llamada al método asincrónico
OperacionAsincronica( 5, delegate (string resultado) { MessageBox.Show(resultado); });
```

En este ejemplo, se crea un método `OperacionAsincronica()` que toma un valor y un delegado como parámetros. El método realiza una operación en segundo plano, espera dos segundos y luego llama al delegado con el resultado de la operación.

Conclusiones

Los delegados son una característica importante de C# que permiten la creación de métodos modularizados y flexibles. Pueden ser utilizados para crear métodos asincrónicos, eventos, filtros y más. Los delegados se asignan a métodos y se manejan como variables, lo que permite una mayor flexibilidad en el código. Con estos ejemplos, esperamos haberle proporcionado una buena comprensión de cómo se pueden utilizar los delegados en su código C#.