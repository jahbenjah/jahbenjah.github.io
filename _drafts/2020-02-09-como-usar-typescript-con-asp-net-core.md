---
layout: post
title:  "Como usar Typescript con ASP.NET Core"
date:   2020-02-09 11:18:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/typescript.png
  height: 378
  width: 729
description: "Typescript ✅ toma cada vez más relevancia en el desarrollo web y por tal motivo te mostramos como puedes utilizarlo con ASP.NET Core" 
last_modified_at: 2020-02-09 11:18:01 +0000
author: Benjamin Camacho
---

Typescript de forma muy simplificada es Javascript más tipado estático. Recientemente comence a usar Typescript en un proyecto con .NET y me parece que hace la experiencia de trabajar con Javascript más placentera. En proyectos donde se requiere comportamiento dinámico MVC se queda corto y el código de Javascript comienza a crecer en forma considerable.

## Como agregar Typescrip a un proyecto de MVC de ASP.NET Core

Crear un proyecto de ASP-NET Core

```
dotnet new mvc -o MiProyecto
```

Agregar el paquete de Nuget

```
dotnet add package Microsoft.TypeScript.MSBuild
```

Crear la carpeta Scripts

Crear un  archivo tsconfig.json

Configurar los paquetes de NPM