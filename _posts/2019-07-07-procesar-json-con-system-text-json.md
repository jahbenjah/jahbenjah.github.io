---
layout: post
title:  "Procesar JSON con System.Text.Json"
categories: C#
permalink: /:categories/:title:output_ext
last_modified_at: 2020-01-31 22:10:32 +0000
description: "Serializar JSON con C# y .NET Core es cada vez más facil gracias a la nueva API: System.Text.Json"
---

Sin lugar a dudas el formato <abbr lang="en" title="Javascript Object Notation">JSON</abbr> se ha convertido en un uno de los formatos preferidos al momento de intercambiar datos entre sistemas. En el entorno de .NET la librería _de facto_ para serializar y deserializar JSON es [Json.NET](https://www.newtonsoft.com/json) superando en facilidad de uso y en velocidad incluso (50% más rápida) a las API nativas del mismo .NET Framework es decir [DataContractJsonSerializer](https://docs.microsoft.com/dotnet/api/system.runtime.serialization.json.datacontractjsonserializer?view=netframework-4.8).

Esta biblioteca ha permeado tanto el entorno de .NET que fue incluida como dependencia en el <span lang="en">[shared framework](https://natemcmaster.com/blog/2018/08/29/netcore-primitives-2/)</span> **Microsoft.AspNetCore.App** de ASP.NET Core desde un inicio y es el paquete más descargado de [Nuget.org](https://www.nuget.org/stats).

El reinado de Json.NET puede estar en riesgo la reciente liberación de la versión 3.1 .NET Core el pasado 3 de diciembre del 2019 y la inclusión <abbr lang="en" title="Application Programming Interface">API</abbr> nativa de alto desempeño [`System.Text.Json`](https://www.nuget.org/packages/System.Text.Json). Basicamente te permite serializar y deserialziar JSON sin la necesidad de instalar un paquete adicional. Ya se anuncio que no sera incluida como dependencia en ASP.NET Core 3.1.

> **Nota:** este articulo ha sido actualizado para funcionar con la versión más actual de .NET Core 3.1 y que ha sido marcada como una versión con soporte a largo plazo, es decir, 3 años a partir de la fecha de liberación.

Si tienes un proyecto con .NET Core 3.1 solo es necesario [importar los espacios de nombres con la instrucción `using`]({% post_url 2019-01-03-cuatro-formas-de-usar-la-palabra-clave-using-de-csharp %})) correspondientes para hacer uso de esta API:

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;
```

Si deseas usar e .NET Framework 4.6.1 o superior necesitas instalar el paquete de Nuget : [System.Text.Json](https://www.nuget.org/packages/System.Text.Json) .Para más detalles de como controlar los paquetes de Nuget puede ver [Controlando los paquetes de Nuget]({% post_url 2019-07-27-controlando-paquetes-nuget %})

Para nuestro ejemplo asumimos que tenemos la clase `Producto` definida por la siguientes propiedades:

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

Adicionalmente creamos 2 métodos estáticos, el primero regresa una instancia de la clase `Producto` producto y el segundo regresa una cadena *JSON* que representa un objecto producto.

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

Aunque en la vida real estos objetos se pueden obtener de una base de datos, un servicio web o un archivo de texto.

## Serialización con *System.Text.Json*

El proceso de convertir un objeto de C# en una cadena JSON se conoce como serialización. Esta tarea se realiza utilizando la clase `` el método estatico de `Serialize` y sus sobrecargas. Existen versiones sincronas y asincronas

<img data-src="/img/json.webp" class="lazyload"  alt="Metadatos de la la clase JsonSerializer de System.Text.Json"> 

En su forma genérica requiere especificar el tipo a convertir y el una instancia del objeto a convertir a JSON. Es importante notar que el método `Serialize` usa un parámetro opcional del tipo `JSerializerOptions` que si no lo especificas lo será una referencia `null`.

```csharp
Producto producto = ObtenerProducto();
var cadenaJson = JsonSerializer.Serialize<Producto>(producto);
Console.WriteLine(cadenaJson);
```

El resultado de código anterior es una cadena JSON minificada de forma predeterminada.

```json
{"Id":1,"Nombre":"Fundamentos de ASP.NET Core","Categorias":["Libros","Programaci\u00F3n"],"Precio":198.50}
```  

Adicionalmete puedes agregar un objeto del tipo `JsonSerializerOptions` que controla el comportamiento de la serialización por ejemplo.

```cs
JsonSerializerOptions options = new JsonSerializerOptions();
options.WriteIndented = true;
options.IgnoreNullValues = true;
options.PropertyNameCaseInsensitive = true;
options.AllowTrailingCommas = true;

var json2 = JsonSerializer.Serialize<Producto>(producto,options);
Console.WriteLine(json2);
```

## Deserializar un objecto con *System.Text.Json*

Para deserializar se usa el método `Deserialize` y sus sobrecargas. Igualmente este método acepta un objeto `JsonSerializerOptions` para cambiar el comportamiento de la serialización.

```csharp
string cadena = ObtenerProductoJson();
Producto producto2 = JsonSerializer.Deserialize<Producto>(cadena);
Console.WriteLine(producto2.Nombre);
```

# Usando *System.Text.Json* con en la vida real

Los ejemplos anteriores aunque son ilustrativos y tienen como proposito mostrar como funciona el API estan muy alejados de la la vida real por lo que he decidido agregar un ejemplo para un poco más real. Obtendremos los datos de un perfil de de la API de Github que regresa JSON y lo convertiremos a un objeto C#. Para ello necesitamos invocar a la _url_ `https://api.github.com/users/jahbenjah` donde *jahbenjah* es mi nombre de usuario.

Lo primero que necesitamos hacer es crearu una clase de C# donde almacenaremos las propiedades que requerimos del objeto json que devuelve el API como proposito de ejemplo solo copiamos el JSON del API y usamos la característica _Editar>Pegado Especial>Pegar JSON como clases_ de Visual Studio para crear la clase `GithubUser`

```cs
public class GithubUser
{
    public string login { get; set; }
    public int id { get; set; }
    public string node_id { get; set; }
    public string avatar_url { get; set; }
    public string gravatar_id { get; set; }
    public string url { get; set; }
    public string html_url { get; set; }
    public string followers_url { get; set; }
    public string following_url { get; set; }
    public string gists_url { get; set; }
    public string starred_url { get; set; }
    public string subscriptions_url { get; set; }
    public string organizations_url { get; set; }
    public string repos_url { get; set; }
    public string events_url { get; set; }
    public string received_events_url { get; set; }
    public string type { get; set; }
    public bool site_admin { get; set; }
    public string name { get; set; }
    public object company { get; set; }
    public string blog { get; set; }
    public string location { get; set; }
    public object email { get; set; }
    public bool hireable { get; set; }
    public object bio { get; set; }
    public int public_repos { get; set; }
    public int public_gists { get; set; }
    public int followers { get; set; }
    public int following { get; set; }
    public DateTime created_at { get; set; }
    public DateTime updated_at { get; set; }
}
```

Finalmente configuramos un cliente HTTP para poder comunicarnos con la API de Github. Observa que requiere especificar un agente de usuario ya que si no lo usas te regresa el error 403.

```cs
static async Task Main(string[] args)
{
    HttpClient cliente = new HttpClient();
    cliente.DefaultRequestHeaders.Add("User-Agent""aspnetcoremaster.com");
    cliente.BaseAddress = new Uri("https://api.github.com");
    var jsonUser = await cliente.GetStringAsync("/users/jahbenjah")
    
    GithubUser jahbenjah = JsonSerializer.Deserialize<GithubUse(jsonUser);
    
    Console.WriteLine("**************Datos deusuario**********************");
    Console.WriteLine($"Nombre: {jahbenjah.name}");
    Console.WriteLine($"Blog: {jahbenjah.blog}");
    Console.WriteLine($"País: {jahbenjah.location}");
}
```

# Para llevar

Es interesante ver la discusión entorno a al futuro de JSON en el entorno .NET y como puede cambiar la API de `System.Text.Json` de acuerdo a los estudios de usabilidad realizados.

* [The future of JSON in .NET Core 3.0](https://github.com/dotnet/corefx/issues/33115)

* [Try the new System.Text.Json APIs](https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/)

* [System.Text.Json usability study results](https://github.com/dotnet/announcements/issues/117)