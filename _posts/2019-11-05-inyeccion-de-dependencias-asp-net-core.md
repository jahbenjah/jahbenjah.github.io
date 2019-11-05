---
layout: post
title:  "Inyección de dependencias en ASP.NET Core"
date:   2019-11-05 15:03:01 +0000
permalink: /:categories/:title:output_ext
last_modified_at: 2019-11-01 12:45:00 +0000
---

La inyección de dependencias es una patrón de diseño que viene integrado en ASP.NET Core. Aquí te mostraremos algunos puntos a tener en cuenta cuando usamos este patrón.

Comencemos a decir que un proyecto de ASP.NET Core es una aplicación de consola que crea un objeto del tipo `Microsoft.Extensions.Hosting.IHost` que es el responsable de manejar los recursos de la aplicación como el contenedor de dependencias, la configuración, el registro entre otras cosas. El código responsable de crear un `IHost` en un proyecto de ASP.NET Core se encuentra en el archivo  _Program.cs_ con el llamado al método de extensión `Host.CreateDefaultBuilder(args)`

```cs
public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
```

Este mismo código esta en el template para un **Service Worker** pero me parece que es muy oscuro por lo cual antes de de revisar a detalle (cosa que aun no comprendo del todo) la inyección de dependencias en ASP.NET Core empezamos a usar el contenedor de dependencias en una aplicación de consola.

Comenzamos con una aplicación de consola e instalamos el paquete de Nuget `Microsoft.Extensions.DependencyInjection`

```bash
dotnet new console -o PruebasDI
dotnet add package Microsoft.Extensions.DependencyInjection
```

Con esto podemos crear un objeto de la clase de `ServiceCollection` y comenzar a agregar dependencias a el especificando su ciclo de vida con alguno de los métodos `AddScoped` ,`AddTransient`,,`AddSingleton` por ejemplo suponiendo que tenemos una clase llamada `HolaMundo`

```cs
ServiceCollection services = new ServiceCollection();
services.AddScoped<HolaMundo>();
services.AddTransient<HolaMundo>();
services.AddSingleton<HolaMundo>();
```

Hay varias formas de agregar dependencias a contenedor de dependencias. En la primer forma mostrada anteriormente agregamos una clase concreta. Si deseamos especificar una interfaz y su implementación usamos la

```cs
services.AddScoped<IHola, HolaMundo>();
```

Una vez que ya tienes agregas las dependencias al contenedor de dependencias podemos solicitar una dependencias a un objeto de la clase `ServiceProvider`

```cs
ServiceProvider serviceProvider = services.BuildServiceProvider();
serviceProvider.GetService<HolaMundo>();
```
