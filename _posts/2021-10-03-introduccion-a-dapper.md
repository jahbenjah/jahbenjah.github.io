---
layout: post
title:  "Introduccion a Dapper con C#"
date:   2021-05-31 10:00:01 +0000
categories: dotnet
permalink: /:categories/:title:output_ext
image:
  path: /img/og-connectionstring.webp
  height: 358
  width: 683
last_modified_at: 2022-09-30 10:24:25 +0000
description: Dapper un micro ORM que permite escribir codigo de acceso a datos con C#. Se puede usar con SQL Server, MySQL, Oracle, PostgreSQL, Firebird y SQLite. 
---

Dapper es una librería _Open Source_ responsable del acceso a datos compuesta por un conjunto métodos de extension de la interface `IDbConnection`. Dapper es desarrollada y mantenida por miembros del equipo de [Stack Overflow](https://stackoverflow.com/) Sam Saffron, Marc Gravell y Nick Craver. El codigo de Dapper se encuentra alojado en el repositorio de [Github](https://github.com/DapperLib/Dapper)

Al implementar métodos de extension sobre `IDbConnection` le permite funcionar con cualquier proveedor de ADO.NET. En este articulo se muestran ejemplos con Sql Server pero el mismo concepto serviría para MySQL,PostgreSql y para cualquier otra base de datos.

Dapper es reconocido por su _alto desempeño_ en ocasiones superior a las propias librerías provistas por Microsoft como por ejemplo Entity Framework Core. Aunque realizan la misma función una no es el remplazo de la otra. Dapper no cuenta con todas las caracteristicas de un ORM con EF Core y por esta misma razón se autonombra un micro ORM.

## Métodos de extensión

Los métodos de extension sobre `IDbConnection` que proporciona Dapper son 3

* Query
* Query dinamico
* Execute

## Instalación de Dapper

Dapper es un paquete de Nuget por lo que puede ser instalado de multiples formas. Para instalar Dapper en un proyecto con .NET Core o .NET 6 puedes usar la linea de comandos dotnet, Visual Studio y su interfaz gráfica para instalar paquetes. El siguiente comando instala la ultima versión de Dapper:

```cmd
dotnet add package Dapper
```

Es importante mencionar que es necesario ejecutar el comando en la ubicación del proyecto.

En Visual Studio puedes instalar Dapper siguiendo el siguiente procedimiento.

1. Dar Clic derecho sobre el archivo de proyecto.
2. Dar Clic en la opción **Administrar paquetes de Nuget**
3. En la pestaña examinar buscar _Dapper_.
4. Seleccionar Dapper y presionar Instalar.

<img src="/img/dapperinstallvisualstudio.png" loading="lazy" alt="Captura de pantalla la instalación de Dapper en Visual Studio 2022">

## Usando Dapper en un proyecto de consola

```sql

```

```cs
string sql = "SELECT  * FROM Clientes";
using var connection = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=minimalAPI;Integrated Security=True;");
var clientes = connection.Query<Cliente>(sql).ToList();
```

## Dapper vs Entity Framework

Una de las ventajas de Dapper sobre Entity Framework Core es la velocidad pero con el detalle que tienes que escribir codigo SQL. A pesar de realizar la misma función los puedes usar en conjunto.

## CRUD Con Dapper

## Como ejecutar un store procedure con Dapper

Cuando se trata de ejecutar un Procedimiento Almacenado  hay muchos casos que pueden ocurrir por ejemplo:

* que el Store regrese 1 conjunto de datos.
* que regresen múltiples conjuntos de datos.
* que regresen a escalar o numero de filas afectadas.
* que no regresen nada

Para ejecutar un procedimiento almacenado con Dapper puedes usar el siguiente codigo:

```cs

```

<div class="video-responsive">
<iframe  loading="lazy" src="https://youtu.be/n7JwJDm4uVU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
