---
layout: post
title:  "Control de versiones: Sql Server y git"
date:   2018-08-20 22:30:55 +0000
categories: slqserver
permalink: /:categories/:title:output_ext
---

En este articulo te mostramos como agregar el control de código fuente a una base de datos de SQL Server con git.
Para ello utilizamos SQL Server Data Tools 2017 (https://docs.microsoft.com/es-es/sql/ssdt/download-sql-server-data-tools-ssdt?view=sql-server-2017)
aplica de la misma forma para la 2015 aunque  es un instalación independiente.

Se considera el siguiente escenario inicial: 
se tiene una base de datos en un servidor de produccion a la cual se realizan cambios comentan

El escenario ideal seria como el siguiente:

![Proceso de despliegue de una base de datos.]({{"/img/DevopsDeployment.png" | absolute_url }} "Devops para la base de datos")

Este articulo se centra en los dosprimeros pasos de la imagen.


# Requisitos

# Proyecto

Abrir el explorador de Objectos de SQL server   **Ver** > **explorador de Objectos de SQL server **
Abrir coneccion 
crear nuevo proyecto

1. Ejecuta Visual Studio 2017. Select **Archivo** > **Nuevo** > **Proyecto** desde la barra de menú. 
2. El el cuadro de dialogo *Nuevo Proyecto** , Selecionar el nodo **Otros lenguajes**  y posteriromente el nodo **Sql Server**. 
3. Despues seleccionar la plantilla **Proyecto de base de datos de SQL Server** . 
4. En el campo  **Nombre** , ingresar "Northwind". Prsionar el botón **OK**.
5. Asegurarse que el __chechbox__ este seleccionado
![Nuevo Proyecto de base de datos SQL Server.]({{"/img/NuevoProyectoBD.PNG" | absolute_url }} "Visual Studio 2017")

Dar clic en el nombre del proyecto y seleccionar importar de base de datos

## Agregar un remoto

Funciona de la misma manera para todos los sitios que soporten GIT. 
 *VSTS
 *GITHUB
 *GITLAB
 
 1. Crear el repositorio en GITHUB.
 2. Agregar el remoto en SSDT 2018
 3. Publicar cambios
 


## Inspección de código
## Corrección de errores
## Cambiar objecto y realiza la comparacion de esquemas
## Ver el historial de cambios
