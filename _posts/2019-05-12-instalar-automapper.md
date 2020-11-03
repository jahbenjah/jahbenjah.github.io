---
layout: post
title:  "Instalar AutoMapper"
date:   2019-05-12 12:00:01 +0000
categories: asp.net core
image:
  path: /img/automapper.webp
  height: 224
  width: 427
description: "Como instalar AutoMapper en una aplicación ASP.NET Core"
---

En este articulo te mostramos paso a paso como instalar la librería AutoMapper en un proyecto de ASP.NET Core 3.1 pero funciona de la misma forma en versiones anteriores. El propósito de esta librería es liberar al programador de escribir código para crear e inicializar objetos a partir de otros objetos. Usa el principio de convención sobre configuración por lo en muy pocas ocasiones es necesario especificar código para establecer la correspondencia entre los dos objetos.

AutoMapper es una librería de código abierto por lo que puedes ver todo el código en el repositorio en Github : [código fuente AutoMapper](https://github.com/AutoMapper/AutoMapper). En el contexto de ASP.NET Core esta librería se usa para crear objetos que se usaran en las vistas sin necesidad de tener las mismas propiedades que el objeto que guardamos en la base de datos. AutoMapper es mantenido por [Jimmy Bogard](https://jimmybogard.com/)
Permite usar anotaciones de datos que solo son utilizadas para la vista sin tener que _ensuciar_ nuestras entidades.

1. Crea un proyecto de ASP.NET Core. Aquí tomamos como ejemplo un proyecto tipo MVC pero sirve igual para [otros proyectos]({% post_url 2019-02-09-tipos-de-proyectos %}) de ASP.NET Core.

```bash
dotnet new mvc -o InstalarAutoMapper
```

Posteriormente abre la carpeta del proyecto con `cd InstalarAutoMapper`

2. Instala los paquetes de Nuget [AutoMapper](https://www.nuget.org/packages/AutoMapper/) y [AutoMapper.Extensions.Microsoft.DependencyInjection](https://www.nuget.org/packages/AutoMapper.Extensions.Microsoft.DependencyInjection/)

```bash
dotnet add package AutoMapper
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
```

> **Tip :** Puedes explorar los detalles de cualquier paquete de Nuget usando el sitio [fuget.org](https://www.fuget.org/) solo cambia la _n_ en la url del paquete de Nuget. Por ejemplo la url  Nuget de automaper es https://www.nuget.org/packages/AutoMapper y la de fuget.org es :https://www.fuget.org/packages/AutoMapper

<img src="/img/automapper.webp" loading="lazy"  alt="Automapper en fuget.org">

3. Configurar AutoMapper en el método `ConfigureServices` de la clase `Startup.cs`. Agrega el siguiente código justo antes de `services.AddControllersWithViews();` para las versión 3.1 y para las versiones anteriores el código es parecido al siguiente `services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);`. Recurerda que debes agregar la instrucción `using AutoMapper;` al principio del archivo. 

```cs
services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
```

4. Si requieres crear mapeos personalizados crea una clase que herede de la clase `Profile`. E Esto solo se necesita caundo se va personalizar el comportamiento predefinido de AutoMapper, por ejemplo, cuando los objetos no tienen las mismas propiedades i requieres hacer un transformación como concatener el nombre y apeilldo de una persona.

```cs
public class MyApp : Profile
{
    public MyApp()
    {
    }
}
```

5. Con esto realizado ya puedes usar AutoMapper con [la inyeccion de dependencias]({% post_url 2019-11-05-inyeccion-de-dependencias-asp-net-core %}) integrada de .NET Core. 
En el constructor un objecto del tipo `IMapper` en la clase en que se utilizara AutoMapper. Esta clase puede ser un servicio, un modelo o un controlador. Como ejemplo en el controlador `HomeController`.

```cs
public class HomeController : Controller
{
    private readonly IMapper _mapper;

    public HomeController(IMapper mapper)
    {
        _mapper = mapper;
    }
//...
}
```

6. A continuación mostramos como realizar un mapeo entre un objeto del tipo `Cliente` a un objeto `ClienteViewModel`. Aunque este lo construimos en el código puedes hacerlo mismo cuando los los objetos vienen de la base de datos.

```cs
public class Cliente
{
    public string Nombre { get; set; }
    public string ApellidoPaterno { get; set; }
    public string ApellidoMaterno { get; set; }
    public DateTime FechaRegistro { get; set; }
    public bool Activo { get; set; }
}

public class ClienteViewModel
{
    public string Nombre { get; set; }
    public string ApellidoPaterno { get; set; }
}
```

7. Usamos el método `TDestination Map<TDestination>(object source)` de la propiedad de solo lectura en llamada `_mapper` en el controlador `Home`.

```cs
 public IActionResult Index()
 {
    // Este objeto pude venir de base de datos , un archivo ,  un servicio web , etc.
    var cliente = new Cliente();
    cliente.Nombre = "Benjamin";
    cliente.ApellidoPaterno = "Camacho";
    cliente.ApellidoMaterno = "Castro";
    cliente.FechaRegistro = DateTime.Now;
    cliente.Activo  = true;

    var model = _mapper.Map<ClienteViewModel>(cliente);
    return View(model);
}
```

8. Finalmente la vista `Index` usa el modelo proporcionado para generarse.

```html
@model InstalarAutomapper.Models.ClienteViewModel
@{
    ViewData["Title"] = "Inicio";
}
<div class="text-center">
    <h1 class="display-4">Bienvenido : @Model.Nombre</h1>
</div>
<p>Estimado @Model.Nombre @Model.ApellidoPaterno le escribimos para ...</p>
```

<img src="/img/AutomapperView.webp" loading="lazy"  alt="Automapper en fuget.org">