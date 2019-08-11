---
layout: post
title:  "Control de versiones: Sql Server y git"
date:   2019-08-09 22:30:55 +0000
categories: slqserver
permalink: /:categories/:title:output_ext
---

En este artículo te mostramos como agregar el control de código fuente a una base de datos en SQL Server existente con git.
Para ello utilizamos [SQL Server Data Tools 2019](https://docs.microsoft.com/es-es/sql/ssdt/download-sql-server-data-tools-ssdt?view=sql-server-2017).

El motivo de esta aproximación a desarrollo de bases de datos me surgió cuando me toco darle mantenimiento a una aplicación de ASP.NET WebForms que hace un uso excesivo de procedimientos almacenados (más de 300) y la base de datos contiene casi toda la lógica de la aplicación. En este contexto encontré que había muchos problemas en la calidad del código y proceso realizamos para desplegar una nueva instancia de la base de datos por ejemplo:

* Los despliegues de una nueva base de datos se hacían realizando un respaldo de la base de datos de un desarrollador (que en teoría es la buena) y restaurando este respaldo en  la base del nuevo servidor. Aquí frecuentemente pasa que los servicdores no tenian las mismas versiones del Service Pack lo que ocacionaba que el respaldo no funcionara.

* Procedimientos que por su nombre indicaban que fueron copiados y renombrados para corregir o agregar nuevas funcionalidades por ejemplo `procedimientoNew` , `procedimientoOld` `procedimiento757` y cosas similares a esas. Cuando una modificación no funcionaba regresaban al respaldo. En ocacaciones tambien contenian comentarios que especificaban las fechas y modificaciones realizadas.

* Referencias a objectos de base de datos no existentes. Habia procedimientos que invocabas a otros procedimientos especificando en nombre con tres partes `base.esquema.procedimiento` el problema es que la base de datos ha cambiado de nombre. Consultas que incluian columnas de tablas que ya no existian.

* Problemas de formato y estandarizacion de convenciones de codigo. Para mas detalle ver [Convenciones de codigo par TSQL]({% post_url 2019-04-24-convenciones -de-codigo-tsql %})

La existencia de este tipo de problemas en el desarrollo de bases de datos solo me llevaban a decirme a mi mismo:

> "Debe haber un mejor forma de llevar el desarrollo de una base de datos."

El escenario ideal con el que me gustaria trabajar en el desarrollo de base de datos es tener un entorno de desarrollo con todas las caracteristicas modernas de Visual Studio y la confianza que brinda el control de código fuente. Esto es precisamente lo que te brinda el SQL Server Data Tools.

<img data-src="/img/DevopsDeployment.png" class="lazyload"  alt="Proceso de despliegue de una base de datos">

Este articulo cubre el escenario de cuando tenemos una base de datos en SQL Servr y queremos generar de los archivos del código *T-SQL* para agregarlos en un repositorio git. Posteriormente puedes alojarlo en GitHub , Azure Repos, Gitlab o cualquier otro servicio que soporte git.

# Requisitos

Para obtener SQL Server Data Tools asegurate de instalar la carga de trabajo de **Almacenamiento Procesamiento de Datos** de Visual Studio 2019.

<img data-src="/img/DatosWorkload.JPG" class="lazyload"  alt="Carga de trabajo de Almacenamiento y procesamiento una base de datos">

Con esto instalado puedes crear proyectos de bases de datos SQL Server desde cero y tener acceso a las herramientas para comparar esquemas y datos.

<img data-src="/img/NuevoProyectoBD.PNG" class="lazyload"  alt="Nuevo Proyecto de base de datos SQL Server">

# Proyecto

1. Ejecuta Visual Studio 2019 y seleccionar la opcion continuar sin codigo

2. Abrir el explorador de Objetos de SQL server   **Ver** > **explorador de Objetos de SQL Server**

3. En el explorador agregar una nueva conexion a la base de datos SQL Server de la cual queremos generar los archivos del código.

<img data-src="/img/AddSqlServer.JPG" class="lazyload"  alt="Agregar SQL Server">

4. En el explorador de objetos de SQL Server seleccione el la base de datos y presione el clic derecho para seleccionar **Crear una nueva Base de datos**

<img data-src="/img/NuevoProyectoBD.JPG" class="lazyload"  alt="Nuevo proyecto de BD SQL Server">

5. Configurar las opciones del importación del proyector de bases de datos. Asegurarse que esta seleccionada la opcion de agregar al control de código.

<img data-src="/img/AddDataBases.JPG" class="lazyload"  alt="Nuevo proyecto de BD SQL Server">

# Agregar un remoto

Funciona de la misma manera para todos los sitios que soporten GIT. 

 1. Crear el repositorio en GITHUB.
 2. Agregar el remoto en SSDT 2018
 3. Publicar cambios

# Para llevar

* Hay un formato de archivo llamado de Dacpac para desplegar bases de datos.