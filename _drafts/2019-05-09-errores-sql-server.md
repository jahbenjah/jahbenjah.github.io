---
layout: post
title:  "Errores en SQL Server"
date:   2019-05-09 21:46:55 +0000
categories: slqserver
permalink: /:categories/:title:output_ext
---

Los errores cuando ejecutamos código T-SQL pueden ocurrir por distintos motivos. SQL Server los clasifica 

Mensajes de error en SQL Server tienen un numero de error, nivel de severidad, Estado y Mensaje de error.
```sql
Started executing query at Line 17
Msg 2627, Level 14, State 1, Line 1
Violation of PRIMARY KEY constraint 'PK__MiTabla__3214EC072B1F39F6'. Cannot insert duplicate key in object 'dbo.MiTabla'. The duplicate key value is (1).
The statement has been terminated.
Total execution time: 00:00:00.183
```

Por ejemplo cuando intentas insertar un registro con donde la clave ya existe en la tabla obtienes el siguiente error 

# Errores del sistema

Si deseas consultar los mensajes de error puedes consultar el catalogo que incluye todos los errores del sistema van del 1 al 50,000.

```sql
SELECT message_id,
       language_id,
       severity,
       is_event_logged,
       text
 FROM sys.messages
 WHERE language_id = 1033;
```

Puedes consultar el estado de error de la ultima sentencia ejecutada consultando el valor de la variable global `@@ERROR` 


# Errores definidos por el usuario

Se puede usar el procedimiento almacenos `sp_addmessage` para agregar errores con código de error mayores a 50,000 cuando asi se requiere


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

[@@ERROR](https://docs.microsoft.com/es-es/sql/t-sql/functions/error-transact-sql?view=sql-server-2017)