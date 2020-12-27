---
layout: post
title:  "Compilacion de vistas ASP.NET Core"
date:   2020-08-20 22:22:47 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/og-runtime-compilation.webp
  height: 503
  width: 961
description: Aprende que es la compilación de vistas en tiempo de ejecución ASP.NET Core y como habiliarlo en un proyecto.
---

El equipo de ASP.NET Core siempre esta cambiando cosas dentro del framework algunas son para mejorar el desempeño, otras son nuevas características o nuevos paradigmas. Una de las cosa que cambio de las version 2.x a las versiones 3.x es la compilación de las vistas Razor esto lo hicieron con fines de mejorar el desempeño pero a nosotros como programadores puede tomarnos por sorpresa.

Una vista en ASP.NET Core es un archivo con extensión _.cshtml_ que combina HTML y el lenguaje de programación C# para generar una página web de forma dinámica. En versiones anteriores era posible ejecutar el proyecto en modo Debug y realizar cambios en las vistas y ver inmediatamente los cambios sin tener que recompilar todo el proyecto.

## Habilitar la compilación de vistas Razor en tiempo de ejecución

Para los nuevos proyectos creados desde Visual Studio 2019 existe un cuadro de selección que permite habilitar y hace su magia negra y configura todo por nosotros.

<img src="/img/og-runtime-compilation.webp" loading="lazy"  alt="Pantalla de Visual Studio">

Cuando usas la linea de comandos con el comando *dotnet* es necesario usar la opción **-rrc** o *--razor-runtime-compilation* por ejemplo en un proyecto mvc

```bash
dotnet new mvc --rrc -o MiProyecto
```

Las diferencias de un proyecto que tiene habilitado la compilación de vistas Razor en tiempo de ejecución con uno que no son:

1. Agrega el paquete de Nuget `Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation` al proyecto

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
    <CopyRefAssembliesToPublishDirectory>false</CopyRefAssembliesToPublishDirectory>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation" Version="3.1.5" />
  </ItemGroup>
</Project>
```

2. Agrega la variable de entorno `ASPNETCORE_HOSTINGSTARTUPASSEMBLIES` en el archivo _launchSettings.json_ que esta en la carpeta _Properties_.

```json
"MiProyecto": {
    "commandName": "Project",
    "launchBrowser": true,
    "applicationUrl": "https://localhost:5001;http://localhost:5000",
    "environmentVariables": {
    "ASPNETCORE_ENVIRONMENT": "Development",
    "ASPNETCORE_HOSTINGSTARTUPASSEMBLIES": "Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation"
    }
}
```

Esto activa la compilación de vistas en el en entorno se usa el ambiente **Development**. Cuando tienes un proyecto que fue creado sin esta opción puedes realizar estas modificaciones manuales para activar esta función en tú proyecto.
