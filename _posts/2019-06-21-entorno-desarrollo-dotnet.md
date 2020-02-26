---
layout: post
title:  "Un entorno de desarollo para .NET"
categories: dotnet csharp
---

Una de las primeras preguntas que surgen cuando uno inicia a programar es : ¿Qué aplicaciones necesito para iniciar a programar?. Pues cómo es común en el mundo del desarrollo de software la respuesta es un depende, depende del lenguaje de programación elegido y el tipo de programas que deseas desarrollar. En este articulo enlistamos un conjunto de aplicaciones que se pueden utilizar en el desarrollo de programas con **C#** y para el desarollar aplicaciones web. Algunos son requeridos y otros opcionales ya que se utilizan ocasionalmente.

La forma ideal en la que esperaba escribir este articulo era tener una forma automatizada de crear el entorno en vez de instalar de forma casi artesanal aplicación por aplicación esto no me ha sido posible hasta ahora por lo que he decidido iniciar con un listado. Como un usuario principalmente del sistema operativo Windows he encontrado difícil el modo de automatizar la creación del entorno de desarollo por las herramientas y además porque le tengo cierta aversión a PowerShell y he encontrado que podría ayudar con esto.

Espero poder generar una reseña de cada uno y encontrar una forma de automatizar la instalación de los mismos. A continuación la lista de programas que siempre quiero tener cuando uso una nueva máquina.


* [dotnet SDK](https://dotnet.microsoft.com/download). He instalado el SDK desde la versión 1.0 tanto en Windows como en Linux y creo que usar la linea de comandos para instalarlo es lo mas genial. Varias veces he empezado generar un archivo de Vagrant con los comandos de instalación pero hasta ahora no me he decido a terminarlo . Siempre le desactivo la telemetría que esta activa por default.

* [Visual Studio 2019](https://visualstudio.microsoft.com): Visual Studio 2019 permite realizar una instalación tomando como base un archivo con extensión *.vsconfig* que especifica las cargas de trabajo de la instalación. Creo que es una opción para iniciar el entorno cuando alguien nuevo se incorpora al equipo por lo que mis proyectos incluyen este archivo en el control de código fuente.  
    * Roslynator
    * IntelliCode
    * Github Extension
* [Visual Studio Code](https://code.visualstudio.com/)
    * Markdown preview
    * Git Lens
    * VSCode ICons
* [ReSharper Command Line Tools](https://www.jetbrains.com/resharper/features/command-line.html)
* [Notepad++](https://notepad-plus-plus.org/)
* [XML Notepad](https://www.microsoft.com/en-us/download/details.aspx?id=7973)
* [Git](https://gitforwindows.org/)
* [JustDecompile](https://www.telerik.com/products/decompiler.aspx)
* [SQL Server Developer Edition](https://www.microsoft.com/sql-server/sql-server-downloads)
* [SQL Server Management Studio](https://docs.microsoft.com/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-2017)
* [Azure Database Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download?view=sql-server-2017)
* [Chrome](https://www.google.com.mx/chrome/index.html)
* [Postman](https://www.getpostman.com/)
* [Virtual Box](https://www.virtualbox.org/)
* [Vagrant](https://www.vagrantup.com/)
* [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

Al final creo que cada como programador he generado un gusto o dependencia a algunas herramientas de tal forma que siempre deseo que estén en la máquina que utilizo. Este articulo muestra algunas de las aplicaciónes que he encontrado útiles a lo largo de mi corta aun carrera en el desarrollo de software. ¿Cuál es es la aplicación que no puede faltar en tu máquina para programar?