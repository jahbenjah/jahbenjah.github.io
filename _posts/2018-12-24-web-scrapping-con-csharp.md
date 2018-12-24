---
layout: post
title:  "Web scraping con C#"
date:   2018-12-24 00:00:01 +0000
categories: Web scraping C# advientocsharp dotnet selenium
---

Actualmente hay datos a montones y día con dia la información disponible en internet aumenta de forma considerable por ello cuando se requiere extraer gran cantidad de información de un sitio web es preciso ayudarse de técnicas automatizadas como el: _Web Scraping_. 

![Web Scraping]({{"/img/webscraping.jpeg" | absolute_url }} "Inspección de página web")

De acuerdo con la definición de Wikipedia:

> Web scraping es una técnica utilizada mediante programas de software para extraer información de sitios web. Usualmente, estos programas simulan la navegación de un humano en la World Wide Web ya sea utilizando el protocolo HTTP manualmente, o incrustando un navegador en una aplicación. (_Wikipedia_)

El propósito de este articulo es mostrar una forma de extraer datos de una página web y almacenarlos en un base de datos para su posterior uso. Esto lo realizaremos incrustando el navegador Chrome en una aplicación escrita en el lenguaje de programación C#.

El proceso utilizado para realizar la extracción es:

1. Decidir que información es la que se requiere extraer de un  sitio Web. Esta puede ser el precio de un producto, los contactos de un directorio.

2. Inspeccionar la pagina Web objetivo para determinar donde se encuentran los datos para extraer. Para ello puedes utilizar las herramientas de desarrollador de Chrome. Es necesario saber un poco de HTML,CSS y Javascript. En cuanto se posible puedes identificar los elementos HTML por ID , etiqueta , clase, selector css o ruta XPATH. En ocasiones la información puede estar dentro de los atributos.

3. Determinar el formato de salida requerido.Este puede ser desde la impresión en consola hasta una base de datos relacional. 

# Descripción de la página

Nuestro proposito es generar una copia local del catálogo de libros y categorías de http://books.toscrape.com esta es una pagina especifica para hacer Web scraping. Contiene un catalogo de 1000 libros con información ficticia . El catalogo esta compuesto de 50 paginas en cada pagina se muestran 20 libros. Cada uno de estos libros tiene una pagina donde se muestran los detalles del mismo.

La paginas del catalogo tiene la siguiente estructura http://books.toscrape.com/catalogue/page-n.html donde _n_ es 1 ....50. Para extraer los 1000 libros es necesario acceder a cada una de las 50 paginas del catalogo por lo que necesitamos una forma de generar estas url.

Una forma de solucionar parte del problema (la generación de las url) es creando un método que lo realice por nosotros:
```cs

    public static List<string> GetCatalogoUrls()
    {
        List<string> urls = new List<string>();
        for (int i = 1; i <= 50; i++)
        {
                urls.Add($@"http://books.toscrape.com/catalogue/page-{i}.html");
        }
        return urls;
    }
```

La otra parte del problema es ordenar a Chrome para que navegue por estas urls. Para esto no ayudara **Selenium WebDriver** y ChromeDriver. El método GetDriver configura las opciones que nos permiten ejecutar Chrome y controlarlo desde C#.
```cs
    public static IWebDriver GetDriver()
    {
        var user_agent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36";
        ChromeOptions options = new ChromeOptions(); 
        options.AddArgument("--disable-gpu");
        options.AddArgument($"user_agent={user_agent}"); 
        options.AddArgument("--ignore-certificate-errors");
        IWebDriver driver = new ChromeDriver(Directory.GetCurrentDirectory(), options);
        return driver;
    }
```

Con esto es posible controlar una instancia de Chrome hacerlo navegar por las 50 urls. Esto es lo que realiza el método NavagarPorElCatalogo

```cs
public static void NavagarPorElCatalogo()
{
    var driver = GetDriver();
    driver.Manage().Window.Maximize();

    foreach (var url in GetCatalogoUrls())
    {
       driver.Navigate().GoToUrl(url);
    }
}
```

La pagina de detalles tiene la siguiente estructura http://books.toscrape.com/catalogue/chronicles-vol-1_462/index.html

# El código

El código de para este articulo esta disponible en el siguiente repositorio https://github.com/jahbenjah/WebScrappingCSharp esta compuesto por 4 proyectos.

|Proyecto  |Tipo|Descripción|
-----------|----|-----------|
|AppCore   |Biblioteca de clases .NET Core|Proyecto que contiene entidades y Page Object de la página a extraer datos|
|AppData   |Biblioteca de clases .NET Core|Proyecto que contiene el código e acceso a a datos usa Entity Framework Core|
|AppConsole|Proyecto de Consola .NET Core|Usa los dos proyectos anteriores para realizar la extracción de datos. |
|AppTest   |Proyecto de pruebas xunit.NET|Utiliza pruebas unitarias para realizar la extracción|

## Extraccion categorias

![Categorias]({{"/img/categoriasbd.PNG" | absolute_url }} "Resultado de la extracción de categorias")

Debemos navegar desde las paginas desde 
http://books.toscrape.com/catalogue/page-1.html
...
http://books.toscrape.com/catalogue/page-50.html
 y extrer los 


# Para llevar 

> Un gran poder conlleva una gran responsabilidad. tío Ben

* Siempre es bueno apegarse a un Código de ética por ejemplo el de la ACM [Código de Ética y Conducta Profesional de ACM](https://www.acm.org/about-acm/code-of-ethics-in-spanish)