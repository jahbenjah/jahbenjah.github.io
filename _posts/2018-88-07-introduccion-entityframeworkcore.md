---
layout: post
title:  "Introdución a Entity Framework Core 2.0."
date:   2018-08-07 22:30:55 +0000
categories: C# EntityFrameworkCore dotnet ef
---
Entity Framework Core es un ORM multiplataforma de código abierto desarrolado por Microsoft.

El repositorio esta aqui. [](https://github.com/aspnet/EntityFrameworkCore)

La ultima version es 2.1.1 al momento de escribir este articulo.

Versión | Fecha de lanzamiento       |  Anuncia
--------| -------------|-----------
2.1     | [Mayo 2018](https://blogs.msdn.microsoft.com/dotnet/2018/05/30/announcing-entity-framework-core-2-1/)| @ricklander
2.0     | [Agosto 2017](https://blogs.msdn.microsoft.com/dotnet/2017/08/14/announcing-entity-framework-core-2-0/)| @diegovega
1.1     | [Noviembre 2016](https://blogs.msdn.microsoft.com/dotnet/2016/11/16/announcing-entity-framework-core-1-1/)|@diegovega
1.0     | [Junio 2016](https://blogs.msdn.microsoft.com/dotnet/2016/06/27/entity-framework-core-1-0-0-available/)| @rowanmiiller

# Principales componentes

DbContext
DbSet

# Super Simple Ejemplo

Descripcion del proyecto

## Proyecto

Desc

1. Se creara un proyecto de consola.

```bash
dotnet new sln -o IntroEfCore  
```

2. Abrir la carpeta IntroEFCore cd IntroEFCore y crear un proeycto de consola

 ```bash
dotnet new console -o EFCoreSimpe
 ```

3. Agregar el proyecto a la solución

```bash
dotnet sln add  EFCoreSimpe/EFCoreSimple.csproj
```

4. Agregar los paquetes de Nuget de entoty framework.

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Relational
```

5. (opcional) Si deseas probar con distintasn bases de datps debes instala Instalar provedores adicionales.

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Pomelo.EntityFrameworkCore.MySql
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Relational
```

6. Abrir visual estudio code

```bash
 code .
```

1. Editar el archivo. clase POCO

```cs
    public class Producto
    {
        //public int PId { get; set; }
        public string Nombre { get; set; }
        public bool Disponible { get; set; }
        public int CategoriaId { get; set; }
        public decimal Price { get; set; }
    }
```

7. Agregar DbContext

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