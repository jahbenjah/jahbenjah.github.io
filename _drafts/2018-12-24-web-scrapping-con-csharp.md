---
layout: post
title:  "Web Scrapping con C#"
date:   2018-12-24 00:00:01 +0000
categories: C# advientocsharp dotnet webscrapping
---

Lo que construioresmos

Chrome Driver
EFCore
.NET Core
Page Object Model
xunit

> Un gran poder implica una gran resposabilidad. tío Ben

1. Crear una solución en blanco en Visual Studio mediante  _Archivo > Nuevo Proyecto > Otro tipo de proyectos > Soluciones de Visual Studio > Solucion en blanco_ y asegutrate de seleccionear la opcion de _Crear un nuevo repositori Git_.
2. Crear dos carpetas de soluciones una llamada `src`  para guardar el código de la aplicacion y otro llamada `test` pruebas para las pruebas.
3. Seleccionando la carpeta de soluciones src dar clic derecho para agreggar un Nuevo proyecto
llamado AppCore. Asegurarte que este ubicado en el directorio /src.
Repetir el paso para el proyecto AppData.
4. Seleccionando la carpeta de soluciones test dar clic derecho para agreggar un Nuevo proyecto tipo Pruebas Ubitarias con Xunot.net llamado AppTest. Asegurarte que este ubicado en el directorio /test.
5. Agregar las referencias al proyecto AppTest
6 Instalar los siguienetes paquetes de Nuget para caa tipo de proyecto
AppCore : Selinum
AppData : EntityFrameworkCore
AppTest : ChromeDirver FireforxmDriver 

Aqui puedes  revisar tus cambios en el Team Explorer. Y ejecutar tu primer commit para guardar

5. 
