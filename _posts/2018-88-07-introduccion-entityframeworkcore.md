---
layout: post
title:  "Introdución a Entity Framework Core 2.0."
date:   2018-08-07 22:30:55 +0000
categories: C# EntityFrameworkCore dotnet ef
---

Entity Framework Core 2.0 es una tecnologia de acceso a datos  multiplataforma y de código abierto desarrollado por Microsoft con aportes de la comunidad. 
Propiamente dicho es un asignado objeto relacioal  o _ORM_ (Object Relational Mapper) por sus  siglas en inlges. Su funcion principal es  servir como interprete entre dos tecnologias fundamentadas 
en distintos principios por un lado  las bases de datos relacionaes y la programacion orientada a objetos por el otro.

SQL             | Programación orientada a objetos|  Detalles
----------------| ---------------------------------|-----------
Base de datos   ||
Tabla           | Clase                            |
Columnas        | Propiedades o campos             |
Llaves primarias||
Llaves foraneas ||

Se instala mediante paquetes de Nuget lo que lo hacen muy ligero.

Utiliza un modelo llamado _Code Firts_ en donde se escriben las clases del dominio y apartir de ellas se crea la base de datos.
Tambien es posible crear un modelo a partir de una base de datos existente.


Esta basado en convensiones muy a la _Ruby On Rails_ Esperen un post sobre todas las convenciones de SQL Server
El este articulo solo se hace menscion del la convencion para las llaves primarias.

La configuración se puede hacer mediante Fluent API, Atributos

Cuenta con una interfaz de linea de comandos  ```dotnet ef```que permite : 
1. Crear y modificar la base de datos
2. Generar clases a partir de una base de datos existentes.
3. Gestionar los cambios a la base de datos. 

![Entity Framework Core.]({{"/img/efcoretools.PNG" | absolute_url }} "Imagen de linea de comando Entity Framework Core")


Tiene un modelo de Provedores lo que permite usarlo con multiples bases de datos.

El código fuente de Entity Framework Core esta alojado en en [Github](https://github.com/aspnet/EntityFrameworkCore) puedes clonar el codigo a tu computadora y explorar los detalles de softwaere.
La ultima version es 2.1 al momento de escribir este articulo.

Versión | Fecha de lanzamiento|  Detalles
--------| --------------------|-----------
2.1     | 30 Mayo 2018        |[Announcing Entity Framework Core 2.1](https://blogs.msdn.microsoft.com/dotnet/2018/05/30/announcing-entity-framework-core-2-1/)
2.0     | 14 Agosto 2017      |[Announcing Entity Framework Core 2.0](https://blogs.msdn.microsoft.com/dotnet/2017/08/14/announcing-entity-framework-core-2-0/)
1.1     | 16 Noviembre 2016   |[Announcing Entity Framework Core 1.1](https://blogs.msdn.microsoft.com/dotnet/2016/11/16/announcing-entity-framework-core-1-1/)
1.0     | 27 Junio 2016       |[Announcing Entity Framework Core 1.0](https://blogs.msdn.microsoft.com/dotnet/2016/06/27/entity-framework-core-1-0-0-available/)

# Principales componentes
Entity framework Core utiliza los siguientes  espaciones de nombres 

```Microsoft.EntityFrameworkCore```
```System.ComponentModel.DataAnnotations.Schema```
```System.ComponentModel.DataAnnotations```

Las clases principales son :

```DbContext<>```
```DbSet<>```


# Ejemplo simple . 1 C

El siguiente ejemplo se crea una clase llamada ```Producto``` a partir de aqui se muestra la tablas creada en en SQL Server .

## Proyecto

Se crea un proyecto de consola con 2 clases. 
Se crea la base de datos MySql, SqlServer , Sqlite 

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

6. Abrir visual estudio code. Si asi lo deseas puedes continuar con Visual Studio 2017 solo debes abrir la solouciin 

```bash
 code .
```
## El código 

1. Editar el archivo. clase POCO

```cs
    public class Producto
    {
        public int PId { get; set; }
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