---
layout: post
title:  "Reseña Microsoft Build 2019"
date:   2019-05-11 21:18:55 +0000
categories: eventos
permalink: /:categories/:title:output_ext
image:
  path: /img/og-msbuild2019.jpg
  height: 324
  width: 619
---

La conferencia para desarolladores estelar de Microsoft es Build. Este año fue el pasado 5, 6 y 8 de Mayo en Seattle Estados Unidos y con transmisión en vivo de algunos eventos Youtube y una gran actividad en redes sociales.
Es una conferencia con muchos temas y grandes expositores y sobre todo muchos anuncios de nuevas versiones, características y herramientas de desarrollos en este articulo te compartimos nuestros puntos que consideramos claves

Esta sucede cada año en el mes de mayo desde el 1991

## .NET Core,ASP.NET Core, Entity Framework Core, .NET 5

Se liberaron nuevas versiones previas para:

* [.NET Core 3.0 Previo 5](https://devblogs.microsoft.com/dotnet/announcing-net-core-3-0-preview-5/)
* [ASP.NET Core 3.0 Previo 5](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-core-3-0-preview-5/)
* [Entity Framework 6.3 soporte previo para .NET Core](https://devblogs.microsoft.com/dotnet/announcing-entity-framework-6-3-preview-with-net-core-support/)

Se libero el mapa de ruta para ASP.NET Core donde se establece que para septiembre sale la versión 3.0 y para 2020  una nueva version llamada .NET 5.0 que unificara todos los "runtimes" de .NET

<img data-src="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2019/05/dotnet_schedule.png" class="lazyload"  alt="Plataforma .NET 5.0">

Básicamente se establece que la versión 4.8 de .NET Framework será la última y solo se mantendrá soporte sin agregar nuevas características ya que todas los esfuerzos de los equipos de desarrollo serán para .NET Core. Recomiendan que todo los nuevos proyectos sean basados en .NET Core y solo migrar los que requieren las nuevas características.

<img data-src="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2019/05/dotnet5_platform.png" class="lazyload"  alt="Plataforma .NET 5.0">

Las dos referencias obligadas son:

1. [.NET Core is the Future of .NET](https://devblogs.microsoft.com/dotnet/net-core-is-the-future-of-net/)
2. [Introducing .NET 5](https://devblogs.microsoft.com/dotnet/introducing-net-5/)

## Anuncios de Windows Subsystem for Linux

Estos anuncios son de mi interés porque me encanta usar la linea de comandos (aunque no soy nada bueno en ello) y la nueva Terminal de Windows te permite usar las CLI, Dos, PowerShell, Bash y WSL 2. Adicionalmente con WSL2 sera posible instalar Docker.

*[Nueva Windows Terminal](https://devblogs.microsoft.com/commandline/introducing-windows-terminal/)

<img data-src="https://devblogs.microsoft.com/commandline/wp-content/uploads/sites/33/2019/05/terminal-screenshot.png" class="lazyload"  alt="Terminal de Windows">

*[WSL 2](https://devblogs.microsoft.com/commandline/announcing-wsl-2/)

## Anuncios de Azure

Los anuncios relacionados con Azure se recopilan en la siguiente página :

[Anuncios sobre Azure en Microsoft Build 2019](https://azure.microsoft.com/build-2019/announcements/)

Estos tienen un gran alcance porque abarcan gran cantidad de temas pasando pro <abbr lang="en" title="Artificial Intelligence">AI</abbr>, Contendores, Bases de datos , Seguridad , Internet de las Cosas y Devops.

## Donde ver las sesiones de Microsoft Build 2019

Puedes ver las sesiones de Microsoft Build 2019 en la página oficial del evento o en el canal de [Microsoft Developer](https://www.youtube.com/channel/UCsMica-v34Irf9KVTh6xx-g) :

[Lista de reproducción Microsoft Build 2019](https://www.youtube.com/playlist?list=PLlrxD0HtieHgspNIlv1x2H5_cxSRm7B17)

## Sesiones recomendadas

0. [Full stack web development with ASP.NET Core 3.0 and Blazor](https://www.youtube.com/watch?v=y7LAbdoNBJA&list=PLlrxD0HtieHgspNIlv1x2H5_cxSRm7B17&index=110)
1. [.NET Platform Overview and Roadmap](https://www.youtube.com/watch?v=ZlO1utbB2GQ&list=PLlrxD0HtieHgspNIlv1x2H5_cxSRm7B17&index=38&t=0s)
2. [What’s new with WSL](https://www.youtube.com/watch?v=9ZqeyTjX0TQ)
3. [Windows Terminal: Building a better command line experience for developers](https://www.youtube.com/watch?v=KMudkRcwjCw&t=11s)
4. All the Developer Things with Hanselman and Friends