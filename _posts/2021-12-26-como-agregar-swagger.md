---
layout: post
title:  "Como agregar Swagger a una Web API de ASP.NET Core con Angular"
date:   2021-12-26 7:00:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
---

Hola qué tal en este articulo agregaremos el soporte a OpenAPI Specification o Swagger a nuestro proyecto de ASP.NET Core con Angular. Por default en la plantilla de Web API ya se incluye Swagger pero no en la plantilla para una aplicación de una sola página o SPA con Angular. Dicen los que saben que el nombre oficial es OpenAPI Specification nosotros lo conocemos más vulgarmente como Swagger. Lo agregaremos desde la línea de comandos. Empezamos a crear un nuevo proyecto con las plantilla de ASP.NET Core con Angular:

```bash
dotnet new angular -o MiAngular
```

Lo que hay que hacer para agregar OpenAPI Specification o Swagger es instalar un paquete de Nuget y configurar el Pipeline. Hay varios paquetes de Nuget que incluyen este soporte pero en este caso lo vamos a instalar este paquete que se llama `Swashbuckle.AspNetCore`. Este nos permite tener un EndPoint (`/swagger`) centralizado donde expone la documentación de todos los métodos que tiene nuestro proyecto.  

Para instalar el paquete de Nuget para el soporte a Swagger usa el siguiente comando:

```dos
dotnet add package Swashbuckle.AspNetCore
```

Si no especificas una versión para el paquete de Nuget el comando toma la última versión liberada que está disponible en el repositorio de paquetes para .NET. Lo que hace cuando te agregas un paquete de Nuget es editar el archivo de proyecto asi que veras algo como esto en el archivo de proyecto (el que tiene la extension .csproj ). 

```XML
<ItemGroup>
	<PackageReference Include="Microsoft.AspNetCore.SpaProxy" Version="6.0.0" />
	<PackageReference Include="Swashbuckle.AspNetCore" Version="6.2.3" />
</ItemGroup>
```

Una vez que instalamos el paquete lo que hay que hacer es agregar el MiddleWare y configurar el Pipeline. Lo vamos a configurar en el archuivo Program.cs. Lo primero que hay que hacer es agregar en el método Middleware agrega las siguientes dos lineas antes del la linea `var app = builder.Build();`. Anteriormente esto se realizaba en el método `ConfigureServices` de la clase `StartUp`

```cs
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
```

Para Usar Swagger unicamnete en el entorno de desarollo puedes usar el siguiente framento de codigo.

```cs
if (!app.Environment.IsDevelopment())
{
    // ...
    app.UseSwagger();
    app.UseSwaggerUI();
}
```


El proyecto inicial de ASP.NET Core únicamente un controlador con un método si nosotros agregamos mas metodos a nuestro nuestro código. Estos se veran en el archivo.

## Documentación

En el archivo de proyecto por default en .NET 6 no se genera la documentación sino tienes que agregar este flag y cuando tú empiezas a agregar este flag hay una advertencia que te empiezan a salir cuando tu código no está documentado. 

```xml
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
  <NoWarn>$(NoWarn);1591</NoWarn>
</PropertyGroup>
```
Pues esto sería todo por este articulo y esperemos verte pronto.