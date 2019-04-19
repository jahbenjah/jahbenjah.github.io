---
layout: post
title:  "Archivo appsettings.json ASP.NET Core"
date:   2019-04-07 12:00:01 +0000
categories: asp.net core
---

En este post te mostrare como como leer los datos contenidos en el archivo de configuración de una aplicación ASP.NET Core  incluido en el proyecto por *MVC con autenticación de cuentas individuales*. *appsettings.json*. El soporte para poder manejar este archivo configuración se agrega en el archivo _Program.cs_ con una llamada al método estático `CreateDefaultBuilder` de la clase `WebHost`, es decir, `WebHost.CreateDefaultBuilder(args)`. 

Pero ¿cómo sabemos que hace este método si pertenece a ASP.NET Core ?. La respuesta es muy sencilla ya que ASP.NET Core es *open source* y podemos usa revisar el código de cada uno de los métodos en el [repositorio de ASP.NET Core en Github](https://github.com/aspnet/AspNetCore). Navegar por el código puede ser difícil porque es un proyecto muy grande por lo que he pensado que seria bueno preparar una guía pero por ahora solo basta decir que la la clase `WebHost` se encuentra [aquí](https://github.com/aspnet/AspNetCore/blob/master/src/DefaultBuilder/src/WebHost.cs) y que las lineas relacionadas con el el archivo `appsetting.json` son:

```cs
config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
      .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);
```

Básicamente agrega la posibilidad de usar dos variantes del archivo de configuración json la primera es *appsetting.json* y la segunda puede finalizar con el entorno por ejemplo *appsetting.Production.json*.

> **Opinión personal :** A mi gusto deberíamos tener la capacidad de ver los detalles del código de proyectos _open source_ desde Visual Studio o VS Code similar cómo según recuerdo Eclipse te permite agregar el código fuente de Java y navegar en el cuando fuese necesario. Las características **Ir a la definición F12** y **Ver la definición Alt + F12** muestran unicamente los metadatos de las clases que dan alguna idea pero no el detalle.

# Leer el archivo appsettings.jsonn en la clase Startup

Este codigo es proporcionado por el ejemplo y muestra los pasos nececeario para usar la configuracion en las diferentes secciones del proyecto. Se usa la inyeccion de dependencias para leer este archivo

Primero se declara un parámetro de tipo `IConfiguration` en el constructor de la clase Startup y se asigna una propiedad de solo lectura llamada `Configuration` del espacio de nombres `Microsoft.Extensions.Configuration`.

```cs
public IConfiguration Configuration { get; }
public Startup(IConfiguration configuration)
{
  Configuration = configuration;
}
```

Con este código el contenedor de dependencias de ASP.NET Core se encargara de construir e inyectar un objeto de tipo IConfiguration cada que se utilice la clase Startup. Esto nos libera de tener que crear una instancia nosotros mismo de este objeto. Solo con esto ya podemos utilizar el archivo `appsetting.json` y el método `ConfigureServices` nos brinda nuestro primer ejemplo como leer una cadena de conexión `Configuration.GetConnectionString("DefaultConnection")`:

```cs
services.AddDbContext<ApplicationDbContext>(options =>
         options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
```
El método de extensión `GetConnectionString` requiere una clave para buscar en en el objeto JSON *ConnectionStrings*. y devuelve una cadena.

Si deseas agregar más de una cadena de conexión puedes usar el mismo patrón para traerla. adicionalente agregamos mas parámetros como ejemplo.

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=LeerAppSettings;Trusted_Connection=True;MultipleActiveResultSets=true",
  "OtraBase": "Server=server2;Database=Base;Trusted_Connection=True;MultipleActiveResultSets=true"
},
"Entero": 10,
"Boleano": true,
"Titulo": "Titulo desde appsettings",
```

# Leer el archivo appsettings.json en un controlador

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

Finalmente regresaremos la vista debe tener el siguiente codigo para mostrar estos valores

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

<img data-src="/img/LeerAppsettings.PNG" class="lazyload"  alt="Vista que muestra los valores del archivo appssetting.json">