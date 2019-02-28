---
layout: post
title:  "Crear cadenas de conexión con C#"
date:   2019-02-27 12:00:01 +0000
categories: connectionstring
image: connectionstring
---

En este tutorial te mostramos como crear la cadena de conexión para SQL Server , MYSQL, Oracle, Firebird y Sqlite usando C# y un proyecto de consola de .NET Core.

![Script Tag Helper](/img/connectionstring.PNG)

Para ello utilizamos la clase `ConnectionStringBuilder` que implementan los proveedores de ADO.NET. Para cada proveedor de ADO.NET es necesario instalar el paquete de Nuget correspondiente e importar el espacio de nombres con la instrucción [using](2019-01-03-cuatro-formas-de-usar-la-palabra-clave-using-de-csharp.md).

Es importante mencionar que para cada base de datos hay una gran cantidad de parámetros que se pueden agregar muchos de ellos tienes un nombre que permite aclarar su función pero de otros es necesario que veas la documentación del proveedor . En Visual Studio o Visual Studio Code puedes ver los parámetros que contiene cada base de datos usando Intellisense o Presionando F12 para ir a la definición del tipo.

## Cadena de conexión para SQL Server

1. Ejemplo de cadena de conexión para SQL Server

```
Data Source=192.168.0.1;Initial Catalog=master;User ID=sa;Password=TuContraseña;Application Name=MyApp
```

2. Paquete de Nuget es : [System.Data.SqlClient](https://www.nuget.org/packages/System.Data.SqlClient/) y el espacio de nombres `System.Data.SqlClient`.

3. Para poder crear esta cadena de conexión se uso el código

```
SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder()
    {
        DataSource = "192.168.0.1",
        InitialCatalog = "master",
        UserID = "sa",
        Password = "TuContraseña",
    };
builder.ApplicationName = "MyApp";
Console.WriteLine(builder.ConnectionString);
```

## Cadena de conexión para MySQL

1. Ejemplo de cadena de conexión para MySQL

```
server=localhost;database=sakila;user id=root;password=password;port=3304
```

2. Paquete de Nuget es : [MySql.Data](https://www.nuget.org/packages/MySql.Data/) y el espacio de nombres `MySql.Data.MySqlClient`.

3. Para poder crear esta cadena de conexión se uso el código

```
MySqlConnectionStringBuilder builder = new MySqlConnectionStringBuilder()
    {
        Server = "localhost",
        Database = "sakila",
        UserID = "root",
        Password = "password",
        Port = 3304,
    };
Console.WriteLine(builder.ConnectionString);
```

## Cadena de conexión para Oracle

1. Ejemplo de cadena de conexión para Oracle

```
DATA SOURCE=localhost;USER ID=root;PASSWORD=password
```

2. Paquete de Nuget es : [Oracle.ManagedDataAccess.Core](https://www.nuget.org/packages/Oracle.ManagedDataAccess.Core/) y el espacio de nombres `Oracle.ManagedDataAccess.Client`.

3. Para poder crear esta cadena de conexión se uso el código

```
OracleConnectionStringBuilder builder = new OracleConnectionStringBuilder()
    {
        DataSource = "localhost",
        UserID = "root",
        Password = "password"
    };
Console.WriteLine(builder.ConnectionString);
```

## Cadena de conexión para Firebird

1. Ejemplo de cadena de conexión para SQL Server

```
initial catalog=MyDB;user id=user;port number=556;password=Admin;character set=utf8
```

2. Paquete de Nuget es : [FirebirdSql.Data.FirebirdClient](https://www.nuget.org/packages/FirebirdSql.Data.FirebirdClient/) y el espacio de nombres `FirebirdSql.Data.FirebirdClientt`.

3. Para poder crear esta cadena de conexión se uso el código

```
FbConnectionStringBuilder builder = new FbConnectionStringBuilder();
builder.Database = "MyDB";
builder.UserID = "user";
builder.Port = 556;
builder.Password = "Admin";
builder.Charset = "utf8";
Console.WriteLine(builder.ConnectionString);
```


## Cadena de conexión para SQLite

1. Ejemplo de cadena de conexión para SQL Server

```
data source=blogging.db
```

2. Paquete de Nuget es : [System.Data.SQLite.Core](https://www.nuget.org/packages/System.Data.SQLite.Core/) y el espacio de nombres `System.Data.SQLite`.

3. Para poder crear esta cadena de conexión se uso el código

```
SQLiteConnectionStringBuilder builder = new SQLiteConnectionStringBuilder();
builder.DataSource = "blogging.db";
Console.WriteLine(builder.ConnectionString);
```
