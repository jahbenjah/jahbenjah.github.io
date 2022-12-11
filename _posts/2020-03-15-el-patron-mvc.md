---
layout: post
title:  "Patrón MVC"
date:   2020-03-12 23:23:47 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/og-scripttaghelper.webp
  height: 331
  width: 632
description: El patrón MVC (Modelo-Vista-Controlador) es una de las arquitecturas más populares en el desarrollo de aplicaciones web. En este patrón, la lógica de negocio, la interfaz de usuario y el controlador de eventos se separan en tres componentes distintos, lo que permite una mejor organización del código y una mayor flexibilidad en el desarrollo y mantenimiento de la aplicación.
---

El patrón de diseño Modelo Vista Controlador o MVC es ampliamente utilizado en el diseño de interfaces gráficas para lograr separar las responsabilidades entre los diferentes componentes de software. Este patrón usa 3 componentes principales:
La mayoría de los frameworks para desarrollo web usan el patrón de diseño MVC

El **Modelo** es un objeto que representa alguna información especifica del dominio de la aplicación. Es un elemento no visual

La **Vista** es la representación visual del modelo y esta es su única responsabilidad 

El **Controlador** es responsable de coordinar las operaciones entre en modelo y la vista.

ASP.NET Core en .NET 7 es la última versión del marco de desarrollo web de Microsoft, que permite el desarrollo de aplicaciones web modernas y escalables utilizando el lenguajes de programación C# entre otros. Una de las principales ventajas de ASP.NET Core es que admite el patrón MVC y incluye una plantillas para iniciar con este patrón rapidamente.

##  Como crear un proyecto MVC desde la linea de comandos

Para crear una aplicación web utilizando el patrón MVC y la línea de comandos de .NET, es necesario seguir los siguientes pasos:

1. Instalar el SDK de .NET Core en el equipo. Para ello, descargue el SDK de la [página oficial de .NET 7]([dot.net/download](https://dotnet.microsoft.com/es-es/download)) y siga las instrucciones de instalación.

2. Una vez instalado el SDK, abra la línea de comandos  y cambie el directorio de trabajo al lugar donde desea crear la aplicación.

3. Utilizando el comando `dotnet new`, cree un nuevo proyecto MVC con el comando dotnet new mvc. Esto creará una estructura de directorios y archivos básica para una aplicación MVC.

4. Para compilar y ejecutar la aplicación, utilice el comando `dotnet run` desde la línea de comandos. Esto iniciará un servidor web en el equipo local y mostrará la dirección URL donde se puede acceder a la aplicación en un navegador web.


## Ventajas de usar el patrón MVC

Al utilizar el patrón MVC en ASP.NET Core, se pueden obtener varios beneficios, como:

* Separación de responsabilidades: al separar la lógica de negocio, la interfaz de usuario y el controlador en componentes distintos, se facilita la organización y mantenimiento del código.

* Reutilización de código: al tener la lógica de negocio y la interfaz de usuario separadas, se pueden reutilizar estos componentes en diferentes aplicaciones sin tener que reescribir el código.

* Mejora de la performance: al separar la lógica de negocio y la interfaz de usuario, se pueden optimizar y mejorar el rendimiento de la aplicación de manera más eficiente.

* Mayor flexibilidad: el patrón MVC permite cambiar y actualizar la interfaz de usuario sin afectar la lógica de negocio y viceversa, lo que facilita la evolución de la aplicación en el futuro.


# Desventajas del patrón MVC 

* Mayor complejidad: el patrón MVC implica separar la lógica de negocio, la interfaz de usuario y el controlador en componentes distintos, lo que puede aumentar la complejidad del código y requerir un mayor esfuerzo para entender y mantener la aplicación.

* Mayor tiempo de desarrollo: debido a la separación de responsabilidades en el patrón MVC, puede tomar más tiempo desarrollar una aplicación utilizando este patrón en comparación con otras arquitecturas.

* Dependencia del framework: al utilizar el patrón MVC, la aplicación depende del framework que se utiliza para implementarlo, lo que puede limitar la flexibilidad y portabilidad de la aplicación.
