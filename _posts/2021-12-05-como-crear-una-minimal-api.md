---
layout: post
title:  "Como crear una minimal API con .NET 6"
date:   2021-12-05 12:00:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/og-connectionstring.webp
  height: 358
  width: 683
last_modified_at: 2021-12-02 12:24:25 +0000
description: 
---


Como es costumbre desde .NET Core y ahora con .NET 6 podemos crear un proyecto de web API desde la línea de comandos o usando Visual Studio 2022. Las plantillas tienen unos pocos detalles diferentes. 

## Visual Studio 2022

Visual Studio 2022 incluye un checkbox llamado "Use Controllers (uncheck to use minimal APIS)" para definir si usa los controladores o las Minimal APIs. 

![Nuevo proyecto de Web API Visual Studio 2022 ](/img/uncheck.png)

## Linea de comandos dotnet

Vamos a usar la línea de comandos `dotnet` con el comando de `new` y vamos a especificar el template `webapi` y adicionalmente le estamos agregando la opción `menos minimal` porque por default usa controladores con la opción menos mínima de igual a true la API se crea en un solo archivo la opción -o sirve para especificar el directorio de salida. Si no existe el directorio de salida se creara.

```
dotnet new webapi -minimal true -o MinimalApi
```

Revisando el listado de archivos que trae este proyecto : nos damos cuenta que entre hay 2 archivos de appsettings, el archivo de proyecto que es el punto cs pro que el archivo de programas y yo quiero abrir el archivo de programa puede usar ahorita un editor cualquiera el en el editor de texto vamos a ver que trae todo el proyecto por default ventajas de que ya viene configurado y agregado schwager y trae un en point de prueba adicional finalmente esto lo vamos a eliminar porque pues no con nuestro proyecto pero nos puede dar una idea de cómo inicia

```cs
var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateTime.Now.AddDays(index),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
```


<div class="video-responsive">
<iframe loading="lazy" src="https://www.youtube.com/embed/oNADIPyDam8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
