---
layout: post
title:  "Archivo appsettings.json ASP.NET Core"
date:   2019-04-07 12:00:01 +0000
categories: asp.net core
last_modified_at: 2020-06-15 10:55:52 +0000
description: "El archivo de configuración de .NET Core es donde se deben colocar los valores que pueden cambiar en una aplicación."
---

En este post te mostrare como leer el archivo de configuración _appsettings.json_ en una aplicación de consola usando .NET Core y una aplicación web ASP.NET Core. El archivo _appsetting.json_ se incluye por default en los proyectos web pero puede ser agregado fácilmente en los proyectos de bibliotecas de clases y aplicaciones de consola por lo que también te mostrare a agregar los paquetes de Nuget necesarios para esto.

Uno de los [12 factores](https://12factor.net/es/config) de aplicaciones nativas de la nube establece que, se debe almacenar la configuración y ajustes de la aplicación fuera del código.

Generalmente se coloca en este archivo valores que pueden cambiar entre desarrollo y producción como son cadenas de conexión, configuración del nivel de Log, contraseñas de correos, clave para usar una API , licencias o algún otro valor necesario para controlar el comportamiento de la aplicación o una regla de negocio. Tener la configuración de tu aplicación en archivos externos te da la posibilidad de hacer cambios sin necesidad de volver a compilar la aplicación.

Si tienes experiencia con alguna versión anterior de ASP.NET es importante mencionar que anteriormente se usaba el archivo _WebConfig.xml_ por lo que si estas en el proceso de migración a .NET Core tus parámetros en este archivo deberán colocarse en el _appsettings_.json_. La configuración en las aplicaciones ASP.NET sobre el .NET Framework, estaba basada unicamente en un archivo XML de gran tamaño pero en ASP.NET Core esto ha cambiado y tienes la posibilidad de agregar más fuentes de configuración.

> **Nota de seguridad** Generalmente es considerado una mala practica incluir información sensible como contraseñas en el archivo de configuración y colocarlas bajo control de código fuente. Se sugiere usar variables de entorno o un administrador de secretos.

El sistema de configuración de ASP.NET Core es un sistema de capas en el que puedes agregar diferentes fuentes de configuración en el cual el orden importa ya que si dos fuentes contienen la misma clave esta sera tomada de la ultima fuente agregada.

## Configuración en una aplicación .NET Core

Para agregar un archivo de configuración a un aplicación .NET Core es necesario agregar unos paquetes de Nuget adicionales. El primer paquete necesario es `Microsoft.Extensions.Configuration`. Este paquete contiene los tipos `IConfiguration` y `ConfigurationBuilder` necesarios para manejar configurar y leer la configuración. El primero es una interfaz que se usa para  leer la configuración basada en claves y valores cuenta con Index que regresa unicamente cadenas de texto. El segundo es una clase que implementa el **patrón de diseño Builder** con tiene un método `Add` para agregar proveedores de configuración y un método `Build` para generar el objeto con todas las opciones.

Para el caso particular configuración basada en archivos <abbr lang="en" title="Javascript Object Notation">JSON</abbr> se requiere el paquete `Microsoft.Extensions.Configuration.Json` que incluye los métodos de extensión de la clase `ConfigurationBuilder` : `AddJsonFile` y `AddJsonStream` para agregar archivos JSON a la configuración al _ConfigurationBuilder_.

A continuación veamos un ejemplo con una aplicación de consola.

1. Crea una aplicación de consola con el comando `dotnet new console -n LeerConfiguracion` y abre el directorio _cd LeerConfiguracion_
2. Agrega los paquetes siguientes paquete de Nuget:

```console
dotnet add package Microsoft.Extensions.Configuration
dotnet add package Microsoft.Extensions.Configuration.Json
``

3. Crea un archivo JSON para contener tu configuración puede contener cualquier nombre pero por simplicidad lo llamamos _appsetting.json_.

```json
{
  "llave1": "Este es el valor de la llave 1",
  "llave2": 2,
  "licencia": "ABDD-DGFH-REZG-GDDF-GGTJ",
  "api": "6437495o0503023o343443443455",
  "Condicion": true
}
```

4. Edita el archivo del proyecto para que al compilar el proyecto _LeerConfiguracion.xml_ para especificar que el archivo json debe copiarse al al directorio de salida.

```xml
<ItemGroup>
    <None Update="appsettings.json">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </None>
</ItemGroup>
```

Con esto ya podemos leer datos del archivo de configuración por ejemplo en el método `Main` podemos ejecutar el siguiente código para obtener los datos contenidos como texto. Observa que hemos agregado dos archivos de configuración pero puedes agregar los que necesites. También observa que estamos usando un [indexer](https://docs.microsoft.com/dotnet/csharp/programming-guide/indexers/) para extraer la información

```cs
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace LeerConfiguracion
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = new ConfigurationBuilder()
              .SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
              .AddJsonFile("archivodos.json", optional: true, reloadOnChange: true);
            IConfiguration configuration = builder.Build();
            
            string llave1 = configuration["llave1"];
            string llave2 = configuration["llave2"];
            string licencia = configuration["licencia"];
            string api = configuration["api"];
            string condicion = configuration["condicion"];
            
            Console.WriteLine(llave1);
            Console.WriteLine(llave2);
            Console.WriteLine(licencia);
            Console.WriteLine(api);
            Console.WriteLine(condicion);
            Console.WriteLine(configuration["archivo"]);
        }
    }
}
```

Si requieres convertir estas cadenas de texto en otros tipos de datos puedes usar el paquete de Nuget `Microsoft.Extensions.Configuration.Binder` que incluye métodos de extensión que permiten convertir los valores de la configuración en otros tipos de datos. Y podrías usar un el siguiente código para leer información:

```cs
bool cond = configuration.GetValue<bool>("condicion");
int llave = configuration.GetValue<int>("llave2");
```

## Configuración en una aplicación web ASP.NET Core

El soporte para poder manejar este archivo configuración se agrega en el archivo _Program.cs_ con una llamada al método estático `CreateDefaultBuilder` de la clase `WebHost`, es decir, `WebHost.CreateDefaultBuilder(args)`.

Pero ¿cómo sabemos que hace este método si pertenece a ASP.NET Core ?. La respuesta es muy sencilla ya que ASP.NET Core es *Open Source* y podemos usa revisar el código de cada uno de los métodos en el [repositorio de ASP.NET Core en Github](https://github.com/aspnet/AspNetCore). Navegar por el código puede ser difícil porque es un proyecto muy grande por lo que he pensado que seria bueno preparar una guía pero por ahora solo basta decir que la la clase `WebHost` se encuentra [aquí](https://github.com/aspnet/AspNetCore/blob/master/src/DefaultBuilder/src/WebHost.cs) y que las lineas relacionadas con el el archivo `appsetting.json` son:

```cs
config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
      .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);
```

Básicamente agrega la posibilidad de usar dos variantes del archivo de configuración JSON la primera es *appsetting.json* y la segunda puede finalizar con el entorno por ejemplo *appsetting.Production.json*  o appsetting.Development.json. Con esto puedes generar una sola vez los archivos para publicar tú publicación y almacenar por separado la configuración de los diferentes entornos o  clientes.

> **Opinión personal :** A mi gusto deberíamos tener la capacidad de ver los detalles del código de proyectos _open source_ desde Visual Studio o VS Code similar cómo según recuerdo Eclipse te permite agregar el código fuente de Java y navegar en el cuando fuese necesario. Las características **Ir a la definición F12** y **Ver la definición Alt + F12** muestra unicamente los metadatos de las clases que dan alguna idea pero no el detalle.

### Leer el archivo appsettings.json en la clase Startup

Este código es incluido en la plantilla y muestra los pasos necesario para usar la configuración en las diferentes secciones del proyecto. Se usa la inyección de dependencias para leer este archivo.

Primero se declara un parámetro de tipo `IConfiguration` en el constructor de la clase `Startup` y se asigna una propiedad de solo lectura llamada `Configuration` del espacio de nombres `Microsoft.Extensions.Configuration`.

```cs
public IConfiguration Configuration { get; }
public Startup(IConfiguration configuration)
{
  Configuration = configuration;
}
```

Con este código el contenedor de dependencias de ASP.NET Core se encargara de construir e inyectar un objeto de tipo `IConfiguration` cada que se utilice la clase `Startup`. Esto nos libera de tener que crear una instancia de este objeto . Solo con esto ya podemos leer el contenido del archivo `appsetting.json`.

Es muy común que las cadenas de conexión se guarden en el archivo _appsettings.json_ ,dentro de un objeto JSON llamado **ConnectionStrings** puede contener más de una cadena de conexión.
En el método `ConfigureServices` nos brinda nuestro primer ejemplo como leer una cadena de conexión Configuration.`GetConnectionString("DefaultConnection")`: desde el archivo _appsettings.json_. [Para más detalle de como crear cadenas de conexión con C# revisa este artículo]({% post_url 2019-02-27-cadenas-de-conexion-csharp %}).

```cs
services.AddDbContext<ApplicationDbContext>(options =>
         options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
```

El método de extensión `GetConnectionString` requiere una clave para buscar en en el objeto JSON *ConnectionStrings*. y devuelve una cadena.

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=LeerAppSettings;Trusted_Connection=True;MultipleActiveResultSets=true",
  "OtraBase": "Server=server2;Database=Base;Trusted_Connection=True;MultipleActiveResultSets=true"
}
```

Adicionalmente agregamos mas parámetros como ejemplo.

```json
"Entero": 10,
"Boleano": true,
"Titulo": "Titulo desde appsettings",
```

### Leer el archivo appsettings.json en un controlador

Para leer los datos del archivo appsettings.json en un controlador agregamos una dependencias del tipo `IConfiguration` en el constructor y la asignamos a un campo privado de solo lectura llamado `_configuration`.

```cs
private readonly IConfiguration _configuration;

public HomeController(IConfiguration configuration)
{
    _configuration = configuration;
}
```

Crearemos un modelo básico para mostrar en la vista `Index`. Agrega una clase a la carpeta *Models* con el siguiente código.

```cs
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace LeerAppSettings.Models
{
  public class IndexViewModel
  {
    public string Titulo { get; set; }
    public bool Boleano { get; set; }
    public int Numero { get; set; }
    public List<SelectListItem> Cadenas { get; set; }
  }
}
```

Con esto construiremos un objecto al cual asignaremos los valores  del archivo de configuración.

```cs
public IActionResult Index()
{
  var model = new IndexViewModel();
  model.Numero = _configuration.GetValue<int>("Entero");
  model.Boleano = _configuration.GetValue<bool>("Boleano");
  model.Titulo = _configuration.GetValue<string>("Titulo");
  
  model.Cadenas = _configuration.GetSection("ConnectionStrings")
       .GetChildren()
       .AsEnumerable()
       .Select(c => new SelectListItem() { Value = c.Key, Text = c.Value })
       .ToList();

  return View(model);
}
```

Finalmente regresaremos la vista debe tener el siguiente código para mostrar estos valores

```html
@model LeerAppSettings.Models.IndexViewModel

@{
    ViewData["Title"] = "Home Page";
}
<h1 class="display-4">@Model.Titulo</h1>

<div class="row">
    <label asp-for="@Model.Cadenas"></label>
    <select asp-items="@Model.Cadenas"></select>
</div>

<div class="row">
    <label asp-for="@Model.Numero"></label>
    <input asp-for="@Model.Numero" />
</div>

<div class="row">
    <label asp-for="@Model.Boleano"></label>
    <input asp-for="@Model.Boleano" />
</div>

```

<img src="/img/LeerAppsettings.webp" loading="lazy"  alt="Vista que muestra los valores del archivo appssetting.json">

## Conclusión

Como hemos visto se pueden agregar múltiples archivos de configuración a una aplicación. El equipo de ASP.NET Core decidió llamar a est archivo **appsetings** pero en la puede tomar cualquier otro nombre. Otra cosa que no he encontrado hasta ahora es algún método para editar de forma programática el archivo appsetting. Por el momento creo que esta pensado para ser de solo lectura. Por lo que si requiere cambios constantes para tus valores de configuración deberías pensar en otra opción.
