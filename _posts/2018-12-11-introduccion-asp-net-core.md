---
layout: post
title:  "Introducción a ASP.NET Core"
categories: asp.net core mvc dotnet aspnetcore
description: Qué es ASP.NET Core y cuales son sus características principales
last_modified_at: 2020-12-27 15:32:33 +0000
---

**ASP.NET Core** es un *<span lang="en">framework</span>* para desarrollo web de código abierto, ligero, modular y multiplataforma creado por Microsoft con aportes de la comunidad.

Como es un framework de desarrollo web ASP.NET Core el propósito principal es generar HTML de forma dinámica. Esto lo hace mediante **Razor** que permite combinar el marcado en HTML con código C#.

Revisemos cada una de las características mencionadas:

**Framework de código abierto** Es algo que para muchos todavía parece increíble:
> [Microsoft](https://octoverse.github.com) esta ente los principales contribuidores a proyectos de Código Abierto.

Es posible que camino de .NET y Microsoft en el software libre haya iniciado con la liberación de la [**Especificación del Lenguaje C#**](https://www.ecma-international.org/publications/standards/Ecma-334.htm) en el 2003. Pero por ahora solo basta mencionar que todo código y documentación de ASP\.NET Core esta alojado en la más reciente adquisición de Microsoft: **Github**. Puedes explorar los detalles de cada línea de código, revisar y reportar incidencias (**issues**), ver el plano de ruta ,aportar con tu propio código y/o documentación.

Aquí la lista de repositorios relevantes para ASP.NET Core:

1. Código de ASP\.NET Core https://github.com/aspnet/AspNetCore
2. Repositorio de anuncios de ASP\.NET Core: https://github.com/aspnet/Announcements
3. Repositorio de la documentación https://github.com/aspnet/Docs

**Ligero** ASP\.NET Core puede correr en los sistemas operativos Windows, Mac OS y Linux y no esta atado a ningún IDE (_Visual Studio_) , Servidor Web (_IIS_) o Sistema Operativo (_Windows_) ya que puedes editar el código con tu editor favorito , compilar y desplegar tu aplicación desde la linea de comandos del SDK : `dotnet` .

**Modular**: ASP.NET Core esta compuesto por más de 95 paquetes _Nuget_ independientes que permiten usar solo las funciones deseadas sin estar obligado a usar todas las características del framework. Al estar compuesto por demasiados paquetes es posible que hayas pensado que es necesario aprenderse cada uno de los paquetes pero te comento que a partir de la version 2.0 no es necesario ya que existen los [metapaquetes](https://docs.microsoft.com/dotnet/core/packages#metapackages) que se encargan de referenciar todos los paquetes necesarios para una aplicación web.

<div class="video-responsive">
<iframe  src="https://www.youtube.com/embed/OfLd-Un92kY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Versiones

La última versión al momento de escribir este artículo es la 2.2.

Actualmente hay 2 versiones principales con varias versiones menores y -estimo que a mediados- del 2019 este disponible la versión 3.0. Puedes revisar los detalles y características nuevas de cada version en el anuncio de la liberación realizado por algún miembro el equipo de desarrollo de ASP\.NET Core.

Versión | Fecha de lanzamiento|  Detalles
--------| --------------------|-----------
5.0| 10 Noviembre 2020   |[Announcing ASP.NET Core in .NET 5](https://devblogs.microsoft.com/aspnet/announcing-asp-net-core-in-net-5/)
3.1| 03 Diciembre 2019   |[ASP.NET Core updates in .NET Core 3.1](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-core-3-1/)
3.0| 04 Diciembre 2018   |[ASP.NET Core and Blazor updates in .NET Core 3.0](https://devblogs.microsoft.com/aspnet/asp-net-core-and-blazor-updates-in-net-core-3-0/)
2.2| 04 Diciembre 2018   |[Announcing ASP.NET Core 2.2](https://blogs.msdn.microsoft.com/webdev/2018/12/04/asp-net-core-2-2-available-today/)
2.1| 30 Mayo 2018   |[ASP.NET Core 2.1.0 now available](https://blogs.msdn.microsoft.com/webdev/2018/05/30/asp-net-core-2-1-0-now-available/)
2.0|14 Agosto 2017  |[Announcing ASP.NET Core 2.0](https://blogs.msdn.microsoft.com/webdev/2017/08/14/announcing-asp-net-core-2-0/)
1.1|16 Noviembre 2016|[Announcing the Fastest ASP.NET Yet, ASP.NET Core 1.1 RTM](https://blogs.msdn.microsoft.com/webdev/2016/11/16/announcing-asp-net-core-1-1/)
1.0|27 Junio 2016|[Announcing ASP.NET Core 1.0](https://blogs.msdn.microsoft.com/webdev/2016/06/27/announcing-asp-net-core-1-0/)

# Entornos de desarrollo

Para desarrollar aplicaciones con ASP.NET Core necesitas el [SDK de .NET Core](https://dotnet.microsoft.com/download) que puedes descargar gratuitamente ya se para Linux, Mac o Windows.Para comprobar que tienes instalado puedes ejecutar el comando `dotnet --version` en una terminal o consola.

Aunque es posible  crear aplicaciones con la linea de comandos y un editor de textos sencillos como NotePad++ o Vim es probable que prefieras usar el entorno de desarrollo integrado. Puedes usar las siguientes opciones:

1. El IDE estrella de Microsoft : [Visual Studio 2019](https://visualstudio.microsoft.com/es/) disponible para Windows y Mac La ultima versión de Visual Studio es la 2019. Este IDE es de paga en las ediciones Profesional y Enterprise pero la edición Community es gratuita para desarrolladores de software libre y estudiantes.

1. El editor de código multiplataforma  [Visual Studio Code](https://code.visualstudio.com/). Es gratuito de código abierto y con soporte para muchos lenguajes mediante extensiones.

3. [Rider de JetBrains](https://www.jetbrains.com/rider/): Es un IDE de paga multiplataforma de los creadores de  ReSharper, DataGrip e IntelliJ. Tienen una edición gratuita para estudiantes, profesores y proyectos de software libre.

# Para llevar

Unos artículos que te pueden ayudar a entender el como Microsoft comenzó a apoyar el código abierto:

1. Mads Torgersen, [How Microsoft rewrote its C# compiler in C# and made it open source](https://medium.com/microsoft-open-source-stories/how-microsoft-rewrote-its-c-compiler-in-c-and-made-it-open-source-4ebed5646f98)
2. Beth Massi, [Building an Open Source .NET Foundation](https://medium.com/microsoft-open-source-stories/building-an-open-source-net-foundation-2fa0fb117584)
3. Scott Hunter ,[Starting the .NET Open Source Revolution](https://medium.com/microsoft-open-source-stories/starting-the-net-open-source-revolution-e0268b02ac8a)
