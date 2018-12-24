---
layout: post
title:  "Web scraping con C#"
date:   2018-12-24 00:00:01 +0000
categories: Web scraping C# advientocsharp dotnet selenium
---

Actualmente hay datos a montones y día con dia la información disponible en internet aumenta de forma considerable por ello cuando se requiere extraer gran cantidad de información de un sitio web es preciso ayudarse de técnicas automatizadas como el: _Web Scraping_. 

![Web Scraping]({{"/img/webscraping.jpg" | absolute_url }} "Inspección de página web")

La definición de Wikipedia:

> Web scraping es una técnica utilizada mediante programas de software para extraer información de sitios web. Usualmente, estos programas simulan la navegación de un humano en la World Wide Web ya sea utilizando el protocolo HTTP manualmente, o incrustando un navegador en una aplicación. (_Wikipedia_)

El propósito de este articulo es mostrar una forma de extraer datos de una página web y almacenarlos en un base de datos para su posterior uso. Esto lo realizaremos incrustando el navegador Chrome en una aplicación escrita en el lenguaje de programación C#.

El proceso utilizado para realizar la extracción es:

1. Decidir que información es la que se requiere extraer de un  sitio Web. Esta puede ser el precio de un producto, los contactos de un directorio.

2. Inspeccionar la pagina Web objetivo para determinar donde se encuentran los datos para extraer. Para ello puedes utilizar las herramientas de desarrollador de Chrome. Es necesario saber un poco de HTML,CSS y Javascript. En cuanto se posible puedes identificar los elementos HTML por ID , etiqueta , clase, selector css o ruta XPATH. En ocasiones la información puede estar dentro de los atributos.

3. Determinar el formato de salida requerido.Este puede ser desde la impresión en consola hasta una base de datos relacional. 

# Descripción de la página

Nuestro proposito es generar una copia local del catálogo de libros y categorías de http://books.toscrape.com esta es una pagina especifica para hacer Web scraping. Contiene un catalogo de 1000 libros con información ficticia . El catalogo esta compuesto de 50 paginas en cada pagina se muestran 20 libros. Cada uno de estos libros tiene una pagina donde se muestran los detalles del mismo.

La paginas del catalogo tiene la siguiente estructura http://books.toscrape.com/catalogue/page-n.html donde n es 1 ....50

La pagina de detalles tiene la siguiente estructura http://books.toscrape.com/catalogue/chronicles-vol-1_462/index.html

# El código

El cdigo de para este articulo esta disponible en el siguiente repositorio https://github.com/jahbenjah/WebScrappingCSharp esta compuesto por 4 proyectos.

|Proyecto  |Tipo|Descripción|
-----------|----|-----------|
|AppCore   |Biblioteca de clases .NET Core|Proyecto que contiene entidades y Page Object de la página a extraer datos|
|AppData   |Biblioteca de clases .NET Core|Proyecto que contiene el código e acceso a a datos usa Entity Framework Core|
|AppConsole|Proyecto de Consola .NET Core|Usa los dos proyectos anteriores para realizar la extracción de datos. |
|AppTest   |Proyecto de pruebas xunit.NET|Utiliza pruebas unitarias para realizar la extracción|
 

Debemos navegar desde las paginas desde 
http://books.toscrape.com/catalogue/page-1.html
...
http://books.toscrape.com/catalogue/page-50.html
 y extrer los 
URL 
Marcas
HTML
Parsear
Navegar por el arbol
Codigo de etica
Constante refactorizacion
selectores css

https://docs.microsoft.com/en-us/ef/core/modeling/relationships


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

Aquí puedes  revisar tus cambios en el Team Explorer. Y ejecutar tu primer commit para guardar

5. 
