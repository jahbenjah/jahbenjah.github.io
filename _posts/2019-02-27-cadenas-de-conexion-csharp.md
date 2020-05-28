---
layout: post
title:  "Crear cadenas de conexión con C#"
date:   2019-02-27 12:00:01 +0000
categories: connectionstring
image:
  path: /img/og-connectionstring.webp
  height: 358
  width: 683
last_modified_at: 2020-04-09 22:24:25 +0000
description: Cadena de conexión SQL Server, MySQL, Oracle, PostgreSQL, Firebird y SQLite usando la clase ConnectionStringBuilder de .NET Core usando C# . 
---

Una cadena de conexión es un conjunto de claves y valores separados por punto y coma *;* . El conjunto de claves y valores esta conectado por el signo de igual por ejemplo `clave1=valor1;clave2=valor2`. El conjunto de claves y valores disponibles están definidos por el fabricante de la base de datos y muchas veces hay inconsistencias entre las claves de deferentes proveedores de base de datos.

En este tutorial te muestro como crear, manipular y validar la cadena de conexión para SQL Server, MYSQL, Oracle, Firebird, PostgreSQL y Sqlite usando C# y .NET Core. Para ello utilizamos la clase `ConnectionStringBuilder` que implementan los proveedores de **ADO.NET**. Para cada proveedor de ADO.NET es necesario instalar el paquete de Nuget correspondiente e importar el espacio de nombres con la instrucción [using]({% post_url 2019-01-03-cuatro-formas-de-usar-la-palabra-clave-using-de-csharp %}).

<img src="/img/connectionstring.webp" loading="lazy"  alt="Pantalla de Visual Studio que muestra la definicion de la clase SqlConnectionStringBuilder">

En el caso más simple puedes crear la cadena de conexión forma manual y hacerlo de forma programática seria un desperdicio de tiempo (ver el caso para SQLite) pero en ocasiones puede ser un verdadero martirio por el número de claves necesarios  y como ejemplo una cadena de conexión para SQL Server con 9 claves.

```
Data Source=.;Initial Catalog=master;User ID=sa;Password=PasswordO1.;MultipleActiveResultSets=True;Connect Timeout=100;Encrypt=False;Application Name=MyApp;Current Language=spanish

```

# Cadena de conexión SQL Server C#

Para el caso de SQL Server hay 2 variantes de la cadena de conexión y depende de si usas la autenticación integrada de Windows o un usuario de SQL. Generalmente es preferible usar un usuario y contraseña de SQL Server para aplicar el [principio de menor autoridad](https://es.wikipedia.org/wiki/Principio_de_m%C3%ADnimo_privilegio).

Los ejemplos siguientes funcionan en la mayoría de las versiones de SQL Server desde la 2008 , 2012, 2014 , 2016 ,2017 y 2019 en Windows. Para SQL Server 2016 y posteriores también tienen soporte para Linux.

## Cadena de conexión SQL Server usando la autenticación de Windows

En el caso de que uses la autenticación de Windows puedes usar el siguiente ejemplo de cadena de conexion para SQL Server. Esto lo que hacer es reutilizar las credenciales del usuario de Windows para conectate a SQL Server.

```
Data Source=.;Initial Catalog=master;Integrated Security=True
```
 
 Es importante asegurate que el parámetro `Integrated Security` no lo uses en combinación con con un usuario y contraseña SQL Server toma utiliza la autenticación de Windows en lugar de la de SQL Server.


## Cadena de conexión SQL Server con usuario y contraseña

Para el caso de SQL Server podemos especificar la dirección IP del servidor donde se encuentra la instancia de SQL Server pero también puedes utilizar un punto `.` o `localhost` en caso de que el servidor se encuentre en nuestra máquina de desarollo o el nombre de la instancia de SQL Server en caso de que esta sea diferente a la default por ejemplo `SqlServer\NombreInstancia`.

```clean

Data Source=192.168.0.1;Initial Catalog=master;User ID=sa;Password=TuContraseña;Application Name=MyApp

Data Source=.;Initial Catalog=master;User ID=sa;Password=TuContraseña;Application Name=MyApp

Data Source=localhost;Initial Catalog=master;User ID=sa;Password=TuContraseña;Application Name=MyApp
```

> **Para obtener el nombre de la instancia de SQL Server** puedes ejecutar la consulta `SELECT @@SERVERNAME + '\' + @@SERVICENAME AS NombreSQLServerInstancia;`

## Usando una instancia con nombre de SQL Server

En el caso de que uses una instancia con nombre de SQL Server debes especificar el nombre seguidor del servidor seguido por el nombre de la instancia. Esto también aplica para la version de SQL Server conocida como [LocalDb](https://docs.microsoft.com/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver15)

```clean
Server=(localdb)\mssqllocaldb;Database=Blogging;Trusted_Connection=True;Application Name=MyApp
```

## Parámetros adicionales  

Es importante notar la presencia del parámetro **Application Name** este campo se puede utilizar para identificar que acciones ejecuta una aplicación y es muy util en el diagnostico de problemas de desempeño en [SQL Server Profiler](https://docs.microsoft.com/sql/tools/sql-server-profiler/sql-server-profiler?view=sql-server-2017) . Es recomendable siempre incluirlo.


## Crear una cadena de conexión para SQL Server

Paquete de Nuget es : [System.Data.SqlClient](https://www.nuget.org/packages/System.Data.SqlClient/) y el espacio de nombres `System.Data.SqlClient`.

Para poder generar la cadena cadena de conexión de SQL Server usando C# puedes ejecutar el siguiente código

```csharp
SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
builder.DataSource = "192.168.100.154";
builder.InitialCatalog = "master";
builder.UserID = "sa";
builder.Password = "Password";
builder.ApplicationName = "MyApp";
Console.WriteLine(builder.ConnectionString);
```

## Validar una cadena de conexión SQL Server con C#

Una forma de validar que una cadena de conexión es abriendo la comunicación con con la base de datos. Aquí solo mostramos la forma de hacerlo con SQL Server pero es muy similar para los de mas proveedores de ADO.NET.

```csharp
using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
{
    try
    {
        connection.Open();
        Console.WriteLine("Conexión válida");
    }
    catch (Exception exception)
    {
        Console.WriteLine(exception.Message);
    }
}
```

## Verificar la versión de SQL Server

 Para verificar la version que tiene la instancia de SQL Server usando el lenguaje de programación C# puedes ejecutar el siguiente código de que lee la variable global `@@version` de SQL Server.

```cs
using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
{
    try
    {
        connection.Open();
        SqlCommand command = new SqlCommand("SELECT @@Version AS Version;", connection);
        SqlDataReader reader = command.ExecuteReader();
        if (reader.HasRows)
        {
            while (reader.Read())
            {
                Console.WriteLine(reader.GetString(0));
            }
        }
        reader.Close();
    }
    catch (Exception exception)
    {
        Console.WriteLine(exception.Message);
    }
}
```

Veras una salida similar a a la siguiente

```clean
Microsoft SQL Server 2016 (SP2) (KB4052908) - 13.0.5026.0 (X64)
        Mar 18 2018 09:11:49
        Copyright (c) Microsoft Corporation
        Enterprise Evaluation Edition (64-bit) on Windows 10 Pro N 10.0 <X64> (Build 18362: ) (Hypervisor)
```


# Cadena de conexión MySQL

1. Ejemplo de cadena de conexión para MySQL

```clean
server=localhost;database=sakila;user id=root;password=password;port=3304
```

2. Paquete de Nuget es : [MySql.Data](https://www.nuget.org/packages/MySql.Data/) y el espacio de nombres `MySql.Data.MySqlClient`.

3. Para poder crear esta cadena de conexión se uso el código

```csharp
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

# Cadena de conexión Oracle

1. Ejemplo de cadena de conexión para Oracle

```clean
USER ID=hr;PASSWORD=hr;PERSIST SECURITY INFO=True;DATA SOURCE=192.168.100.147:1521/orcl;CONNECTION TIMEOUT=250
```

2. Paquete de Nuget es : [Oracle.ManagedDataAccess.Core](https://www.nuget.org/packages/Oracle.ManagedDataAccess.Core/) y el espacio de nombres `Oracle.ManagedDataAccess.Client`.

3. Para poder crear esta cadena de conexión se uso el código

```csharp
OracleConnectionStringBuilder builder = new OracleConnectionStringBuilder();
builder.DataSource = "192.168.100.147:1521/orcl";
builder.UserID = "user";
builder.PersistSecurityInfo = true;
builder.Password = "password";
builder.ConnectionTimeout = 250;
Console.WriteLine(builder.ConnectionString);
```

4. Para validar la cadena de conexión y verificar la version de una base de datos Oracle podemos ejecutar el siguiente código de C#.

```csharp
using (OracleConnection connection = new OracleConnection(builder.ConnectionString))
{
    try
    {
        connection.Open();
        Console.WriteLine("Conexión válida");
        OracleCommand command = new OracleCommand("SELECT BANNER FROM v$version;", connection);
        OracleDataReader reader = command.ExecuteReader();
        if (reader.HasRows)
        {
            while (reader.Read())
            {
                Console.WriteLine(reader.GetString(0));
            }
        }
        else
        {
            Console.WriteLine("Sin resultados.");
        }
        reader.Close();
    }
    catch (Exception exception)
    {
        Console.WriteLine(exception.Message);
    }
}
```

A continuación se muestra un ejemplo de salida

```clean
Oracle Database 11g Enterprise Edition Release 11.2.0.2.0 - Production
PL/SQL Release 11.2.0.2.0 - Production
"CORE	11.2.0.2.0	Production"
TNS for Linux: Version 11.2.0.2.0 - Production
NLSRTL Version 11.2.0.2.0 - Production
```

# Cadena de conexión Firebird

1. Ejemplo de cadena de conexión para [Firebird](http://www.firebirdsql.org/)

```clean
initial catalog=MyDB;user id=user;port number=556;password=Admin;character set=utf8
```

2. Paquete de Nuget es : [FirebirdSql.Data.FirebirdClient](https://www.nuget.org/packages/FirebirdSql.Data.FirebirdClient/) y el espacio de nombres `FirebirdSql.Data.FirebirdClientt`.

3. Para poder crear esta cadena de conexión se uso el código

```csharp
FbConnectionStringBuilder builder = new FbConnectionStringBuilder();
builder.Database = "MyDB";
builder.UserID = "user";
builder.Port = 556;
builder.Password = "Admin";
builder.Charset = "utf8";
Console.WriteLine(builder.ConnectionString);
```

# Cadena de conexión SQLite

1. Ejemplo de cadena de conexión para SQLite

```clean
data source=blogging.db
```

2. Paquete de Nuget es : [System.Data.SQLite.Core](https://www.nuget.org/packages/System.Data.SQLite.Core/) y el espacio de nombres `System.Data.SQLite`.

3. Para poder crear esta cadena de conexión se uso el código

```csharp
SQLiteConnectionStringBuilder builder = new SQLiteConnectionStringBuilder();
builder.DataSource = "blogging.db";
Console.WriteLine(builder.ConnectionString);
```

# Cadena de conexión PostgreSQL

1. Ejemplo de cadena de conexión para PostgreSQl

```clean
Host=192.168.102.145;Database=my_db;Username=user;Password=password
```

2. Paquete de Nuget es : [Npgsql](https://www.nuget.org/packages/Npgsql/) y el espacio de nombres `Npgsql`.

3. Para poder crear esta cadena de conexión se uso el código

```csharp
NpgsqlConnectionStringBuilder builder = new NpgsqlConnectionStringBuilder();
builder.Host = "192.168.102.145";
builder.Database = "my_db";
builder.Username = "user";
builder.Password = "password";
builder.ApplicationName = "";
Console.WriteLine(builder.ConnectionString);
```

# Conclusión

Es importante mencionar que para cada base de datos hay una gran cantidad de parámetros que se pueden agregar a una cadena de conexión y estos cambian de dependiendo con cada proveedor. Muchos de ellos tienes un nombre que permite deternminar su función pero de otros es necesario que veas la documentación del proveedor. En Visual Studio o Visual Studio Code puedes ver los parámetros que contiene cada base de datos usando Intellisense o Presionando F12 para ir a la definición del tipo.
