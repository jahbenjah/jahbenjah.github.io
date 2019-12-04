---
layout: post
title:  "Introducción a ASP.NET Core Identity"
date:   2019-12-04 12:22:01 +0000
permalink: /:categories/:title:output_ext
---

ASP.NET Core Identity es un sistema de identidad que te permite llevar el control de usuarios, roles, manejo de contraseñas,contiene una interfaz gráfica predeterminada basada en una **Razor Class Library** entre muchas características más. Como todas las funcionalidades en ASP.NET Core , Identity también esta compuesto por varios paquetes de Nuget, algunos pertenecen al framework compartido y otros son adicionales.

* Microsoft.AspNetCore.Identity
* Microsoft.AspNetCore.Identity.Stores
* Microsoft.AspNetCore.Identity.Core
* Microsoft.AspNetCore.Identity.EntityFrameworkCore
* Microsoft.AspNetCore.Identity.UI

> **Nota** Es importante notar que en proyectos web con ASP.NET Core 3.1 ó 3.0 ya no se incluyen los paquetes de Nuget en el archivo del proyecto y son controlados por la especificación del Sdk especificado en el elemento raiz del proyecto `<Project Sdk="Microsoft.NET.Sdk.Web">`. Los ensamblados que componen el framwork compartido de ASP.NET Core se encuentran en la carpeta **_C:\Program Files\dotnet\shared\Microsoft.AspNetCore.App\3.1.0_** para la versión 3.1.0. 

Para crear un proyecto que use Identity puedes agregar el parámetro `--auth` con alguno de los valores de los tipos de autenticación soportados mostrados en la tabla. 

|Tipo de autenticación| Descripción|
|-------------|------------------------|
|None         |No authentication       | 
|Individual   |Individual authentication | 
|IndividualB2C|Individual authentication with Azure | 
|SingleOrg    |Organizational authentication for multiple tenant |
|MultiOrg     |Organizational authentication for multiple tenants|
|Windows      |Windows authentication                  |

ASP.NET Core Identity es un monstruo de muchas cabezas por lo que en este articulo solo veremos temas relacionados con la autenticación de cuentas Individuales usando un proyecto de MVC que se crea sin autenticacion. Empezamos a revisar los detalles para configurar Identity de forma manual y como realizar algunas actividades frecuentes como crear un usuario, crear un rol, cambiar la configuración predefinida. 

```bash
dotnet new mvc --auth Individual -o IntroIdentity
```

# Agregando ASP.NET Core Identity

Todo comienza en la linea de comandos para crear un proyecto web MVC sin autenticación.

```bash
dotnet new mvc -o IntroduccionIdentity
```

Después necesitamos agregar 2 paquetes de Nuget el primero `Microsoft.AspNetCore.Identity.EntityFrameworkCore` sirve para crearemos una clase que deriva de `IdentityDbContext`
