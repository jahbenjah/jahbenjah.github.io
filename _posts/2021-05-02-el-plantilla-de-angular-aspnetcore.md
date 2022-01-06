---
layout: post
title:  "Plantilla de ASP.NET Core con Angular"
date:   2021-05-02 12:00:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/angular-vista.png
  height: 358
  width: 683
last_modified_at: 2021-05-02 12:00:01 +0000
description: Aprende a crear plantillas de Angular con ASP.NET Core.
---

En este articulo revisaremos a detalle la plantilla de ASP.NET Core con Angular que combinan la funcionalidad de ASP.NET Core MVC para el Backend y Angular para el FrontEnd con la particularidad que ya están configuradas para trabajar en conjunto.

Con la instalación del SDK de .NET Core vienen incluidas plantillas para React,React con Redux y Angular se pueden crear con el comando `dotnet new`.

> **Importante** Las plantillas de la categoría SPA requieren tener instalado **Node.js** para funcionar.

## Plantilla de ASP .NET Core con Angular

Esta plantilla pertenece la categoría de _aplicaciones de una sola página_ o en ingles SPA Single Page Application que usan alguno de los _frameworks_ de Javascript. En la tabla siguiente se pueden ver las plantillas para crear aplicaciones de una sola página con `dotnet new --list`:

```txt
Templates                                     Short Name           Language    Tags                  
--------------------------------------------  -------------------  ----------  ----------------------  
ASP.NET Core with Angular                      angular              [C#]        Web/MVC/SPA
ASP.NET Core with React.js                     react                [C#]        Web/MVC/SPA          
```

Para crear un nuevo proyecto con la plantilla de Angular se usa el comando `dotnet new angular` pero es recomendable agregarle parametros adicionales para especificar el nombre del proyecto y la carpeta de salida, por ejemplo:

```cmd
dotnet new angular -n MiProyecto -o Carpeta 
```

Este comando creara una carpeta con el nombre especificado y dentro de ella colocara los archivos de la aplicacion para el Backend en la raíz de la carpeta y todos los archivos de la aplicación Frontend con Angular dentro de la carpeta _ClientApp_. A continuación revisamos unas de las características que tienen estas aplicaciones que las hacen trabajar en conjunto.

### Aplicacion de ASP.NET Core

Aqui algunas observaciones de la aplicacion de ASP.NET Core

* Es una aplicacion con una funcionalidad parecida al proyecto de web api pero no es exactamente igual. Por ejemplo no tiene configurado Swagger.

* Al ejecutar esta aplicación con `dotnet run` se descargan los paquetes de Node y se inicia la aplicacion de Angular como el API con .NET Core. Esto lo realiza con la siguiente configuración en el archivo de proyecto:

```xml
<Target Name="DebugEnsureNodeEnv" BeforeTargets="Build" Condition=" '$(Configuration)' == 'Debug' And !Exists('$(SpaRoot)node_modules') ">
    <!-- Ensure Node.js is installed -->
  <Exec Command="node --version" ContinueOnError="true">
      <Output TaskParameter="ExitCode" PropertyName="ErrorCode" />
  </Exec>
  <Error Condition="'$(ErrorCode)' != '0'" Text="Node.js is required to build and run this project. To continue, please install Node.js from https://nodejs.org/, and then restart your command prompt or IDE." />
  <Message Importance="high" Text="Restoring dependencies using 'npm'. This may take several minutes..." />
  <Exec WorkingDirectory="$(SpaRoot)" Command="npm install" />
</Target>
```

* Incluye el paquete de Nuget `Microsoft.AspNetCore.SpaServices.Extensions`.

* Agrega soporte para vistas y Paginas de Razor con el código `services.AddControllersWithViews();` en la clase `Startup`. Esto particularmente no me hace sentido puedes eliminar la carpeta _Pages_ y wwwroot si no vas a utilizarlas.

* Controla el Server Side Rendering de la aplicación de Angular con el parametro `BuildServerSideRenderer` desde el archivo de proyecto de C#

```xml
  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>
    <TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>
    <TypeScriptToolsVersion>Latest</TypeScriptToolsVersion>
    <IsPackable>false</IsPackable>
    <SpaRoot>ClientApp\</SpaRoot>
    <DefaultItemExcludes>$(DefaultItemExcludes);$(SpaRoot)node_modules\**</DefaultItemExcludes>
    <!-- Set this to true if you enable server-side prerendering -->
    <BuildServerSideRenderer>false</BuildServerSideRenderer>
  </PropertyGroup>

```

* La configuración de la canalización de ASP.NET Core en la clase Startup incluye la configuración necesaria para funcionar con Angular.

```cs
public void ConfigureServices(IServiceCollection services)
{
  services.AddControllersWithViews();
  services.AddSpaStaticFiles(configuration =>
  {
    configuration.RootPath = "ClientApp/dist";
  });
}

public void Configure(IApplicationBuilder aIWebHostEnvironment env)
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
    if (!env.IsDevelopment())
    {
        app.UseSpaStaticFiles();
    }
    app.UseRouting();
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{");
    });
    app.UseSpa(spa =>
    {
        spa.Options.SourcePath = "ClientApp";
        if (env.IsDevelopment())
        {
            spa.UseAngularCliServer(npmScript: "start");
        }
    });
}
```

### Aplicacion de Angular

La aplicacion de angular es similar a la que se puede crear con `ng new` sin el control de código fuente y con algunas opciones adicionales.

* Usa Angular 8 que ya está fuera de soporte. Por esta razón el primer pasa que se debería considerar es la actualización.

* La aplicación de Angular instalado el paquete `@nguniversal/module-map-ngfactory-loader` que permite la funcionalidad Server Side Rendering.

* Esta plantilla tiene instalado Bootstrap 4.6, jQuery 3.5.1 y popper.js 1.16.

```json
"dependencies": {
    "@angular/animations": "8.2.12",
    "@angular/common": "8.2.12",
    "@angular/compiler": "8.2.12",
    "@angular/core": "8.2.12",
    "@angular/forms": "8.2.12",
    "@angular/platform-browser": "8.2.12",
    "@angular/platform-browser-dynamic": "8.2.12",
    "@angular/platform-server": "8.2.12",
    "@angular/router": "8.2.12",
    "@nguniversal/module-map-ngfactory-loader": "8.1.1",
    "bootstrap": "^4.6.0",
    "core-js": "^3.8.3",
    "jquery": "^3.5.1",
    "node-sass": "^5.0.0",
    "oidc-client": "^1.11.3",
    "popper.js": "^1.16.0",
    "protractor": "~5.4.2",
    "rxjs": "^6.6.3",
    "ts-node": "~8.4.1",
    "tslint": "~5.20.0",
    "zone.js": "0.9.1"
  }
```
* Tienen tres componentes web implementados Home, Counter y feach-data.

* Viene con la versión 3.5 de Typescript.
