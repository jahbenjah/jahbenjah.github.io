---
layout: post
title:  "Introducción a ASP.NET Core Identity"
date:   2019-12-04 12:22:01 +0000
permalink: /:categories/:title:output_ext
---

ASP.NET Core Identity es un sistema de identidad que te permite llevar el control de usuarios, roles, manejo de contraseñas y contiene una interfaz gráfica predeterminada basada en una **Razor Class Library** entre muchas características más. Como todas las funcionalidades en ASP.NET Core , Identity también esta compuesto por varios paquetes de Nuget, algunos pertenecen al framework compartido y otros son adicionales.

* Microsoft.AspNetCore.Identity
* Microsoft.AspNetCore.Identity.Stores
* Microsoft.AspNetCore.Identity.Core
* Microsoft.AspNetCore.Identity.EntityFrameworkCore
* Microsoft.AspNetCore.Identity.UI

> **Nota** Es importante notar que en proyectos web con ASP.NET Core 3.1 ó 3.0 ya no se incluyen los paquetes de Nuget en el archivo del proyecto y son controlados por la especificación del SDK especificado en el elemento raiz del proyecto `<Project Sdk="Microsoft.NET.Sdk.Web">`. Los ensamblados que componen el framwork compartido de ASP.NET Core se encuentran en la carpeta **_C:\Program Files\dotnet\shared\Microsoft.AspNetCore.App\3.1.0_** para la versión 3.1.0. 

Para crear un proyecto que use Identity puedes agregar el parámetro `--auth` con alguno de los valores de los tipos de autenticación soportados mostrados en la tabla. 

```bash
dotnet new mvc --auth Individual -o IntroIdentity
```

|Tipo de autenticación| Descripción|
|-------------|------------------------|
|None         |No authentication       | 
|Individual   |Individual authentication | 
|IndividualB2C|Individual authentication with Azure | 
|SingleOrg    |Organizational authentication for multiple tenant |
|MultiOrg     |Organizational authentication for multiple tenants|
|Windows      |Windows authentication                  |

ASP.NET Core Identity es un monstruo de muchas cabezas por lo que en este articulo solo veremos temas relacionados con la autenticación de cuentas Individuales usando un proyecto de MVC que se crea sin autenticacion y explicamos detalladamente los pasos a seguir para agregar para ASP.NET Core Identity de forma manual. Adicionalmente explicamos  como realizar algunas actividades frecuentes como crear un usuario, crear un rol, cambiar la configuración predefinida. 

<a href="https://www.SmarterASP.NET/index?r=benjamincamacho">
<img src="https://www.SmarterASP.NET/affiliate/728X90.gif" border="0">
</a>

# Agregando ASP.NET Core Identity

Todo comienza en la linea de comandos para crear un proyecto web MVC sin autenticación.

```bash
dotnet new mvc -o IntroduccionIdentity
```

> **<abbr lang="en" title="too long; didn't read">TL;DR</abbr>** esta sección explica básicamente las diferencias entre los un proyecto MVC con autenticación y uno que incluye la autenticación. Una forma fácil de ver estas diferencias es creando un proyecto sin autenticación y agregar el control de código con Git. Eliminar todo y volver a crear el proyecto con el parámetro de autentificacón y ver las diferencias.

Después necesitamos agregar lo paquetes de Nuget para Entity Framework Core y ASP.NET Core Identity. 

Para agregar  Entity Framework Core se requieren  agregar los paquetes de Nuget `Microsoft.EntityFrameworkCore.Sqlite`, `Microsoft.EntityFrameworkCore.Tools` y `Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore` mediante los siguientes comandos 

```
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore
```

El ultimo sirve para mostrar las página de errores relacionadas con las migraciones de EF Core usando el método `UseDatabaseErrorPage()`.

Para agregar ASP.NET Core Identity necesitamos instalar los paquetes 

```bash
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
dotnet add package Microsoft.AspNetCore.Identity.UI
```

`Microsoft.AspNetCore.Identity.EntityFrameworkCore` contiene las implementaciones de las interfaces de ASP.NET Core Identity especificas para EF Core. lo que nos permite crear una clase que derivada de `IdentityDbContext` para crear las tablas de la base de datos.

```cs
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IntroduccionIdentity.Data
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

## Lista de reproducción : ASP.NET Core Identity

Estoy preparando una lista de reproducción dedicada al tema de ASP.NET Core Identity. Actualmente esta [lista de reproducción en YouTube](https://www.youtube.com/playlist?list=PLnk7QzMh6N-JKP6ZdfXfaRGhxRk0Xu11j) cuenta con 3 videos. Esta serie de videos se usando el sistema operativo Ubuntu 19.10 con el SDK 3.1 de .NET Core. A pesar de que se usa Linux para mostrar como funciona ASP.NET Core Identity la herramienta de linea de comandos funciona igual en Windows o Mac.

* Introducción a ASP.NET Core Identity. Muestra las diferencias entre crear un proyecto con autenticación de cuentas indivduales y uno sin autenticación. 
   
<div class="video-responsive">
<iframe loading="lazy" src="https://www.youtube.com/embed/TQK9Y3jviZw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

*  Personalizar la tabla AspNetUsers

<div class="video-responsive">
   <iframe loading="lazy" src="https://www.youtube.com/embed/ckkvuA6epY0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

* Scaffolding ASP.NET Core

<div class="video-responsive">
<iframe loading="lazy" src="https://www.youtube.com/embed/MqcLBewsNUE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

4. Cambiar de base de datos

En este video se muestra como usar el proveedor de Entity Framework Core para MySQL usando el paquete de Nuget `Pomelo.EntityFrameworkCore.MySql` ya que el proveedor oficial de Oracle, al momento de grabar este video presentaba un bug que no permitía usarlo.

> En el proceso para cambiar de base de datos puedes perder datos. Hazlo con cuidado

Primero debes eliminar la carpeta donde se almacenan las migraciones para cambiar el el proveedor de Entity Framework. Este es el procedimiento sugerido porque evita tener que modificar la base de datos anterior. Si no te importan los datos que tienes en la base de datos creada por ASP.NET Core Identity puedes usar la linea de comandos para eliminar la base de datos y quitar las migraciones

```bash
dotnet ef database drop
dotnet ef migrations remove
```
Posteriormente es necesario instalar el nuevo proveedor de Entity.Framework Core. En este caso usamos el proveedor para MySQL

Adicionalmente es recomendable eliminar el paquete de Nuget del proveedor anterior puedes hacerlo editando el archivo _.csproj_.

```
dotnet add package Pomelo.EntityFrameworkCore.MySql --version 3.1.1
```

lo siguiente que debes hacer es cambiar la cadena de conexión en el archivo _appsettings.json_ por el ejemplo la cadena de conexión para MySQl es.

```sql
server=192.168.0.9;database=identity;user id=root;password=root;port=3306
```

Especificar que se usará el nuevo proveedor en la clase Startup

```cs
UseMySql(...)
```

El paso siguientes es agregar una nueva migración con la linea de comandos de Entityt Framework Core  

```
dotnet ef migrations add "Se cambia a MySQL"
```

Finalmente debes acutalizar la base de datos

```
dotnet ef database update
```

Puedes ver el video con estos pasos aqui

<div class="video-responsive">
<iframe loading="lazy" src="https://www.youtube.com/embed/X4Y9JwVC8QQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
