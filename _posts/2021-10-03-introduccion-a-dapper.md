---
layout: post
title:  "Introduccion a Dapper con C#"
date:   2021-05-31 10:00:01 +0000
categories: dotnet
image:
  path: /img/og-connectionstring.webp
  height: 358
  width: 683
last_modified_at: 2020-04-09 22:24:25 +0000
description: Dapper un micro ORM que permite escribir codigo de acceso a datos con C#. Se puede usar con SQL Server, MySQL, Oracle, PostgreSQL, Firebird y SQLite. 
---

Dapper es un conjunto métodos de extension de la interface `IDbConnection`. Es una libreria de código abierto desarrollada y mantenida por miembros del equipo de [Stack Overflow](https://stackoverflow.com/).

El codigo de Dapper se encuentra alojado en [Github](https://github.com/DapperLib/Dapper)

Al implementar métodos de extension sobre `IDbConnection` le permite funcionar con cualquier proveedor de ADO.NET.

## Métodos de extensión

Los métodos de extension sobre IDbConnection que proporciona Dapper son 3

* Query
* Execute

## Instalación de Dapper

Dapper es un paquete de Nuget por lo que puede ser instalado de multiples formas. Para instalar Dapper en un proyecto con .NET Core o .NET 5 puedes usar la linea de comandos dotnet, Visual Studio y su interfaz gráfica para intalar paquetes. El siguiente comando instala la ultima versión de Dapper:

```cmd
dotnet add package Dapper
```

Es importante mencionar que es necesario ejecutar el comando en la ubicación del proyecto.

## Usando Dapper en un proyecto de consola

```sql

```

```cs
string sql = "SELECT  * FROM Clientes";
using var connection = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=minimalAPI;Integrated Security=True;");
var clientes = connection.Query<Cliente>(sql).ToList();
```

## Dapper vs Entity Framework

Una de las ventajas de Dapper sobre Entity Framework Cores es la velocidad pero con el detalle que tienes que escribir codigo SQL. A pesar de realizar la misma funcion los puedes usar en conjunto.

## Como ejecutar un store procedure con Dapper

Para ejecutar un procedimiento almacenado con Dapper puedes usar el siguiente codigo:
s