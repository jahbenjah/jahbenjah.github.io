---
layout: post
title:  "Automatizando el Navegador con C# y Selenium."
comments: true
categories: C# selenium testing xunit dotnet 
last_modified_at: 2020-01-20 12:39:52 +0000
description: "Selenium es un conjunto de herramientas que permite automatizar navegadores usando múltiples lenguajes de programación."
---

Puedes automatizar todas las tares repetitivas que realizas en el navegador web usando un lenguaje de programación y Selenium. Este articulo es una introducción a Selenium con C# donde te mostramos como hacer cosas básicas como iniciar un navegador, presionar un botón, ingresar texto en un control, visitar una pagina web. Todo esto lo realizaremos usando una aplicación de consola de .NET Core.La version inicial de este articulo se creo con la versión 2.0 de .NET Core pero como usamos principalmente la linea de comandos el proceso es el mismo para otra version de .NET Core como la 3.1. Finalmente te mostramos como automatizar el inicio de sesión de Facebook.

<img data-src="/img/blurred-background-dolls-fashion-935019.webp" class="lazyload"  alt="Controlando un títere. Metáfora de automatización">

> "Selenium es un conjunto de herramientas para automatizar navegadores web a tráves de múltiples plataformas.
  ...Selenium puede ser controlado por múltiples lenguajes de programación y frameworks de pruebas."  
<cite>[SeleniumHQ](https://selenium.dev/)</cite>

Este artículo representa una guía paso a paso para usar Selenuim con C# se asume que tienes instalado el SDK de .NET Core y el editor de código Visual Studio Code o cuentas con una versión de Visual Studio

## Primeros pasos con Selenium y C#

Como mencionamos anteriormente Selenium nos permite automatizar las tareas que realizamos en un navegador web por lo que es muy utilizado en las pruebas automáticas de la interfaz gráfica de las aplicaciones web o para realizar [extracción de datos en la web]({% post_url 2018-12-24-web-scraping-con-csharp %}). Para comenzar necesitas una implementación de lo que ahora ya es la especificación conocida como [WebDriver](https://www.w3.org/TR/webdriver/) en nuestro caso usaremos la implementación para el navegador Google Chrome mejor conocida como [ChromeDriver](https://chromedriver.chromium.org/) pero es necesario decir que también existen implementaciones para [Edge](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/), [Firefox](https://github.com/mozilla/geckodriver) y otros. El funcionamiento de todos estos es muy similar por lo que si prefieres usar otro navegador solo cambiaran muy pocas cosas.

El ChromeDriver es archivo ejecutable que sabe como controlar el navegador Chrome y te puedes comunicar con esta aplicación usando distintos lenguajes de programación como Java, C# , Python , Ruby o Javascript por mencionar alguno. La forma más sencilla de usar este aplicación es asegurándose que este ubicada en un carpeta que se encuentre en la variable de entorno _PATH_, es decir que pueda ser invocada desde la linea de comandos.

```bash
>ChromeDriver
Starting ChromeDriver 79.0.3945.36 (3582db32b33893869b8c1339e8f4d9ed1816f143-refs/branch-heads/3945@{#614}) on port 9515
Only local connections are allowed.
Please protect ports used by ChromeDriver and related test frameworks to prevent access by malicious code.
```

Una vez que tienes el ChromeDriver descargado y accesible desde la linea de comandos podemos comenzar a controlar el navegador creando una aplicación de consola con el comando `dotnet new console -o IntroSelenium`. Posteriormente abrimos la carpeta _IntroSelenium_ e [instalamos el paquete de Nuget]() `Selenium.WebDriver` con el comando `dotnet add package Selenium.WebDriver`. Con estos simples pasos hemos instalados Selenium y tenemos todo lo necesario para iniciar.

Lo primero necesitamos es poder abrir el navegador y para ello en el método `Main` escribe el siguiente código y ejecuta la aplicación. Veras que se abre el una nueva ventada de Chrome con una leyenda _"Un software automatizado de pruebas esta controlando Chrome."_

```cs
using OpenQA.Selenium.Chrome;

namespace IntroSelenium
{
    class Program
    {
        static void Main(string[] args)
        {
            ChromeDriver driver = new ChromeDriver();
        }
    }
}
```

Para cerrar Chrome con Selenium usamos el método `Close`. Puedes colocar una espera de 5 segundo con una llamada al método `Thread.Sleep(5000);`. Para visitar una página puedes usar la propiedad `Url` del objeto `WebDriver` por ejemplo el siguiente codigo abre Chorome, visita está pagina web, espera 5 segundos y finalmente cierra el navegador.

```cs
ChromeDriver driver = new ChromeDriver();
driver.Url = "https://aspnetcoremaster.com";
Thread.Sleep(5000);
driver.Close();
```

Para controlar el estado de la ventana del navegador puedes usar el objeto `Window` que contiene los métodos `Maximize`, `Minimize` y `FullScreen`.

```cs
var window = driver.Manage().Window;
window.Minimize();
window.Maximize();
window.FullScreen();
```

## Automatizando un inicio de sesión con Selenium y C#

Para realizar la automatización de un inicio de sesión ejecuta en la terminal o consola los siguientes comandos. Ejecuta línea por línea ya que se colocaron más de un comando por descripción.

1. Se creará una solución llamada AutomatizarNavegador y dos proyectos de consola, el primero llamado Facebook y el nombre del segundo proyecto es FacebookTest.

```sh
dotnet new sln -o AutomatizarNavegador
dotnet new console -o AutomatizarNavegador/Facebook
dotnet new xunit -o AutomatizarNavegador/FacebookTest
```

2 .Ejecutar el comando `cd AutomatizarNavegador` para abrir la carpeta  del proyecto. Agregar los proyectos a la solución mediante los siguientes comandos.

```sh
dotnet sln add Facebook/Facebook.csproj
dotnet sln add FacebookTest/FacebookTest.csproj
```

3. Abrir la carpeta el proyecto Facebook y agregar el paquete `Selenium.WebDriver` al proyecto Facebook. Este paquete define un conjunto de interfaces que permiten controlar el Navegador.

```sh
cd Facebok
dotnet add package Selenium.WebDriver
```

4. Abrir el proyecto FacebookTest para agregar referencias. Este proyecto necesita una referencia al proyecto Facebook y referencias a las diferentes implementacion del WebDrive.
El web driver es un ejecutable. En nuestro caso solo agregamos soporte para Firefox y Chrome.

```sh
cd ..\FacebookTest
dotnet add reference ..\Facebook\Facebook.csproj
dotnet add package Selenium.Firefox.WebDriver
dotnet add package Selenium.Chrome.WebDriver
```

5. Con esto el proyecto esta listo para escribir el codigo. Puedes utilizar Visual Studio Code o Visual Studio 2017. Abajo se muestra la estructura de las carpetas.

```sh
|   AutomatizarNavegador.sln
|   
----Facebook
|   |   Facebook.csproj
|   |   Program.cs
|   |   
|   ----obj
|           Facebook.csproj.nuget.cache
|           Facebook.csproj.nuget.g.props
|           Facebook.csproj.nuget.g.targets
|           project.assets.json
|           
---FacebookTest
    |   FacebookTest.csproj
    |   UnitTest1.cs
    |   
    ----obj
            FacebookTest.csproj.nuget.cache
            FacebookTest.csproj.nuget.g.props
            FacebookTest.csproj.nuget.g.targets
            project.assets.json
```           

## El código.

Se compone de dos proyectos uno de consola y otro de pruebas unitarias con xunit. Aunque aquí utilizamos .NET Core y xunit.net 
es posible utilizar el .NET Framework y cualquier otro framework de pruebas (NUnit , MS Test).

### _Page Object_ del inicio de sesión de Facebok

El primero proyecto tiene como única función que es proporcionar la funcionalidad para manipular los controles de la página de incio de sesión de Facebook.
Es decir permite ingresar el usuario, contraseña y presionar el botón iniciar sesión. 

Esta clase intenta seguir el patrón de diseño 
[Page Object](https://martinfowler.com/bliki/PageObject.html) descrito por @martinfowler y popularizado por @selenium.

La clase _IniciaSesion_ contiene 3 constantes de solo lectura que permiten identificar los elementos _HTML_ de la página..
Puedes obtenerlos mediante las herramientas para desarrollador del navegador.

<img data-src="/img/InspecionarFacebook.webp" class="lazyload"  alt="Herramientas de desarrador Firefox">

El constructor requiere un objeto del tipo `IWebDriver` lo que permite ejecutar las pruebas en diferentes Navegadores

```cs
using OpenQA.Selenium;
using System;

namespace Facebook
{
    public class IniciaSesion
    {
        private readonly string Email = "email";
        private readonly string Password = "pass";
        private readonly string Inicia = "u_0_2";

        private IWebDriver _driver;
        public IniciaSesion(IWebDriver driver)
        {
            _driver = driver;
        }

        public void IngresarCorreoElectronico(string correo)
        {
            var emailElement = _driver.FindElement(By.Id(Email));
            emailElement.SendKeys(correo);
        }
        public void IngresarPassword(string password)
        {
            var passwordElement = _driver.FindElement(By.Id(Password));
            passwordElement.SendKeys(password);
        }
        public void IniciarSesion()
        {
            var iniciarSesionElement = _driver.FindElement(By.Id(Inicia));
            iniciarSesionElement.Click();
        }
    }
}
```

```cs
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Text;

namespace Facebook
{
    public class Muro
    {
        private readonly string Nombre = "div.linkWrap.noCount";
        private IWebDriver _driver;
        public Muro(IWebDriver driver)
        {
            _driver = driver;
        }
        public string GetNombre()
        {
            var NombreElement = _driver.FindElement(By.CssSelector(Nombre));
            return NombreElement.Text;
        }
    }
}
```

### Las pruebas

El segundo projecto ejecuta pruebas unitarias sobre el primer proyecto. Para ello se utiliza el framework [xunit.net](https://xunit.github.io/) esta clase en un proyecto .
El constructor de la clase se ejecuta al inicio de cada prueb e inicializa  una instancia particula del IWebDriver (FirefoxDriver o ChromeDriver)
La clase IniciaSesionTest implementa la interfaz IDisposable para ejecutar el método Dispose al final de cada prueba.

El metodo login tiene el atributo Fact que lo identifica como una prueba.
Requiere que edites y coloques tuusuario, contraseña y Nombre de Facebook para que la pueba pase de forma satisfactoria

```cs
using Facebook;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using System;
using Xunit;
using System.IO;

namespace FacebookTest
{
    public class IniciaSesionTest : IDisposable
    {
        private IWebDriver _driver;
        public IniciaSesionTest()
        {
            _driver = new ChromeDriver(Directory.GetCurrentDirectory());
            //_driver = new FirefoxDriver(Directory.GetCurrentDirectory());
            _driver.Navigate().GoToUrl("https://www.facebook.com/");
            _driver.Manage().Window.Maximize();
        }
        public void Dispose()
        {
          // _driver.Close();
        }
        [Fact]
        public void Login()
        {
            IniciaSesion login = new IniciaSesion(_driver);
            login.IngresarCorreoElectronico("");
            login.IngresarPassword("");
            login.IniciarSesion();
            var muro = new Muro(_driver);
            Assert.Equal("Benjamin Camacho",muro.GetNombre());
        }
        [Theory]
        [InlineData("usuario", "password1")]
        [InlineData("usuario2", "password2")]
        public void FailedLogin(string usuario, string contraseña)
        {
            IniciaSesion login = new IniciaSesion(_driver);
            login.IngresarCorreoElectronico(usuario);
            login.IngresarPassword(contraseña);
            login.IniciarSesion();
            var error = new ErrorLogin(_driver);
            Assert.Equal("Iniciar sesión en Facebook | Facebook", error.GetMensajeError());
        }
    }

```

## Ejecucion

Para ejecutar desde la linea de comandos puedes usar `dotnet test` o `dotnet xunit` desde la carpeta de _FacebookTest_.

Para ejecutar con Visual Studio abre la solución  AutomatizarNavegador.sln.
Posteriorment el abre  _Menu Pruebas  > Ventanas  > Explorador De Pruebas_ y selecciona ejecutar todas las pruebas.

<img data-src="/img/vs2017.webp" class="lazyload"  alt="Explorador de pruebas Visual Studio.">

## Para llevar

* Puedes encontrar el código fuente en el [repositorio del blog](https://github.com/jahbenjah/CodigoBlog).
* Revisa la documentación de la funcionalidad de [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)
* Revisa el para que sirve [Katalon Recorder](https://chrome.google.com/webstore/detail/katalon-recorder-selenium/ljdobmomdgdljniojadhoplhkpialdid)