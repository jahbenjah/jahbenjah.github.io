---
layout: post
title:  "Errores en SQL Server"
date:   2019-05-09 21:46:55 +0000
categories: slqserver
permalink: /:categories/:title:output_ext
---

Los errores cuando ejecutamos código T-SQL pueden ocurrir por distintos motivos. SQL Server clasifica los errores en errores sistema y errores definidos por el usuario. Los errores en SQL Server son almacenados en la tabla `sys.messages` 

Cada error en SQL Server tienen un `message_id`, `language_id`, `severity`, `is_event_logged` y `text`. 

Por ejemplo cuando intentas insertar un registro con donde la clave ya existe en la tabla obtienes el siguiente error

```sql
Started executing query at Line 17
Msg 2627, Level 14, State 1, Line 1
Violation of PRIMARY KEY constraint 'PK__MiTabla__3214EC072B1F39F6'. Cannot insert duplicate key in object 'dbo.MiTabla'. The duplicate key value is (1).
The statement has been terminated.
Total execution time: 00:00:00.183
```
Cuando ocurre un división entre cero se produce un error 
```sql
SELECT 1 / 0
Started executing query at Line 53
Msg 8134, Level 16, State 1, Line 1
Divide by zero error encountered.
Total execution time: 00:00:00.420
```

# Errores del sistema

Si deseas consultar los mensajes de error puedes consultar el catalogo `sys.messages`.


```sql
SELECT message_id,
       language_id,
       severity,
       is_event_logged,
       text
 FROM sys.messages
 WHERE language_id = 1033;
```
Los `message_id` que van del 1 hasta el 50000 están reservados para los errores del sistema.

Puedes consultar el estado de error de la ultima sentencia ejecutada consultando el valor de la variable global `@@ERROR` 

# Errores definidos por el usuario

Se puede usar el procedimiento almacenado `sp_addmessage` para agregar errores definidos por el usuario definiendo un `message_id` mayores a 50,000. Una cosa importante para los errores de usuario deben es que primero se debe crear la version en ingles porque si no existe se producirá un error

 Por ejemplo

```sql
USE master;  
GO  
EXEC sp_addmessage @msgnum = 50001, @severity = 16,   
   @msgtext = N'The product %s already exists in table %s.',   
   @lang = 'us_english';  
GO

EXEC sp_addmessage @msgnum = 50001, @severity = 16,   
   @msgtext = N'El producto  %s ya existen en la tabla %s.',   
   @lang = 'Spanish'; 
```


Otras funciones del sistema para consultar más detalles del error son

```sql
ERROR_LINE
ERROR_MESSAGE
ERROR_PROCEDURE
ERROR_SEVERITY
ERROR_STATE
```


# Referencias

[Errores del motor de base de datos](https://docs.microsoft.com/sql/relational-databases/errors-events/database-engine-events-and-errors?view=sql-server-2017)

[@@ERROR](https://docs.microsoft.com/sql/t-sql/functions/error-transact-sql?view=sql-server-2017)

[sys.messages](https://docs.microsoft.com/sql/relational-databases/system-catalog-views/messages-for-errors-catalog-views-sys-messages?view=sql-server-2017)

[add_message](https://docs.microsoft.com/sql/relational-databases/system-stored-procedures/sp-addmessage-transact-sql?view=sql-server-2017)