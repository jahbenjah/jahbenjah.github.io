---
layout: post
title:  "Introdución a Entity Framework Core"
categories: C# EntityFrameworkCore dotnet ef
last_modified_at: 2020-01-01 11:03:55 +0000
image:
  path: /img/efcoretools.webp
  height: 623
  width: 1190
---

*Entity Framework Core* es una tecnología de acceso a datos para .NET Core y .NET Framework. Es multiplataforma y de código abierto desarrollado por Microsoft con aportes de la comunidad.
Propiamente dicho es un asignador objeto relacional o <abbr lang="en" title="Object Relational Mapper">ORM</abbr> por sus siglas en inglés. Su función principal es servir como interprete entre dos tecnologías fundamentadas en distintos principios por un lado la programación orientada a objetos y por el otro las bases de datos relacionales y no relacionales.

Permite al programador controlar una base de datos relacional usando un lenguaje de programación en lugar de SQL estándar o uno de sus dialectos.Libera al programador de escribir gran cantidad de código repetitivo para acceder a los datos.

Favorece el principio de [convención sobre configuración](https://es.wikipedia.org/wiki/Convención_sobre_configuración) muy al estilo de [Ruby On Rails](https://rubyonrails.org/) lo que permite al programador de escribir gran cantidad de código de configuración. Esperen un post sobre todas las convenciones de para Entity Framework Core. En este artículo solo se hace mención de la convención para las [llaves primarias](https://docs.microsoft.com/ef/core/modeling/keys) que espera que una clase tenga una propiedad llamada `Id` o _<[NombreClase]Id>_.

La configuración se puede hacer mediante <span lang="en">Fluent <abbr lang="en" title="Applicaction Programming Interface">API<abbr></span> o Anotaciones de Datos. La primera esta basada en métodos de extensión y la segunda en atributos.

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