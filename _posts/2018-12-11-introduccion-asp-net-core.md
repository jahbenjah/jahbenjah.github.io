---
layout: post
title:  "Introducción a ASP.NET Core"
date:   2018-12-11 12:30:55 +0000
comments: true
categories: asp.net core mvc dotnet aspnetcore
---
**ASP\.NET Core** es un *framework* para desarrollo web de código abierto, ligero, modular y multiplataforma creado por Microsoft con aportes de la comunidad.

Revisemos cada una de estas características:

**Framework de código abierto** Es algo que para muchos todavía parece increíble: 
> [Microsoft](https://octoverse.github.com/projects) esta ente los principales contribuidores a proyectos de Código Abierto.

Es posible que camino de .NET y Microsoft en el software libre haya iniciado con la liberación de la [**Especificación del Lenguaje C#**](https://www.ecma-international.org/publications/standards/Ecma-334.htm) en el 2003. Pero por ahora solo basta mencionar que todo código y documentación de ASP\.NET Core esta alojado en la más reciente adquisición de Microsoft: **Github**. Puedes explorar los detalles de cada línea de código, revisar y reportar incidencias \(*issues*\), ver el plano de ruta ,aportar con tu propio código y/o documentación.

Aquí la lista de repositorios relevantes para ASP.NET Core:

1. Código de ASP\.NET Core https://github.com/aspnet/AspNetCore
2. Repositorio de anuncios de ASP\.NET Core: https://github.com/aspnet/Announcements
3. Repositorio de la documentación https://github.com/aspnet/Docs

**Ligero** ASP\.NET Core puede correr en los sistemas operativos Windows, Mac OS y Linux y no esta atado a ningún IDE (_Visual Studio_) , Servidor Web (_IIS_) o Sistema Operativo (_Windows_) ya que puedes editar el código con tu editor favorito y compilar y desplegar tu aplicación desde la linea de comandos del SDK : `dotnet` .

**Modular**: ASP.NET Core esta compuesto por más de 95 paquetes _Nuget_ independientes que permiten usar solo las funciones deseadas sin estar obligado a usar todas las características del framework. Al esta compuesto por demasiados paquetes es posible que hayas pensado que es necesario aprenderse cada uno de los paquetes pero te comento que a partir de la version 2.0 no es necesario ya que existen los meta-paquetes que se encargan de referencias todos los paquetes necesarios para una aplicación web.

## Versiones 

La última versión al momento de escribir este artículo es la 2.2.

Actualmente hay 2 versiones principales con varias versiones menores y estimo que a mediados del 2019 este disponible la versión 3.0.Puedes revisar los detalles y características nuevas de cada version en el anuncio de la liberación realizado por algún miembro el equipo de desarrollo de ASP\.NET Core.

Versión | Fecha de lanzamiento|  Detalles
--------| --------------------|-----------
2.2| 04 Diciembre 2018   |[Announcing ASP.NET Core 2.2](https://blogs.msdn.microsoft.com/webdev/2018/12/04/asp-net-core-2-2-available-today/)
2.1| 30 Mayo 2018   |[ASP.NET Core 2.1.0 now available](https://blogs.msdn.microsoft.com/webdev/2018/05/30/asp-net-core-2-1-0-now-available/)
2.0|14 Agosto 2017  |[Announcing ASP.NET Core 2.0](https://blogs.msdn.microsoft.com/webdev/2017/08/14/announcing-asp-net-core-2-0/)
1.1|16 Noviembre 2016|[Announcing the Fastest ASP.NET Yet, ASP.NET Core 1.1 RTM](https://blogs.msdn.microsoft.com/webdev/2016/11/16/announcing-asp-net-core-1-1/)
1.0|27 Junio 2016|[Announcing ASP.NET Core 1.0](https://blogs.msdn.microsoft.com/webdev/2016/06/27/announcing-asp-net-core-1-0/)

 Aunque es posible  crear aplicaciones con un editor de textos sencillo y la linea de comandos es probable que prefieras usar el entorno de desarrollo integrado estrella de Microsoft Visual Studio o el editor de código Visual Studio Code.

Espera más detalles de como preparar tu entorno de desarrollo para ASP.NET Core en la siguiente entrega.

* Para llevar

Dos artículos que te pueden ayudar a entender el como Microsoft comenzó a apoyar el código abierto:

1. Mads Torgersen, [How Microsoft rewrote its C# compiler in C# and made it open source](https://medium.com/microsoft-open-source-stories/how-microsoft-rewrote-its-c-compiler-in-c-and-made-it-open-source-4ebed5646f98)
2. Beth Massi, [Building an Open Source .NET Foundation](https://medium.com/microsoft-open-source-stories/building-an-open-source-net-foundation-2fa0fb117584)