---
layout: post
title:  "Introdución a Entity Framework Core 2.1."
categories: C# EntityFrameworkCore dotnet ef
last_modified_at: 2019-06-3 8:30:55 +0000
---

*Entity Framework Core* es una tecnología de acceso a datos para .NET Core y .NET Framework. Es multiplataforma y de código abierto desarrollado por Microsoft con aportes de la comunidad.
Propiamente dicho es un asignador objeto relacional o <abbr lang="en" title="Object Relational Mapper">ORM</abbr> por sus siglas en inglés. Su función principal es servir como interprete entre dos tecnologías fundamentadas en distintos principios por un lado la programación orientada a objetos y por el otro las bases de datos relacionales y no relacionales.

Permite al programador controlar una base de datos relacional usando un lenguaje de programación en lugar de SQL estándar o uno de sus dialectos.Libera al programador de escribir gran cantidad de código repetitivo para acceder a los datos.

Favorece el principio de [convención sobre configuración](https://es.wikipedia.org/wiki/Convención_sobre_configuración) muy al estilo de [Ruby On Rails](https://rubyonrails.org/) lo que permite al programador de escribir gran cantidad de código de configuración. Esperen un post sobre todas las convenciones de para Entity Framework Core. En este artículo solo se hace mención de la convención para las [llaves primarias](https://docs.microsoft.com/ef/core/modeling/keys) que espera que una clase tenga una propiedad llamada `Id` o _<[NombreClase]Id>_.

La configuración se puede hacer mediante <span lang="en">Fluent <abbr lang="en" title="Applicaction Programming Interface">API<abbr></span> o Anotaciones de Datos. La primera esta basada en métodos de extensión y la segunda en atributos.

A continuación un serie de preguntas y respuestas que pueden servir como introducción para conocer este framework.

### ¿ Con que bases de datos puedo usar Entity Framework Core ?

Entity Framework Core tiene un modelo de [proveedores](https://docs.microsoft.com/ef/core/providers/) lo que permite usarlo con multiples bases de datos. Solamente es necesario instalar el paquete de Nuget correspondiente y construir la [cadena de conexión]({% post_url 2019-02-27-cadenas-de-conexion-csharp %}).

A continuación una lista de ejemplos de algunas bases de datos con las que puedes usar Entity Framework Core y la dirección del paquete de Nuget
Base de dato | Paquete de Nuget               |
-------------|--------------------------------|
SqlServer    |[Microsoft.EntityFrameworkCore.SqlServe](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer)|
SQLite       |[Microsoft.EntityFrameworkCore.Sqlite](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Sqlite)|
Oracle       |[Oracle.EntityFrameworkCore](https://www.nuget.org/packages/Oracle.EntityFrameworkCore/)|
MySql        |[MySql.Data.EntityFrameworkCore](https://www.nuget.org/packages/MySql.Data.EntityFrameworkCore)|
PostgreSQL   |[Npgsql.EntityFrameworkCore.PostgreSQL](https://www.nuget.org/packages/Npgsql.EntityFrameworkCore.PostgreSQL)|

### ¿Dónde esta el repositorio de Entity Framework Core?

El código fuente de Entity Framework Core esta alojado en [Github](https://github.com/aspnet/EntityFrameworkCore).
Puedes clonar el código a tu computadora y explorar los detalles del código fuente.

```bash
git clone https://github.com/aspnet/EntityFrameworkCore.git 
```

Adicionalmente se pueden ver los "issues" y realizar contribuciones al código.

### ¿Con que lenguajes de programación puedo usar Entity Framework Core?

Se puede utilizar con los lenguajes C#, Visual Basic y F#.

### ¿ En qué proyectos puedo usar Entity Framework Core ?

Con cualquier tipo de proyecto de .NET Core y para cualquier tipo de proyecto .NET Framework que use la version 4.6.1 o superior.

### ¿Cuál es la relación entre los características de SQL y los de C#?

SQL             | Programación orientada a objetos|
----------------| --------------------------------|
Base de datos   | Clase que hereda de DbContext   |
Tabla           | Clase DbSet<T>                  |
Columnas        | Propiedades o campos            |
Llaves primarias||
Llaves foráneas ||
Restricciones   ||
Store Procedures| Query Types                     |
Funciones       ||

### ¿ Que debería saber para usar Entity Framework Core ?

Métodos de extensión.
Expresiones Lamda
LINQ
Atributos C#
SQL Básico

### ¿Como se instala Entity Framework Core ?

Se instala mediante paquetes de NuGet lo que lo hacen muy ligero. Y lo puedes hacer mediante la linea de comandos, la interfaz grafica del gestor de paquetes de Visual Studio o mediante Power Shell.

Utiliza un modelo llamado _Code Firts_ en donde se escriben las clases del dominio y a partir de ellas se crea la base de datos.
También es posible crear un modelo a partir de una base de datos existente.

Cuenta con una interfaz de linea de comandos  `dotnet ef` que permite :

1. Crear y modificar la base de datos
2. Generar clases a partir de una base de datos existentes.
3. Gestionar los cambios a la base de datos.

<img data-src="/img/efcoretools.PNG" class="lazyload"  alt="Imagen de linea de comando Entity Framework Core">

### ¿ Cuales son las versiones de Entity Framework Core ? 

La ultima version es 2.2 al momento de actualizar este artículo. Cada liberación de una nueva versión de EF Core va acompañada de un post donde mencionan las nuevas características de la misma. Actualmente ya esta anunciada la próxima liberación de Entity Framework 3.0 para septiembre de 2019 dentro del evento virtual de 3 días [.NET Conf 2019](https://www.dotnetconf.net/) y para 2020 estará disponible [.NET 5.0](https://devblogs.microsoft.com/dotnet/introducing-net-5/)

Versión | Fecha de lanzamiento|  Detalles
--------| --------------------|-----------
3.0     |  septiembre 2019   |
2.2     | 04 Diciembre 2018   |[Announcing Entity Framework Core 2.2](https://devblogs.microsoft.com/dotnet/announcing-entity-framework-core-2-2/)
2.1     | 30 Mayo 2018        |[Announcing Entity Framework Core 2.1](https://blogs.msdn.microsoft.com/dotnet/2018/05/30/announcing-entity-framework-core-2-1/)
2.0     | 14 Agosto 2017      |[Announcing Entity Framework Core 2.0](https://blogs.msdn.microsoft.com/dotnet/2017/08/14/announcing-entity-framework-core-2-0/)
1.1     | 16 Noviembre 2016   |[Announcing Entity Framework Core 1.1](https://blogs.msdn.microsoft.com/dotnet/2016/11/16/announcing-entity-framework-core-1-1/)
1.0     | 27 Junio 2016       |[Announcing Entity Framework Core 1.0](https://blogs.msdn.microsoft.com/dotnet/2016/06/27/entity-framework-core-1-0-0-available/)

### ¿Cuales son los principales componentes de Entity Framework Core?

Entity framework Core utiliza los siguientes espacios de nombres 

```cs
Microsoft.EntityFrameworkCore
System.ComponentModel.DataAnnotations.Schema
System.ComponentModel.DataAnnotations
```

Las clases principales son `DbContext` y `DbSet`

# Ejemplo Simple: Crear una tabla en un gestor de bases de datos. 

El siguiente ejemplo se crea una clase llamada `Producto` a partir de aquí se muestra la tabla creada en en SQL Server, SQLite, MySql, PostgreSQL y Firebird.

## Proyecto

Se utilizara un proyecto de consola para mostrar el funcionamiento básico de Entity Framework Core. Se especifican los pasos para crearlo mediante la linea de comandos

1. Crear una solución dentro de la carpeta _IntroEfCore_

```bash
dotnet new sln -o IntroEfCore  
```

2. Abrir la carpeta _IntroEFCore_ `cd IntroEFCore` y crear un proyecto de consola especificando la opción -o para definir el directorio del proyecto.

 ```console
dotnet new console -o EFCoreSimple
 ```

3. Agregar el proyecto a la solución

```console
dotnet sln add  EFCoreSimple/EFCoreSimple.csproj
```

4. Agregar los paquetes de Nuget de Entity Framework.

```bash
dotnet add EFCoreSimple/EFCoreSimple.csproj package Microsoft.EntityFrameworkCore
dotnet add EFCoreSimple/EFCoreSimple.csproj package Microsoft.EntityFrameworkCore.Design
dotnet add EFCoreSimple/EFCoreSimple.csproj package Microsoft.EntityFrameworkCore.Relational
```

5. (Opcional) Si deseas probar con distintas bases de datos debes instalar el paquete de Nuget del proveedores correspondiente.

* Para Sql Server

```console
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

* Para MySQL

```console
dotnet add package Pomelo.EntityFrameworkCore.MySql
```

* Para SQLite

```console
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

* Para PostgresSqL

```console
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

7. Abrir Visual Studio Code. Si así lo deseas puedes continuar con Visual Studio 2017 solo debes abrir la solución creada en  el punto 1.

```console
 code .
```

## El código

1. Agregar un archivo llamado *Producto.cs* y colocar el siguiente código.

```cs
    public class Producto
    {
        public int ProductId { get; set; }
        public string Nombre { get; set; }
        public bool Disponible { get; set; }
        public int CategoriaId { get; set; }
        public decimal Price { get; set; }
    }
```

7. Agregar un archivo llamado `ProductoContext.cs` y crear una clase que herede de `DbContext` con el siguiente código.

```cs
   public class ProductContext : DbContext

    {
        public DbSet<Producto> Productos { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=EfCoreDb;Integrated Security=True");
            base.OnConfiguring(optionsBuilder);
        }
    }
```

8. Ejecutar el comando dotnet para aplicar una migración

```console
dotnet add migration
```

# Para llevar

Modelo Anémico

Repository 

Unit of Work

Lazy Loading