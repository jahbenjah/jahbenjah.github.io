---
layout: post
title:  "Control de versiones: Sql Server y git"
categories: slqserver
permalink: /:categories/:title:output_ext
---

En este artículo te mostramos como agregar el control de código fuente a una base de datos en SQL Server.Para ello utilizamos [SQL Server Data Tools 2019 (SSDT)](https://docs.microsoft.com/es-es/sql/ssdt/download-sql-server-data-tools-ssdt?view=sql-server-2017).

El motivo de esta aproximación a desarrollo de bases de datos me surgió cuando me toco darle mantenimiento a una aplicación de ASP.NET WebForms que hace un uso excesivo de procedimientos almacenados (más de 300) y la base de datos contiene casi toda la lógica de la aplicación. En este contexto encontré que había muchos problemas en la calidad del código y el proceso para desplegar una nueva instancia de la base de datos por ejemplo:

* Los despliegues de una nueva base de datos se hacían realizando un respaldo de la base de datos de un desarrollador (que en teoría es la buena) y restaurando este respaldo en  la base del nuevo servidor. Aquí frecuentemente pasa que los servidores no tenían las mismas versiones lo que ocasionaba que el respaldo no funcionara.

* Procedimientos que por su nombre indicaban que fueron copiados y renombrados para corregir o agregar nuevas funcionalidades por ejemplo `procedimientoNew` , `procedimientoOld` `procedimiento757` y cosas similares a esas. Cuando una modificación no funcionaba regresaban al respaldo y estas copias permanecen el la base de datos. En ocaciones también contenían comentarios que especificaban las fechas y modificaciones realizadas.

* Referencias a objetos de base de datos no existentes. En procedimientos almacenados se invocaban a otros procedimientos especificando en nombre con tres partes `base.esquema.procedimiento` el problema es que la base de datos ha cambiado de nombre pero no se actualizarón estos procedimientos . Consultas que incluían columnas de tablas que ya no existían porque fueron renombradas.

* Problemas de formato y estandarización de convenciones de código. Para mas detalle ver [Convenciones de código par T-SQL]({% post_url 2019-04-24-convenciones -de-codigo-tsql %})

La existencia de este tipo de problemas en el desarrollo de bases de datos solo me llevaban a decirme a mi mismo:

> "Debe haber un mejor forma de llevar el desarrollo de una base de datos."

El escenario ideal con el que me gustaría trabajar en el desarrollo de base de datos es tener un entorno de desarrollo con todas las características modernas y la confianza que brinda el control de código fuente. Esto es precisamente lo que te brinda el SQL Server Data Tools ya que integra las características de Visual Studio junto con el poder del controlador de versiones más popular [git](https://git-scm.com/).

<img data-src="/img/DevopsDeployment.webp" class="lazyload"  alt="Proceso de despliegue de una base de datos">

Se considera el escenario donde tenemos una base de datos en SQL Server y queremos generar de los archivos del código *T-SQL* para agregarlos en un repositorio git. Posteriormente puedes alojarlo en GitHub, Azure Repos, Gitlab o cualquier otro servicio que soporte git. 

En mi caso particular uso Gitlab dentro de mi trabajo.

# Requisitos

Para obtener SQL Server Data Tools asegurate de instalar la carga de trabajo de **Almacenamiento Procesamiento de Datos** de Visual Studio 2019.

<img data-src="/img/DatosWorkload.webp" class="lazyload"  alt="Carga de trabajo de Almacenamiento y procesamiento una base de datos">

Adicionalmente debes tener instalado git. Puedes verificar que git esta instalado con el comando:

```
git --version
```

Con esto instalado puedes crear proyectos de bases de datos SQL Server desde cero y tener acceso a las herramientas para comparar esquemas y datos.

<img data-src="/img/NuevoProyectoBD.webp" class="lazyload"  alt="Nuevo Proyecto de base de datos SQL Server">

# Proyecto

1. Ejecuta Visual Studio 2019 y seleccionar la opción continuar sin código

2. Abrir el explorador de Objetos de SQL server mediante: **Ver** > **explorador de Objetos de SQL Server** o mediante la combinación de teclas `Control+| , Control+S`

3. En el explorador agregar una nueva conexión a la base de datos SQL Server de la cual queremos generar los archivos del código. <img data-src="/img/AddSqlServer.webp" class="lazyload"  alt="Agregar SQL Server" />

4. En el explorador de objetos de SQL Server seleccione el la base de datos y presione el clic derecho para seleccionar **Crear una nueva Base de datos**

<img data-src="/img/NuevoProyectoBD.webp" class="lazyload"  alt="Nuevo proyecto de BD SQL Server">

5. Configurar las opciones del importación del proyecto de bases de datos. Asegurarse que esta seleccionada la opción de agregar al control de código para agregar

<img data-src="/img/AddDataBases.webp" class="lazyload"  alt="Nuevo proyecto de BD SQL Server">

Con esto ya tenemos el código T-SQL de todos los objetos de base de datos en un repositorio git local. Con esto podemos empezar a refactorizar el código llevando un control de los cambios. Generalmente uso un analizador estático e código para ayudarme a encontrar problemas frecuentes y uso la comparación de esquemas para actualizar mis cambios en la base de datos.

## Agregar un remoto

Funciona de la misma manera para todos los sitios que soporten Git. Esto se puede hacer mediante Visual Studio en  el *Team Explorer* o mediante linea de comandos.

 1. Crear el repositorio en Github y obtener la URL del repositorio.
 2. Agregar el remoto mediante linea de comandos   `git remote add origin <https://github.com/user/repo.git>`.
 3. Confirmar cambios `git commit -m "Se agrega control de código fuente"`
 4. Actualizar con el repositorio remoto `git push origin master`

Con esto  damos un paso para llegar a tener efectivamente un proceso de integración continua para la base de datos.

# Para llevar

* Hay un reporte anual sobre el estado de Devops para la base de datos ::[The 2019 State of Database DevOps](https://www.red-gate.com/solutions/database-devops/report-2019)

* Hay un formato de archivo llamado de Dacpac para desplegar bases de datos.

* Hay una formateador para código T-SQL gratuito  [Poor Man's T-SQL Formatter](https://poorsql.com/) que funciona como una extension para Visual Studio

* Hay un Framework para pruebas unitarios para código t-sql [TSQLT](https://tsqlt.org/)
