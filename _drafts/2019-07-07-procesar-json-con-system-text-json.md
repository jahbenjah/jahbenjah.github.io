---
layout: post
title:  "Procesar JSON con System.Text.Json"
comments: true
categories: C#
permalink: /:categories/:title:output_ext
---

Sin lugar a dudas el formato JSON se ha convertido en un uno de los formatos preferidos al momento de intercambiar datos entre sistemas. En el entorno de .NET la librería _de facto_ para serializar y deserializar JSON es [Json.NET](https://www.newtonsoft.com/json) superando en facilidad de uso y en velocidad incluso (50% más rápida) a las API nativas del mismo .NET Framework es decir [DataContractJsonSerializer](https://docs.microsoft.com/dotnet/api/system.runtime.serialization.json.datacontractjsonserializer?view=netframework-4.8).

Esta biblioteca ha permeado tanto el entorno de .NET que fue incluida como dependencia en el <span lang="en">[shared framework](https://natemcmaster.com/blog/2018/08/29/netcore-primitives-2/)</span> **Microsoft.AspNetCore.App** de ASP.NET Core desde un inicio y es el paquete más descargado de [Nuget.org](https://www.nuget.org/stats).

El reinado de Json.NET puede estar en riesgo con .NET Core 3.0 y la API nativa [`System.Text.Json`](https://www.nuget.org/packages/System.Text.Json) que aun esta en version preliminar pero que promete tener un alto desempeño y sin la necesidad de instalar un paquete adicional. Ya se anuncio que no sera incluida como dependencia en ASP.NET Core 3.0.

> **Nota:** este articulo usa la versión preeliminar de .NET Core 3.0 *3.0.100-preview6-012264* . Es posible que los nombres de algunos de los métodos de la librería puede cambiar.

Si tienes la version preeliminar de .NET Core 3.0 solo es necesario importar los espacios de nombres :

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;
```

Si deseas probarlo con e .NET Framework 4.6.1 o superior necesitas instalar el paquete de Nuget : [System.Text.Json](https://www.nuget.org/packages/System.Text.Json)

Asumimos que tenemos la clase producto definida por la siguientes propiedades:

```csharp
using System.Collections.Generic;

namespace ProcesarJson
{
    public class Producto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public List<string> Categorias { get; set; }
        public decimal Precio { get; set; }
    }
}
```

Tenemos 2 métodos estáticos el primero regresa una instancia de la clase `Producto` producto y el segundo regresa una cadena *JSON* que representa un objecto producto.

```csharp
private static Producto ObtenerProducto()
{
    Producto p = new Producto();
    p.Id = 1;
    p.Nombre = "Fundamentos de ASP.NET Core";
    p.Categorias = new List<string>() { "Libros", "Programación" };
    p.Precio = 198.50m;
    return p;
}

private static string ObtenerProductoJson()
{
    return @"{
        ""Id"": 100,
        ""Nombre"": ""ASP.NET Core Fundamentals"",
        ""Precio"": 10.50,
        ""Categorias"": [
            ""Libros"",
            ""Programación"",+
            ""Ingles""
            ]
        }";
}

```

Aunque en la vida real estos objetos se pueden obtener de una base de datos, un servicio o un archivo de texto.

## Serialización con `System.Text.Json`

El proceso de convertir un objeto de C# en una cadena JSON se conoce como serialización. Esta tarea se realiza con el método `ToString` y sus sobrecargas.

<img data-src="/img/json.jpg" class="lazyload"  alt="F12 en Visual Studio Code"> 

En su forma genérica requiere especificar el tipo a convertir y  el  una instancia del objeto a convertir a JSON. Adicionalmete puedes agregar un objeto del tipo `JsonSerializerOptions` que controla el comportamiento de la serialización.

```csharp
Producto producto = ObtenerProducto();
Console.WriteLine(JsonSerializer.ToString<Producto>(producto));
```

El resultado de código anterior es una cadena JSON minificada de forma predeterminada.

```json
{"Id":1,"Nombre":"Fundamentos de ASP.NET Core","Categorias":["Libros","Programaci\u00f3n"],"Precio":198.50}
```  

## Deserializar un objecto con `System.Text.Json`

Para deserializar se usa el método `Parse` y sus sobrecargas. Igualmente este método acepta un objeto `JsonSerializerOptions` para cambiar el comportamiento de la serialización.

```csharp
string cadena = ObtenerProductoJson();
Producto producto2 = JsonSerializer.Parse<Producto>(cadena);
Console.WriteLine(producto2.Nombre);
```


# Para llevar

Es interesante ver la discusión entorno a al futuro de JSON en el entorno .NET y como puede cambiar la API de `System.Text.Json` de acuerdo a los estudios de usabilidad realizados.

* [The future of JSON in .NET Core 3.0](https://github.com/dotnet/corefx/issues/33115)

* [Try the new System.Text.Json APIs](https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/)

* [System.Text.Json usability study results](https://github.com/dotnet/announcements/issues/117)