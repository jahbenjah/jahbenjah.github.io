---
layout: post
title:  "ASP.NET Core en NET 6 le dice Adios a la clase Startup "
date:   2022-10-19 12:00:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
---

Con la novedad de que .NET 6 le dice adiós a la clase `StartUp`. Las versiones anteriores de ASP.NET Core establecieron una convención de usar una clase llamada esta `StartUp`  que incluia dos métodos `ConfigureServices` y `Configure`. Por ejemplo un proyecto de Razor Pages incluia esto en el archivo Startup.cs:

```cs
public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddRazorPages();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapRazorPages();
        });
    }
}
```

La clase Program declaraba la dependicia con la clase Startup en el metodo main.
 tenía dos métodos que era configurar y configurar services estos métodos se utilizaban para agregar servicios al contenedor dependencias y para configurar la canalización HTTP y estos mismos servicios que se habían agregado.

```cs
public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}
```

Con .NET 6 ,que es una versión con soporte a largo plazo, todos los proyectos que vienen en la **dotnet cli** y Visual Studio 2022 ya no traen en la clase `StartUp`  por ejemplo aquí podemos ver el de web API y viene únicamente la clase Program

```CS
using ConsoleApp.PostgreSQL;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<BloggingContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("BloggingContext")));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

```
El proyecto MVC y el de Razor Pages es es la misma situación. 
Cuando nosotros vamos a revisar estos estos proyectos revisamos que ya ni siquiera entra en el método `Main` y que las dos operaciones



<div class="video-responsive">
<iframe loading="lazy" src="https://www.youtube.com/embed/_gIa4v2c5IQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
