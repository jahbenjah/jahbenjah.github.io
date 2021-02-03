---
layout: post
title:  "Instalación de IIS para ASP.NET Core"
date:   2021-02-02 12:00:01 +0000
categories: aspnetcore
image:
  path: /img/IIS-manager.JPG
  height: 358
  width: 683
last_modified_at: 2021-02-02 22:24:25 +0000
description: Aprende COMO instalar IIS para ASP.NET Core paso a paso y desde CERO totalmente en ESPAÑOL.
---
Contar con un ambiente en el que podamos instalar nuestra aplicación es muy importante porque nos permite probar el proceso y encontrar problemas que se pueden presentar rápidamente. Como no siempre tenemos disponible el ambiente en el que se desplegara nuestra aplicación es recomendable tener una forma de probarlo y con Windows 10 podemos cubrir este requerimiento fácilmente instalando la version completa del servidor web IIS que es diferente a la version  Express que usa Visual Studio.

## Instalar IIS en Windows 10

Para instalar IIS con soporte para ASP.NET Core en nuestra computadora de desarrollo necesitamos ejecutar dos procesos: primero instalar IIS y después instalar el modulo de ASP.NET Core que viene en el paquete conocido como [**Hosting Bundle**](https://dotnet.microsoft.com/download/dotnet/5.0) correspondiente a le version de .NET Core de nuestra aplicación.

Para instalar IIS en Window 10 ejecuta el siguiente procedimiento.

1. Abrir la aplicación **Panel de Control** y seleccionar la opción **Programas**.
2. Dar clic en la opción **Activar o desactivar las características de Windows**

> **Atajo** Puedes buscar la palabra _activar_ en la barra de búsqueda de Windows 10 para acceder rápidamente a **Activar o desactivar las características de Windows** <img src="/img/busqueda-activar.JGP" loading="lazy"  alt="Barra de busqueda Windows 10">

3. Selecciona la opción **Internet Information Services** y presiona aceptar.

<img src="/img/instalacion-IIS.JPG" loading="lazy"  alt="Internet Information Services">

Observa que estamos dejando las opciones por Default de IIS y si requieres alojar proyectos de la versión clásica de ASP.NET tienes que agregar características de _ASP.NET 4.8_ dentro del nodo **Application Development Features**.

<img src="/img/instalacion-opciones-default-IIS.JPG" loading="lazy"  alt="Opciones de instalación por default de Internet Information Services">

4. Después de completar la instalación abre la aplicación **Administrador de Internet Information Services (IIS)** . Esta se encuentra en _Panel de control\Sistema y seguridad\Herramientas administrativas._ Adicionalmente puedes visitar la dirección [http://localhost/](http://localhost/) en el navegador web para ver el sitio por default de IIS que se encuentra en la carpeta _C:\inetpub\wwwroot_.

<img src="/img/IIS-manager.JPG" loading="lazy"  alt="Captura del Administrador de Internet Information Services">

Para instalar el Hosting Bundle de ASP.NET Core ejecuta el siguiente procedimiento:

1. Descarga la versión de Hosting Bundle  correspondiente a la version que usa tu aplicación. En este caso utilizo la version 5.0.2 y descargue la aplicación _dotnet-hosting-5.0.2-win.exe_

2. Ejecuta la aplicación  _dotnet-hosting-5.0.2-win.exe_ y acepta los términos y condiciones para  iniciar la instalación: 

<img src="/img/hosting-bundle-terminos.JPG" loading="lazy"  alt="terminos y condiciones del Hosting Bundle de ASP.NET Core">

3. Cuando termine puedes verificar el modulo de **ASPNETCoreModuleV2** en el _Administrador de Internet Information Services (IIS)> Modulos_

<img src="/img/ASPNETCoreModuleV2.JPG" loading="lazy"  alt="ASPNETCoreModuleV2">

Con esto ya tienes todo disponible para instlar aplicaciones ASP.NET Core en IIS con Windows espeara mas detalles en otra entrada.