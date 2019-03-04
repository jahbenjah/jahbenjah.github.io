---
layout: post
title:  "Ingeniería inversa MySQL con EF Core"
date:   2019-03-03 12:00:01 +0000
categories: entity framework core
image: sakila
---

En este tutorial usamos la Interfaz de Linea de Comandos `dotnet ef dbcontext scaffold` para generar una modelo de _Entity Framework Core_ para base de datos *sakila* de MySQL con un proyecto que sigue la arquitectura limpia. Usamos la version de 5.7 MySQL y la version 2.2 de .NET Core.

## Cadena de conexión para MySQL

Lo primero que necesitamos es la cadena de conexión para MySQL. Si tienes duda como crearla puedes ver mi post [sobre cadenas de conexión con C#](2019-02-27-cadenas-de-conexion-csharp.md) para mas detalles.

```
server=localhost;database=Sakila;port=3306;user id=root;password=TuContraseña." 
```

Esta cadena la usaremos más adelante.

## Creación del proyecto

Crearemos 3 proyectos contenidos en la carpeta `Sakila/src`.
* _Sakila.Core_ Bibioteca de clases para la  logica de la aplicacion
* _Sakila.Infrastructure_ Biblioteca de clases para el código de Entity Framework Core que se comunica con la base de datos.
* _Sakila.ConsoleApp_ Aplicación de consola para utilizada para mostrar como usar estos proyectos.

En una terminal ejecuta los siguientes comandos para crear una carpeta y un solución llamada *Sakila* y Sakila.sln respectivamente.

```bash
mkdir Sakila
cd Sakila
dotnet new sln
```

Para crear los proyectos ejecuta los siguientes comandos uno seguido de otro. La opción -o permite especificar el directorio de salida.

```bash
dotnet new classlib -o src\Sakila.Core
dotnet new classlib -o src\Sakila.Infrastructure
dotnet new console -o src\Sakila.ConsoleApp
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
dotnet sln add src\Sakila.ConsoleApp\Sakila.ConsoleApp.csproj
```

Hasta aquí tenemos una solución con los tres proyectos sin ninguna relación entre ellos. En la siguiente sección agregaremos los paquetes de Nuget y referencias a proyectos necesarios.

### Referencias a proyectos y Paquetes de Nuget

El proyecto _Sakila.Core_ unicamente requiere el paquete `MySql.Data` y esto porque la tabla _address_ utiliza el tipo de dato `MySqlGeometry` de MySQL. Lo instalamos con el siguiente comando :
 
```bash
dotnet add src\Sakila.Core\Sakila.Core.csproj package MySql.Data --version 8.0.15
```

El proyecto _Sakila.Infrastructure_ requiere el paquetes de Nuget `MySql.Data.EntityFrameworkCore` ejecuta

```bash
dotnet add src\Sakila.Infrastructure\Sakila.Infrastructure.csproj package MySql.Data.EntityFrameworkCore --version 8.0.15
```

Adicionalmente requiere una referencia al proyecto _Sakila.Core_

```
dotnet add src\Sakila.Infrastructure\Sakila.Infrastructure.csproj reference src\Sakila.Core\Sakila.Core.csproj
```

Finalmente al proyecto _Sakila.AppConsole_ con instala  el paquete de Nuget `Microsoft.EntityFrameworkCore.Design` 

```
dotnet add src\Sakila.ConsoleApp\Sakila.ConsoleApp.csproj package Microsoft.EntityFrameworkCore.Design --version 2.2.2
```


También agrega referencias a los proyectos Sakila.Core y  Sakila.Infrastructure

```
dotnet add src\Sakila.ConsoleApp\Sakila.ConsoleApp.csproj reference src\Sakila.Core\Sakila.Core.csproj

dotnet add src\Sakila.ConsoleApp\Sakila.ConsoleApp.csproj reference src\Sakila.Infrastructure\Sakila.Infrastructure.csproj
```

Hasta aquí tenemos liso la estructura del proyecto. Si usas Visual Studio puedes usar la interfaz gráfica para crear estos proyectos.

## Ejecutar la ingeniería inversa

Para generar el modelo de clases de C# de la base de sakila usaremos el comando `dotnet ef dbcontext scaffold` por lo que es importante conocer las opciones disponibles  para ello ejecutamos `dotnet ef dbcontext scaffold --help` para obtener la siguiente salida:

```
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

```
Connection :"database=Sakila;server=localhost;port=3306;user id=root;password=Password"
Proveedor: MySql.Data.EntityFrameworkCore
```

Como vemos existen gran cantidad de opciones disponibles. A continuacion enlistamos las que opciones que usaremos:

|Parametro|Valor| Descripcion|
|-------------|-----------|------------|
|-s           | src/Sakila.ConsoleApp/Sakila.ConsoleApp.csproj|Define el proyecto de inicio |
|-o           | ../Sakila.Core/Entities | Define el directorio donse se colocaran los archivos de salida|
|-c           | SakilaContext |Especifica el nombre del DbContext|
|-context-dir |./Sakila.Infrastructure |Especifica la ubicacion del DbContext|
|-v           | |No sirve para ver detalles de la salida|

Sin más detalle ejecutamos el siguiente comando para realizar la ingenieria inversa de la base de MySQL

```
dotnet ef dbcontext scaffold "database=Sakila;server=localhost;port=3306;user id=root;password=Password" MySql.Data.EntityFrameworkCore -s src/Sakila.ConsoleApp/Sakila.ConsoleApp.csproj -o ../Sakila.Core/Entities -c SakilaContext --context-dir ../Sakila.Infrastructure -v
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