---
layout: post
title:  "Tutorial ASP.NET Core"
date:   2019-09-08 12:00:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/og-tutorial.jpg
  height: 378
  width: 729
description: Tutorial de ASP.NET Core 2.2, Entity Framework Core y MySQL creando una aplicación MVC. Control de código fuente con Git, estructura del proyecto y creación del modelo de C# usando "Code Firts" 
last_modified_at: 2019-09-12 5:05:23 +0000
author: Benjamin Camacho
---

Bienvenido a la primera publicación del tutorial de ASP.NET Core en español en este crearemos una aplicación web basada en la plantilla MVC de ASP.NET Core y tiene como propósito principal mostrar una forma de hacer tareas comunes en este framework como ejecutar las operaciones <abbr lang="en" title="Create Read Update Delete">CRUD</abbr> con una base de datos, validar formularios ,instalar la aplicación , crear un contenedor de docker, usar la inyección de dependencias y algunos temas adicionales. Este estará basado en mi experiencia personal e incluirá las referencias a otros recursos de donde aprendido como son libros, blogs o la documentación misma.

En esta primera sección creamos la estructura del proyecto,agregaremos el control de código fuente con Git y crearemos el modelo de la base de datos. Adicionalmente alojaremos el código fuente del proyecto en un repositorio de Github.

Aunque en mi trabajo del dia a dia uso Visual Studio y harto el ratón siempre me ha atraído el poder de la linea de comandos y poder teclar sin el uso del ratón por tal motivo siempre que exista una herramienta de linea de comandos intentare hacer uso de ella, esto siguiendo el consejo "**Aprende a usar la herramientas de linea de comanando**" del libro [97 Things Every Programmer Should Know](https://www.oreilly.com/library/view/97-things-every/9780596809515/). Para poder seguir este tutorial debes tener instalado las siguientes herramientas de línea de comandos y tener una cuenta en Github. Incluimos el comando para para verificar la versión que están instaladas.

* SDK de dotnet : `dotnet --version`
* git `git --version`

Si tienes alguna duda con alguna de ellas revisa la documentación o dejame un comentario que intentare responder a la brevedad.

# Control de código fuente y Estructura del proyecto

 Seguiremos una estructura del proyecto muy común en el contexto del Open Source en un proyecto que sigue la arquitectura limpia que describen en el libro gratuito [Architect Modern Web Applications with ASP.NET Core and Azure](https://dotnet.microsoft.com/learn/aspnet/architecture). Usamos la version de 5.7 de MySQL y la version 2.2 de ASP.NET Core. El código estará alojado en un repositorio de Github pero es posible alojarlo en cualquier otro servicio que soporte git como Azure Repos, BitBucket o Gitlab. Particularmente en mi trabajo uso Gitlab en una máquina virtual y funciona de maravilla.

## git y Github

Todo el código de la aplicación estará dentro de la carpeta _Sakila_ que incluirá dos carpetas: _src_ para el código y _test_ para los proyectos de prueba. A nivel de la estos directorios incluiremos archivos que tienen un alcance para todo el proyecto como los siguientes archivos `.gitignore`, `LICENSE`, `Dockerfile`,`global.json` o el archivo `README` entre otros.

> En proyectos más grandes pueden existir carpetas adicionales a _src_ y _test_ como ejemplo ve la estructura del código fuente de [ASP.NET Core](https://github.com/aspnet/AspNetCore) y revisa el contenido de la carpeta _eng_  y _docs_.

```bash
├───src
└───test
```

La primer tarea a realizar es el repositorio git, agregaremos el archivo `.gitignore` basado en la plantilla de Visual Studio y crearemos repositorio de Github. Para crear el repositorio en Github usamos las siguientes opciones en la pantalla. Observa que hay una opción para activar las Azure Pipelines esto es por que tengo instalada está [extensión](https://github.com/marketplace/azure-pipelines) en mi cuenta espera un post para agregar el archivo _.yml_ y definir el proceso de integración continua en Azure Devops.

<img data-src="/img/crear-sakila-repo.JPG" class="lazyload" alt="Pantalla para crear un nuevo repositorio en Github">

> **Archivo .gittgnore** es una buena practica incluir siempre el archivo **.gitignore** en el repositorio. Hay una gran colección de archivos con opciones predefinidas en el repositorio [Github gitignore](https://github.com/github/gitignore/). Generalmente usamos el [archivo _.gitignore_ para Visual Studio](https://github.com/github/gitignore/blob/master/VisualStudio.gitignore). El SDK de .NET Core trae una nueva plantilla que copia el archivo _.gitignore_ para Visual Studio con `dotnet new gitignore`

Para comenzar con el proyecto crea una carpeta llamada _Sakila_ y ejecuta inicializa el repositorio de git.

```bash
mkdir Sakila
cd Sakila
git init
```

Hasta aquí tenemos un repositorio local sin ningún archivo. Para agregar una relación con el repositorio creado en Github necesitamos agregar lo que en git se conoce como un remoto. Esto lo hacemos mediante el siguiente comando

```bash
git remote add origin https://github.com/jahbenjah/Sakila.git
```

Copiamos el contenido del archivo _.gitignore_ del repositorio de Github y lo agregamos al control de código fuente mediante el comando

```bash
git add .gitignore
```

Con esto ya podemos publicar nuestro código el el repositorio remoto para ello agregammos un `commit` y publicamos la rama master al repositorio remoto.

```bash
git commit -m "Se agrega archivo .gitignore"
git push -u origin master
```

A partir de aquí empezaremos a repetir esté patrón para la publicación y seguiremos el [flujo de Github](https://guides.github.com/introduction/flow/),es decir, para cada característica nueva de la aplicación crearemos una **rama de git** y cuando estén listos los cambios crearemos un **Pull Request** para incorporar nuestros cambios a la rama _master_. Para crear una rama y cambiarse de rama ejecuta

```bash
git branch estructura-proyecto
git checkout estructura-proyecto
```

Git en si mismo requiere de grandes conocimientos por lo que te recomiendo guardar el libro [Pro Git](https://git-scm.com/book/es/v2) en tus favoritos. Siguiendo el consejo "Conoce tu <abbr lang="en" title="Integrated Development Enviroment">IDE</abbr> del libro **97 Things Every Programmer Should Know** deberías saber que [Visual Studio tiene soporte para git](https://docs.microsoft.com/visualstudio/version-control/index?view=vs-2019) y una [extensión para  Github](https://visualstudio.github.com/) de tal forma que la mayoría de las tareas de git las puedes hacer mediante la interfaz gráfica.

## Proyecto

Crearemos 3 proyectos contenidos en la carpeta `Sakila/src`. Tenemos planeado agregaremos pruebas unitarias a esta aplicación en un articulo posterior

* _Sakila.Core_ Biblioteca de clases para la lógica de la aplicación
* _Sakila.Infrastructure_ Biblioteca de clases para el código de Entity Framework Core que se comunica con la base de datos.
* _Sakila.Web_ aplicación de ASP.NET Core usando la plantilla de MVC para para mostrar como acceder a la base de datos en este proyecto.

> **Nota** Si cuentas con más de una versión del _SDK_ de .NET Core es recomendable que uses un archivo _global.json_ para especificar la versión de las herramientas que deseas utilizar. Se sugiere que el archivo global.json se coloque en la carpeta raíz que contiene todo el código. Puedes verificar los SDK instalado en tu computadora con el comando `dotnet --list-sdks`. Puedes crear un archivo global.json con el comando `dotnet new globaljson --sdk-version 2.2.401`.

En una terminal ejecuta los siguientes comandos dentro de la carpeta *Sakila* para crear una solución y los proyectos uno seguido de otro. La opción -o permite especificar el directorio de salida. Para nuestra conveniencia agregamos una solución que puede usarse con Visual Studio si a si lo prefieres.

```bash
dotnet new globaljson --sdk-version 2.2.401
dotnet new sln
dotnet new classlib -o src\Sakila.Core --no-restore
dotnet new classlib -o src\Sakila.Infrastructure --no-restore
dotnet new mvc -o src\Sakila.Web --no-restore

# Agrega los proyectos a la solución
dotnet sln add src\Sakila.Core\Sakila.Core.csproj
dotnet sln add src\Sakila.Infrastructure\Sakila.Infrastructure.csproj
dotnet sln add src\Sakila.Web\Sakila.Web.csproj
```

Elimina los archivos _Class1.cs_ de los proyectos _Sakila.Core_ y _Sakila.Infrastructure_. Si usas Linux puedes usar `rm` en lugar de `del`

```bash
del src\Sakila.Core\Class1.cs
del src\Sakila.Infrastructure\Class1.cs
```

Hasta aquí tenemos una solución con los tres proyectos sin ninguna relación entre ellos. En la siguiente sección agregaremos los paquetes de Nuget y referencias a proyectos necesarios.

### Referencias a proyectos y Paquetes de Nuget

El proyecto _Sakila.Core_ unicamente requiere el paquete `MySql.Data` y esto porque la tabla _address_ utiliza el tipo de dato `MySqlGeometry` de MySQL. Lo instalamos con el siguiente comando :

```bash
dotnet add src\Sakila.Core\Sakila.Core.csproj package MySql.Data
```

El proyecto _Sakila.Infrastructure_ requiere el paquetes de Nuget `MySql.Data.EntityFrameworkCore` y una referencia al proyecto _Sakila.Core_ para agregarlas ejecuta el siguiente comando para instalarlo:

```bash
dotnet add src\Sakila.Infrastructure\Sakila.Infrastructure.csproj package MySql.Data.EntityFrameworkCore
dotnet add src\Sakila.Infrastructure\Sakila.Infrastructure.csproj reference src\Sakila.Core\Sakila.Core.csproj
```

Finalmente en el proyecto _Sakila.Web_ requiere el paquete de Nuget `Microsoft.EntityFrameworkCore.Design` y referencias a los proyectos Sakila.Core y Sakila.Infrastructure

```bash
dotnet add src\Sakila.Web\Sakila.Web.csproj package MySql.Data.EntityFrameworkCore
dotnet add src\Sakila.Web\Sakila.Web.csproj package Microsoft.EntityFrameworkCore.Design
dotnet add src\Sakila.Web\Sakila.Web.csproj reference src\Sakila.Core\Sakila.Core.csproj
dotnet add src\Sakila.Web\Sakila.Web.csproj reference src\Sakila.Infrastructure\Sakila.Infrastructure.csproj
```

Hasta aquí tenemos lista la estructura del proyecto por lo que es un buen momento para agregar un nuevo commit a nuestro el repositorio de Git local. Posteriormente comenzaremos el proceso para generar el modelo de clases de C# a partir de una base existente. Si usas Visual Studio fácilmente puedes usar _Archivo>Nuevo Proyecto_ en la interfaz gráfica para crear estos proyectos.

```bash
git add .
git commit -m "Se crea la estructura del proyecto"
```

## Generando el modelo de clases en C\#

Para generar el modelo de clases de C# de una base existente se usa el comando `dotnet ef dbcontext scaffold` y para ello necesitamos una cadena de conexion y el nombre del proveedor de Entity Framework Core. Para el caso de MySQL 

|Parámetro                |Valor                    |
|-------------------------|-------------------------|
|Cadena de conexion MySQl | database=Sakila;server=localhost;port=3306;user id=root;password=Password|
|Provedor                 | MySql.Data.EntityFrameworkCore |

Si tienes duda como [crear una cadena de conexión con C#]({% post_url 2019-02-27-cadenas-de-conexion-csharp %}).
Tambien usamos las siguientes opciones del comando `dotnet ef dbcontext scaffold`. Puedes usar `dotnet ef dbcontext scaffold --help` para ver más detalles sobre este comando.

|Parámetro    |Valor                    | Descripción|
|-------------|-------------------------|------------|
|-s           | src/Sakila.Web/Sakila.Web.csproj|Define el proyecto de inicio |
|-o           | ../Sakila.Core/Entities |Define el directorio donde se colocarán los archivos de salida|
|-c           | SakilaContext           |Especifica el nombre del `DbContext`|
|-context-dir |./Sakila.Infrastructure  |Especifica la ubicación del `DbContext`|

Nuestro comando para generar los el modelo de la base de datos Sakila el comando es el siguiente:

```bash
dotnet ef dbcontext scaffold "database=Sakila;server=localhost;port=3306;user id=root;password=Password" MySql.Data.EntityFrameworkCore -s src/Sakila.Web/Sakila.Web.csproj -o ../Sakila.Core/Entities -c SakilaContext --context-dir ../Sakila.Infrastructure
```

Esto nos creara el modelo de clases de C# usando por el método la API fluida de Entity Framework Core en el método `OnModelCreating` por ejemplo para la clase `Actor` que se encuentra en el esquema `sakila`. Desde mi punto de vista esto genera una clase `SakilaContext` que no es fácil de mantener porque este método contiene una gran cantidad de líneas, un indice de mantenimiento bajo y una complejidad ciclomatica grande. Posteriormente agregaremos una entrada sobre como obtener las metricas del código.

```cs
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
  modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

  modelBuilder.Entity<Actor>(entity =>
  {
  entity.ToTable("actor", "sakila");

  entity.HasIndex(e => e.LastName).HasName("idx_actor_last_name");

  entity.Property(e => e.ActorId).HasColumnName("actor_id").HasColumnType("smallint(5) unsigned");

  entity.Property(e => e.FirstName)
                    .IsRequired().HasColumnName("first_name").HasMaxLength(45).IsUnicode(false);

  entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("last_name").HasMaxLength(45).IsUnicode(false);

   entity.Property(e => e.LastUpdate)
                    .HasColumnName("last_update")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
  });
  //...
```

Una forma alternativa de crear el modelo es usando las anotaciones de datos. Puedes crear un modelo usando las anotaciones de datos agregando la opción `-d` al comando `dotnet ef dbcontext`. Por ejemplo la clase `Actor` configurada con anotaciones de datos luce de la siguiente manera. Es necesario notar que no todas las opciones de la API fluida estan disponibles en las anotaciones de datos.

```cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sakila.Console
{
    [Table("actor", Schema = "sakila")]
    public partial class Actor
    {
        public Actor()
        {
            FilmActor = new HashSet<FilmActor>();
        }

        [Column("actor_id", TypeName = "smallint(5) unsigned")]
        public short ActorId { get; set; }
        [Required]
        [Column("first_name")]
        [StringLength(45)]
        public string FirstName { get; set; }
        [Required]
        [Column("last_name")]
        [StringLength(45)]
        public string LastName { get; set; }
        [Column("last_update")]
        public DateTimeOffset LastUpdate { get; set; }

        [InverseProperty("Actor")]
        public virtual ICollection<FilmActor> FilmActor { get; set; }
    }
}
```

Un punto que debemos tener en cuenta es que cuando usamos las herramientas para generar el modelo de bases de datos  la cadena de conexión se incluye en el método `OnConfiguring` que es considerado una mala práctica por lo que eliminaremos este método. Y la cadena de conexión la obtendremos del archivo de configuración.

```cs
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
  if (!optionsBuilder.IsConfigured)
  {
    optionsBuilder.UseMySQL("database=Sakila;server=localhost;port=3306;user id=root;password=Password");
  }
}
```

Otro punto a considerar el espacio de nombres que las herramientas de linea de comandos de EF Core usa por default espacio de nombres del proyecto de inicio en este caso `Sakila.Web`. Ajustaremos los espacios de nombres a `Sakila.Core.Entities` y `Sakila.Infrastructure` dependiendo de l proyecto al que pertenezacan las clases.

Este es un buen punto para publicar los cambios en el repositorio Git local para llevar una trazabilidad de los cambios realizados en el códiggo. Ejecuta los comandos:

```bash
git add .
git commit -m "Se crea el modelo de datos"
```

## Usar el contexto en la aplicación ASP.NET Core MVC

Para usar el contexto de la aplicación en el proyecto de ASP.NET Core requerimos hacer uso de la inyección de dependecias que viene integrado con ASP.NET Core. Lo primero que tenemos que hacer es agregar la cadena de conexión al archivo `appsettings.json` en una seccion llamada `ConnectionStrings`

```json
{
  "ConnectionStrings": {
    "Sakila": "database=Sakila;server=localhost;port=3306;user id=root;password=Password"
  },
}
```

Posteriormente tenemos que agregar el servicio en el método `ConfigureServices` usando el método de extensión `AddDbContext<T>` y leyendo la cadena de conexion del archivo de configuración. Tambien es necesario agregar las instruciones `using Microsoft.EntityFrameworkCore;` y `using Sakila.Infrastructure;` al archivo `Startup.cs`

```csharp
public void ConfigureServices(IServiceCollection services)
{
  services.AddDbContext<SakilaContext>(options => options
                      .UseMySQL(Configuration.GetConnectionString("Sakila")));
  //...
  services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
}
```

El siguiente paso es especificar la dependencia en el constructor junto con un campo privado donde haremos uso de esta dependencia `SakilaContext`, en este caso la clase `HomeController`.

```csharp
private readonly SakilaContext _context;
public HomeController(SakilaContext context)
{
  _context = context;
}
```

Para mostrar como usar la clase `SakilaContext` modificamos el método de acción `Index` de la clase `HomeController` de la siguiente manera:

```cs
public IActionResult Index()
{
  return View(_context.Actor.ToList());
}
```

La vista _Views\Home\Index.cshtml_ contendrá el siguiente código para mostrar los nombres de los actores de la base _sakila_ en una lista en la página de inicio de la aplicación.

```cshtml
@model List<Sakila.Core.Entities.Actor>  
@{
    ViewData["Title"] = "Home Page";
}

<div class="text-center">
    <h1 class="display-4">Bienvenidos</h1>
    <p>Los actores en la base Sakila son:</p>
</div>

<div>
    <ul class="list-group">
        @foreach (var actor in Model)
        {
        <li class="list-group-item">@actor.FirstName @actor.LastName;</li>
        }
    </ul>
</div>
```

Para ejecutar la aplicación ejecuta el siguiente comando:

```bash
dotnet run --project src\Sakila.Web\Sakila.Web.csproj
```

Cuando estemos listos podemos publicar la rama a nuestro repositorio remoto de Gtihub.

```bash
git add .
git commit -m "Se agrega el DbContext al proyecto Web"
git push origin estructura-proyecto
```

El último paso sera crear un **Pull request** para integrar nuestros cambios la rama master.
