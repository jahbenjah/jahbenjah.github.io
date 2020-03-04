---
layout: post
title:  "Procedimientos almacenados"
categories: slqserver
permalink: /:categories/:title:output_ext
---

Un procedimiento almacenado en SQL Server es un conjunto de instrucciones T-SQL o CLR que se agrupan para ejecutarse de forma conjunta. Pueden aceptar o no parámetros de entrada y salida, pueden regresar o no uno o varios conjuntos de resultado y regresar un código de estado.

## Ejecutar un procedimiento almacenado SQL Server

Para aprender como ejecutar un procedimiento almacenado usaremos los procedimientos almacenados del sistema `sp_server_info` y `sp_helptext`  y la instrucción `EXECUTE` o su equivalente más corto `EXE`

```sql
EXECUTE sp_server_info
```

##