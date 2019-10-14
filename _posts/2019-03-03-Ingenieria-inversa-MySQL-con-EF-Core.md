---
layout: post
title:  "Entity Framework Core con MySql"
date:   2019-03-03 12:00:01 +0000
categories: entity framework core
image:
  path: /img/og-sakila.jpg
  height: 532
  width: 1016
description: Tutorial de ASP.NET Core 2.2, Entity Framework Core y MySQL creando una aplicación MVC. con el enfoque conocido como "Code Firts"
last_modified_at: 2019-09-08 8:05:26 +0000
author: Benjamin Camacho
---

En este tutorial usamos la Interfaz de Linea de Comandos `dotnet ef dbcontext scaffold` para generar una modelo de _Entity Framework Core_ para la base de datos *sakila* de MySQL con un proyecto que sigue la arquitectura limpia que describen en el libro gratuito [Architect Modern Web Applications with ASP.NET Core and Azure](https://dotnet.microsoft.com/learn/aspnet/architecture). Usamos la version de 5.7 de MySQL y la version 2.2 de ASP.NET Core.

Adicionalmente agregaremos el control de código fuente con git y alojaremos el código fuente del proyecto en un repositorio de Github. La idea de crear este proyecto es generar una serie de tutoriales que muestren como hacer tareas comunes en ASP.NET Core.

Asumimos que tienes instalado las siguientes herramientas de línea de comandos. Incluimos el comando para para verificar la versión que están instaladas.

* SDK de dotnet : `dotnet --version`
* git `git --version`

Si tienes alguna duda con alguna de ellas revisa la documentación o dejame un comentario que intentare responder a la brevedad.

## Cadena de conexión para MySQL

Lo primero que necesitamos son las credenciales para acceder a la base de datos. Con estas debemos crear una cadena de conexión que no es más que un conjunto de claves y valores separadas por comas. Si tienes duda como crearla puedes ver mi post [sobre cadenas de conexión con C#]({% post_url 2019-02-27-cadenas-de-conexion-csharp %}) para más detalles.

```bash
server=localhost;database=Sakila;port=3306;user id=root;password=TuContraseña.
```

Esta cadena la usaremos más adelante para general el modelo de clases a partir de la base de datos.

## Creación del proyecto

Crearemos 3 proyectos contenidos en la carpeta `Sakila/src`. Posteriormente agregaremos pruebas unitarias a esta aplicación.

* _Sakila.Core_ Biblioteca de clases para la lógica de la aplicación
* _Sakila.Infrastructure_ Biblioteca de clases para el código de Entity Framework Core que se comunica con la base de datos.
* _Sakila.Web_ aplicación de ASP.NET Core usando la plantilla de MVC para para mostrar como acceder a la base de datos en este proyecto.

> **Nota** Si cuentas con más de una versión del _SDK_ de .NET Core es recomendable que uses un archivo _global.json_ para especificar la versión de las herramientas que deseas utilizar. Se sugiere que el archivo global.json se coloque en la carpeta raíz que contiene todo el código. Puedes verificar los SDK instalado en tu computadora con el comando `dotnet --list-sdks`. Puedes crear un archivo global.json con el comando `dotnet new globaljson --sdk-version 2.2.401`.

En una terminal ejecuta los siguientes comandos para crear una carpeta y un solución llamada *Sakila* y _Sakila.sln_ respectivamente.

```bash
mkdir Sakila
cd Sakila
dotnet new sln
dotnet new globaljson --sdk-version 2.2.401
```

Para crear los proyectos ejecuta los siguientes comandos uno seguido de otro. La opción -o permite especificar el directorio de salida.

```bash
dotnet new classlib -o src\Sakila.Core
dotnet new classlib -o src\Sakila.Infrastructure
dotnet new mvc -o src\Sakila.Web
```

Elimina los archivos _Class1.cs_ de los proyectos _Sakila.Core_ y _Sakila.Infrastructure_. Si usas Linux puedes usar `rm` en lugar de `del`

```bash
del src\Sakila.Core\Class1.cs
del src\Sakila.Infrastructure\Class1.cs
```

Agrega los proyecto a la solución ejecuta los siguientes comandos:

```bash
dotnet sln add src\Sakila.Core\Sakila.Core.csproj
dotnet sln add src\Sakila.Infrastructure\Sakila.Infrastructure.csproj
dotnet sln add src\Sakila.Web\Sakila.Web.csproj
```

Hasta aquí tenemos una solución con los tres proyectos sin ninguna relación entre ellos. En la siguiente sección agregaremos los paquetes de Nuget y referencias a proyectos necesarios.

### Referencias a proyectos y Paquetes de Nuget

El proyecto _Sakila.Core_ unicamente requiere el paquete `MySql.Data` y esto porque la tabla _address_ utiliza el tipo de dato `MySqlGeometry` de MySQL. Lo instalamos con el siguiente comando :

```bash
dotnet add src\Sakila.Core\Sakila.Core.csproj package MySql.Data
```

El proyecto _Sakila.Infrastructure_ requiere el paquetes de Nuget `MySql.Data.EntityFrameworkCore` ejecuta el siguiente comando para instalarlo:

```bash
dotnet add src\Sakila.Infrastructure\Sakila.Infrastructure.csproj package MySql.Data.EntityFrameworkCore
```

Adicionalmente requiere una referencia al proyecto _Sakila.Core_ para agregarla

```bash
dotnet add src\Sakila.Infrastructure\Sakila.Infrastructure.csproj reference src\Sakila.Core\Sakila.Core.csproj
```

Finalmente en el proyecto _Sakila.Web_ instala el paquete de Nuget `Microsoft.EntityFrameworkCore.Design` con el comando:

```bash
dotnet add src\Sakila.Web\Sakila.Web.csproj package Microsoft.EntityFrameworkCore.Design --version 2.2.2
```

También agrega referencias a los proyectos Sakila.Core y  Sakila.Infrastructure

```bash
dotnet add src\Sakila.Web\Sakila.Web.csproj reference src\Sakila.Core\Sakila.Core.csproj

dotnet add src\Sakila.Web\Sakila.Web.csproj reference src\Sakila.Infrastructure\Sakila.Infrastructure.csproj
```

Hasta aquí tenemos lista la estructura del proyecto por lo que es un buen momento para inicializar el repositorio de git. Posteriormente comenzaremos el proceso para generar el modelo de clases de C# a partir de una base existente. Si usas Visual Studio fácilmente puedes usar _Archivo>Nuevo Proyecto_ en la interfaz gráfica para crear estos proyectos.

## Control de código fuente

Para inicializar el repositorio ejecuta el comando `git init` posteriormente agregaremos el archivo `.gitignore`

> **Archivo .gittgnore** es una buena practica incluir siempre el archivo `.gitignore` en el repositorio. Hay una gran colección de archivos con opciones predefinidas en el repositorio [Github gitignore](https://github.com/github/gitignore/). Generalmente usamos el [archivo _.gitignore_ para Visual Studio](https://github.com/github/gitignore/blob/master/VisualStudio.gitignore)

Para crear el repositorio en Github usamos las siguientes opciones en la pantalla de crear repositorios. Observa que hay una opción para activar las Azure Pipelines esto es por que tengo instalada está extensión en mi cuenta espera un post para agregar el archivo _.yml_ y definir el proceso de integración continua en Azure Devops.

<img data-src="/img/crear-sakila-repo.webp" class="lazyload"  alt="Pantalla para crear un nuevo repositorio en Github">

```bash
git init
```

Hasta aquí tenemos un repositorio local. Para agregar una relación con el repositorio creado en Github necesitamos agregar lo que en git se conoce como un remoto. Esto lo hacemos mediante el siguiente comando

```bash
git remote add origin https://github.com/jahbenjah/Sakila.git
```

```bash
git add .gitignore
git commit -m "Se crea estructura inicial del proyecto"
git push -u origin master
```

## Generando el modelo de clases en C\#

Para generar el modelo de clases de C# de la base de _sakila_ usaremos el comando `dotnet ef dbcontext scaffold` por lo que es importante conocer las opciones disponibles  para ello ejecutamos `dotnet ef dbcontext scaffold --help` para obtener la siguiente salida:

```bash
Usage: dotnet ef dbcontext scaffold [arguments] [options]
Arguments:
  <CONNECTION>  The connection string to the database.
  <PROVIDER>    The provider to use. (E.g. Microsoft.EntityFrameworkCore.SqlServer)

Options:
  -d|--data-annotations                  Use attributes to configure the model (where possible). If omitted, only the fluent API is used.
  -c|--context <NAME>                    The name of the DbContext.
  --context-dir <PATH>                   The directory to put DbContext file in. Paths are relative to the project directory.
  -f|--force                             Overwrite existing files.
  -o|--output-dir <PATH>                 The directory to put files in. Paths are relative to the project directory.
  --schema <SCHEMA_NAME>...              The schemas of tables to generate entity types for.
  -t|--table <TABLE_NAME>...             The tables to generate entity types for.
  --use-database-names                   Use table and column names directly from the database.
  --json                                 Show JSON output.
  -p|--project <PROJECT>                 The project to use.
  -s|--startup-project <PROJECT>         The startup project to use.
  --framework <FRAMEWORK>                The target framework.
  --configuration <CONFIGURATION>        The configuration to use.
  --runtime <RUNTIME_IDENTIFIER>         The runtime to use.
  --msbuildprojectextensionspath <PATH>  The MSBuild project extensions path. Defaults to "obj".
  --no-build                             Don't build the project. Only use this when the build is up-to-date.
  -h|--help                              Show help information
  -v|--verbose                           Show verbose output.
  --no-color                             Don't colorize output.
  --prefix-output                        Prefix output with level.
```

Los valores para los argumentos que necesitamos son:

```cs
Connection :"database=Sakila;server=localhost;port=3306;user id=root;password=Password"
Proveedor: MySql.Data.EntityFrameworkCore
```

Como vemos existen gran cantidad de opciones disponibles. A continuacion enlistamos las que opciones que usaremos:

|Parametro|Valor| Descripcion|
|-------------|-----------|------------|
|-s           | src/Sakila.Web/Sakila.Web.csproj|Define el proyecto de inicio |
|-o           | ../Sakila.Core/Entities | Define el directorio donde se colocaran los archivos de salida|
|-c           | SakilaContext |Especifica el nombre del DbContext|
|-context-dir |./Sakila.Infrastructure |Especifica la ubicacion del DbContext|
|-v           | |No sirve para ver detalles de la salida|

Sin más detalle ejecutamos el siguiente comando para realizar la ingenieria inversa de la base de MySQL

```bash
dotnet ef dbcontext scaffold "database=Sakila;server=localhost;port=3306;user id=root;password=Password" MySql.Data.EntityFrameworkCore -s src/Sakila.Web/Sakila.Web.csproj -o ../Sakila.Core/Entities -c SakilaContext --context-dir ../Sakila.Infrastructure -v
```

Si prefieres usar atributos para las restriciones de modelo puedes usar la opcion *-d*. Si requieres generar las clases de ciertas tablas puedes usar la opcion *-t*.

Por ultimo ya podemos usar el `DbContex` para acceder a la base sakila. Por ejemplo pra imprimir los actores cuyo nombre comienza por 'A'

```csharp
static void Main(string[] args)
{
  using (SakilaContext db = new SakilaContext())
  {
    Console.WriteLine($"Los actores cuyo nombre comienza con 'A' en la base sakila son");
    foreach (Actor actor in db.Actor.Where(actor => actor.FirstName.StartsWith('A')).ToList())
    {
      Console.WriteLine($"{actor.FirstName} {actor.LastName}");
    }
  }
}
```

## Para llevar

* Revisar el método `OnModelCreating` de la clase  `SakilaDbContext` aqui es donde se configura el modelo usando la API Fluida. Comparala con un modelo creado con la opción *-d*.

* Considera eliminar la cadena de conexión del método `OnModelCreating`. Es preferible usar un manejador de secretos o un archivo configuración.

* Aprende como usar el constructor `SakilaContext(DbContextOptions<SakilaContext> options)` junto con la inyección de dependecias.
