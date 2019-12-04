---
layout: post
title:  "Introducción a ASP.NET Core Identity"
date:   2019-12-04 12:22:01 +0000
permalink: /:categories/:title:output_ext
---

ASP.NET Core Identity es un sistema de membresías que te permite llevar el control de usuarios, roles, manejo de contraseñas,contiene una interfaz gráfica predeterminada basada en una **Razor Class Library** entre muchas características más. Como todas las funcionalidades en ASP.NET Core , Identity también esta compuesto por varios paquetes de Nuget, algunos pertenecen al framework compartido y otros son adicionales.


* Microsoft.AspNetCore.Identity
* Microsoft.AspNetCore.Identity.Stores
* Microsoft.AspNetCore.Identity.Core
* Microsoft.AspNetCore.Identity.EntityFrameworkCore
* Microsoft.AspNetCore.Identity.UI

> **Nota** Es importante notar que en proyectos web con ASP.NET Core 3.1 ó 3.0 ya no se incluyen los paquetes de Nuget en el archivo del proyecto y son controlados por la especificación del Sdk especificado en el elemento raiz del proyecto `<Project Sdk="Microsoft.NET.Sdk.Web">`. Los ensamblados que componen el framwork compartido de ASP.NET Core se encuentran en la carpeta **_C:\Program Files\dotnet\shared\Microsoft.AspNetCore.App\3.1.0_** para la versión 3.1.0. 



|Tipo de autenticación| Descripción|
|-------------|------------------------|
|None         |No authentication       | 
|Individual   |Individual authentication | 
|IndividualB2C|Individual authentication with Azure | 
|SingleOrg    |Organizational authentication for multiple tenant |
|MultiOrg     |Organizational authentication for multiple tenants|
|Windows      |Windows authentication                  |


Todo comienza en la linea de comandos 

```bash
dotnet new mvc --auth Individual -o IntroIdentity
```

En la carpeta _Data_ se encuentra la clase ApplicationContext.c

```
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IntroIdentity.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
```

Los nombres de las tablas son