---
layout: post
title:  "Como instalar .NET Core"
date:   2021-05-01 12:00:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/instalacion-net5-1.png
  height: 358
  width: 683
last_modified_at: 2021-05-01 12:00:01 +0000
description: Aprende como instalar .NET Core o .NET 5 en tu computadora con alguna version del sistema operativo Windows. 
---

En este tutorial les enseñare cómo instalar .NET Core en Windows. Básicamente es una instalación como cualquier otra aplicación en Windows con el apoyo de un asistente lo que la convierte en el famoso "Siguiente Siguiente" pero hay unos puntos que valen la pena resaltar:

* La compatibilidad entre las distintas versiones de Windows y las diferentes versiones de .NET Core o .NET 5.
* Opciones habilitadas por default.
* Lo que el instalador hace por nosotros.

## Compatibilidad de Windows con .NET Core y NET 5

Debido a la existencia de múltiples versiones del sistema operativo Windows en necesario revisar los posibles problemas de compatibilidad es importante que verifiques en la documentación tabla antes de poder instalar .NET Core y para evitar que tengas problemas.

Si quieres verificar la versión que tienes de Windows que tienes instalada puedes ejecutar el siguiente procedimiento:

1. Clic inició y escribir "configuración" en la barra de búsqueda.
2. Posteriormente dar clic en la aplicacion llamada *Configuración* que tiene un icono de un engrane.
3. Seleccionar la opción *_Sistema_* y en navegar a la sección de hasta abajo *"Acerca de"*
4. Ir a la sección *"Especificaciones de Windows"* acerca de ahí donde te dice la versión que tienes. Como se muestra en la imagen.

<img src="/img/version-windows.png" loading="lazy" alt="Captura de pantalla del Especificaciones de Windows para verificar la versión de Windows 10.">

```text
Edición	Windows 10 Home Single Language
Versión	20H2
Se instaló el ‎05/‎01/‎2021
Compilación del SO 19042.928
Experiencia Windows Feature Experience Pack 120.2212.551.0
```

## Descarga e Instalación

El Kit de Desarrollo de Software para .NET Core o SDK por sus siglas en ingles (Software Development Kit) es un conjunto de programas que permiten desarrollar y ejecutar aplicaciones con la plataforma .NET se incluyen compiladores, gestor de paquetes, plantillas de proyectos y más.

Para instalar el SDK de .NET Core en el sistema operativo Windos necesitas seguir las instrucciones.

1. Descarga el SKD de .NET Core desde la [página oficial](https://dotnet.microsoft.com/download)
2. Ejecuta el instalador __dotnet-sdk-5.0.202-win-x64.exe__ y presiona instalar.

<img src="/img/instalacion-net5-1.png" loading="lazy" alt="Captura de pantalla del Instalador de .NET 5 en Windows 10.">

3. Te saldrá una pantalla solicitando autorizar la ejecución del instalador. Acepta y espera que finalice.

<img src="/img/intalacion-net5-2.png" loading="lazy" alt="Captura de pantalla del Instalador de .NET 5 en Windows 10.">

Después de que el SDK ha finalizado de instalarse, abre una "Símbolo de Sistema o Powershell" y usa la herramienta de linea de comando `dotnet` para asegurarte que todo está funcionando:

```cmd
>dotnet --version

5.0.101
```

Puedes obtener más información acerca de tú plataforma con la opción `--info`:

```bash
dotnet --info
SDK de .NET (que refleje cualquier global.json):
 Version:   5.0.101
 Commit:    d05174dc5a

Entorno de tiempo de ejecuci¢n:
 OS Name:     Windows
 OS Version:  10.0.19042
 OS Platform: Windows
 RID:         win10-x64
 Base Path:   C:\Program Files\dotnet\sdk\5.0.101\

Host (useful for support):
  Version: 5.0.1
  Commit:  b02e13abab

.NET SDKs installed:
  5.0.101 [C:\Program Files\dotnet\sdk]

.NET runtimes installed:
  Microsoft.AspNetCore.App 5.0.1 [C:\Program Files\dotnet\shared\Microsoft.AspNetCore.App]
  Microsoft.NETCore.App 5.0.1 [C:\Program Files\dotnet\shared\Microsoft.NETCore.App]
  Microsoft.WindowsDesktop.App 5.0.1 [C:\Program Files\dotnet\shared\Microsoft.WindowsDesktop.App]

To install additional .NET runtimes or SDKs:
  https://aka.ms/dotnet-download
```

## Que hace el instalador de .NET Core por mi

1. Agrega el comando `dotnet` a la varible de entorno PATH. Si vienes de programar en Java esto es algo que tenias que hace manual.

2. Incluye el gestor de paquete Nuget.

3. Instala los NET Y ASP.NET Core.

4. Instala el compilador Roslyn

> **Nota sobre la telemetría** El equipo de .NET ha decidido activar la recopilación de datos de uso y problemas con las herramientas de linea de comandos de .NET Core esto ha causado polémica. Para más detalles ve [Telemetría del SDK de .NET Core](https://docs.microsoft.com/es-es/dotnet/core/tools/telemetry)

## Ver un video

Puedes ver la version en video de este tutorial aquí:

<div class="video-responsive">
<iframe loading="lazy" src="https://www.youtube.com/embed/PODqaqpgS2I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
