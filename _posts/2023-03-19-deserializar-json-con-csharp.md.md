---
layout: post
title:  "Enviar un correo con C# y Gmail."
categories: .net smtp SmptClient dotnet 
last_modified_at: 2019 - 12 - 11 14:45:55 + 0000
---

En la actualidad, las aplicaciones web y móviles están diseñadas para ser altamente interactivas y responsivas. Una de las formas más comunes de transferir datos en estas aplicaciones es mediante el formato JSON (JavaScript Object Notation). JSON es un formato de intercambio de datos ligero y fácil de leer, que ha ganado popularidad en los últimos años.

En las aplicaciones creadas con C#, podemos utilizar el espacio de nombres `System.Text.Json` del .NET Core para serializar y deserializar objetos JSON. En este artículo, exploraremos cómo deserializar JSON con C# usando el espacio de nombres `System.Text.Json`.

¿Qué es `System.Text.Json`?

`System.Text.Json` es un espacio de nombres que se introdujo en .NET Core 3.0 y se utiliza para serializar y deserializar objetos JSON. Es una alternativa ligera y de alto rendimiento a la biblioteca `Newtonsoft.Json` que se ha utilizado durante mucho tiempo para el mismo propósito.

`System.Text.Json` está integrado en el .NET Core y se puede utilizar sin tener que agregar ninguna biblioteca o paquete adicional. Esto significa que las aplicaciones creadas con .NET Core pueden ser más ligeras y tener un mejor rendimie

## Cómo deserializar JSON con `System.Text.Json`

Para deserializar un objeto JSON con System.Text.Json, debemos seguir los siguientes pasos:

1. Definir una clase C# que tenga las mismas propiedades que el JSON. Por ejemplo, si tenemos el siguiente JSON:

```json
{"name": "John", "age": 30, "city": "New York"}
```

Podemos definir una clase C# como la siguiente:

```cs
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string City { get; set; }
}
```

2. Usar el método `Deserialize<T>` de la clase `JsonSerializer` de `System.Text.Json` para deserializar el JSON en un objeto C#. Por ejemplo:

```cs
string jsonString = "{\"name\": \"John\", \"age\": 30, \"city\": \"New York\"}";
Person person = JsonSerializer.Deserialize<Person>(jsonString);
```

En este ejemplo, hemos utilizado el método `Deserialize<T>` de la clase JsonSerializer para deserializar el JSON en un objeto de tipo `Person`.

3. Utilizar el objeto deserializado según sea necesario. Por ejemplo, podemos imprimir las propiedades del objeto de la siguiente manera:

```cs
Console.WriteLine("Name: {0}", person.Name);
Console.WriteLine("Age: {0}", person.Age);
Console.WriteLine("City: {0}", person.City);
```

En resumen, deserializar JSON con C# usando el espacio de nombres System.Text.Json es muy fácil y sencillo. Solo necesitamos definir una clase C# que tenga las mismas propiedades que el JSON, luego utilizar el método `Deserialize<T>` de la clase `JsonSerializer` para deserializar el JSON. Una vez que se ha deserializado el JSON, podemos usar el objeto resultante según sea necesario para realizar las operaciones necesarias.
