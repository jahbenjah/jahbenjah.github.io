---
layout: post
title:  "Convenciones de código para T-SQL"
date:   2019-04-24 21:18:55 +0000
categories: slqserver
permalink: /:categories/:title:output_ext
last_modified_at: 2019-04-26 11:04:25 +0000
---

Programar es una acto de comunicación entre humanos y computadoras. Si bien las maquinas solo requieren que el código fuente cumpla con las reglas de sintaxis del lenguaje, nosotros los programadores requerimos un poco más para poder entender el código, este debe estar formateado de forma que permita ser legible a primera vista, el estilo de código debe ser consistente, los identificadores deben ser entendibles y pronunciables.

En este post esbozo lo que considero pueden ser unas buenas practicas de codificación para el lenguaje **T-SQL** esto solo es basado en mi experiencia personal y lo he visto en bases de datos de otras personas.Seria bueno que cada equipo de trabajo defina las practicas y convenciones de código a seguir por todos los miembros y ayudarse de alguna herramienta de análisis estático de código para hacer cumplir estas reglas.

~~Actualmente no conozco un programa que formate el código  o algún analizador de código estático para **T-SQL**~~ por lo que si conoces alguno por favor házmelo saber en un comentario.

Por comentarios recibidos en Facebook

1. Los proveedores RedGate o ApexSQL pueden tener herramientas para ello. (Por revisar)
2. [Poor SQL](http://poorsql.com/) Se ve muy bueno lo estoy probando con SQL Server Data Tools 2015 ya que para Visual Studio 2019 la instalación dio error.

* La palabras claves de T-SQL las colocare en mayúsculas. Esto puede cambiar si se cambia el _collation_ del servidor.

```sql
SELECT Nombre , 
       Telefono 
FROM Ventas.Clientes
WHERE Pais = 'México'
ORDER BY Nombre ASC;
```

* Siempre terminare las sentencias con punto y coma `,`. Aunque para SQL Server son opcionales.

* Usare _Pascal Case_ para los nombres de los objetos soportados por SQL Server. Esto incluye tablas, vistas , procedimientos almacenados, disparadores, indices, restricciones, esquemas y funciones.

* Usare preferentemente identificadores regulares.

```sql
--Evitrar el uso de identificadores irregulares
CREATE VIEW 'Ventas Mensuales'
AS
...
```

* Preferiré las funciones de sql estándar en lugar de una función particular de T-SQL. Lo importante de esto es identificar el caso de uso especifico para las funcionalidades brindadas por SQL Server. 

* Incluiré preferentemente el nombre del esquema al que pertenece las tablas o vistas.

* No usare el **snake case** o prefijos en los nombres de los objetos.

```sql
-- evitar el uso de prefijos
CREATE TABLE t_Ventas 
...
CREATE PROCEDURE sp_Reporte
...
CREATE VIEW v_Vista
...
```

* Usare como delimitadores la comillas simpless `'`. Evitare el uso de los corchetes cuadrados.

* Especificaré las fechas en el formato 'YYYYMMDD HHMMSS'  

```sql
SELECT SUM(Total) AS Total 
FROM Ventas.Pedidos
WHERE Fecha  =  '20192404'
```

* Siempre usare los alias usando la palabra clave `AS`.

* Tener una especificación de abreviaturas usadas con el significado. A pesar de que estoy en contra de usar abreviaturas parece que hay casos donde el uso de abreviaturas parace legitimo , como es el caso de las restricciones ya que hay una tabla del sistema donde se especifican los tipos como `PK` ,`FK`

|Abreviatura|Significado|Comentario|
|-|-|-|
|PK|PRIMARY KEY|Clave primaria|
|FK|FOREIGN KEY|Clave Foránea |

* Evitar el uso del `JOIN` con la sintaxis de *SQL-92* es decir el que especifica las tablas en el `FROM`.

```sql
-- Evitar
SELECT ProductName,
	   CategoryName 
FROM Products , Categories
WHERE Products.CategoryID = Categories.CategoryID ;
```

* Evitar el uso del `GO TO` y `GO`. Por extraño que parezca el `GO` no es parte de **T-SQL* y es un separador de lotes de código.

* Definir una plantilla para comentarios del código. Como ejemplo el que viene con el _Management Studio_ Puedes personalizar en el menu _Tools > Code Snnipets Manage_

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
```