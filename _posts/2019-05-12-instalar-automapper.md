---
layout: post
title:  "Instalar AutoMapper"
date:   2019-05-12 12:00:01 +0000
categories: asp.net core
---

En este articulo te mostramos paso a paso como instalar la librería AutoMapper en un proyecto de ASP.NET Core 2.2. El propósito de esta librería es liberar al programador de escribir código para crear e inicializar objetos a partir de otros objetos. Usa el principio de convención sobre configuración por lo es muy pocas ocasiones es necesario especificar código para establecer la correspondencia entre los dos objetos.

AutoMapper es una librería de código abierto por lo que puedes ver todo el código en el repositorio en Github : [código fuente AutoMapper](https://github.com/AutoMapper/AutoMapper). En el contexto de ASP.NET Core esta librería se usa para crear objetos que se usaran en las vistas sin necesidad de tener las mismas propiedades que el objeto que guardamos en la base de datos.
Permite usar anotaciones de datos que solo son utilizadas para la vista sin tener que _ensuciar_ nuestras entidades.

1. Crea un proyecto de ASP.NET Core. Aquí tomamos como ejemplo un proyecto tipo MVC pero sirve igual para otros proyectos de ASP.NET Core.

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

<img data-src="/img/automapper.PNG" class="lazyload"  alt="Automapper en fuget.org">

3. Configurar AutoMapper en el método `ConfigureServices` de la clase `Startup.cs`. Agrega el siguiente código justo antes de `services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);`

```cs
services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
```

4. Crear una clase que herede de la clase `Profile`. Esta clases permite realizar mapeos personalizaciones a los mapeos de las clases. Y solo se necesita si se requiere personalizar el comportamiento predefinido de AutoMapper. En la primera version no la utilizaremos.

```cs
public class MyApp : Profile
{
    public MyApp()
    {
    }
}
```

5. Con esto realizado ya puedes inyectar en el constructor un objecto del tipo `IMapper` en la clase en que se utilizara AutoMapper. Esta clase puede se un servicio, un modelo o un controlador. Como ejemplo en el controlador `HomeController`.

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

6. A continuación mostramos como realizar un mapeo entre un objeto del tipo `Cliente` a un objeto `ClienteViewModel`. Aunque este lo construimos en el código puedes hacerlo mismo cuando los tras de bases de datos.

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
    // Este objeto pude venir de base de datos , un archivo , etc.
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

<img data-src="/img/AutomapperView.PNG" class="lazyload"  alt="Automapper en fuget.org">