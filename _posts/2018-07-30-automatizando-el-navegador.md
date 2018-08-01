---
layout: post
title:  "Automatizando el Navegador con C# y Selenium."
date:   2018-07-30 22:30:55 +0000
comments: true
categories: C# selenium testing xunit dotnet 
---



![Controlando un titere.]({{"/img/blurred-background-dolls-fashion-935019.jpg" | absolute_url }} "Metofora de automatizacón")
> "Selenium es un conjunto de herramientas para automatizar navegadores web  atraves de multiples plataformas.
  ...Selenium puede ser controlado por multiples lenguajes de progrmacion y frameworks de pruebas."  
<cite>[SeleniumHQ]()</cite>

Todas la tareas repetitivas se tien
## 
Este artículo representa una guía paso a paso para automatizar el inicio de sesion de Facebok usando C#, Selenuim , xunit.net . 
Se asume que tienes instalado el SDK de .NET Core y el editor de código Visual Studio Code o Visual Studio 2017.

Se creará el proyecto usando la linea de comandos para .NET Core. El proyecto puede ejecutarse en Visual Studio 2017.

## Preparando el proyecto .NET Core con _dotnet_ CLI.
Para realizarlo ejecuta en la terminal o consola los siguientes comandos. Ejecuta línea por línea ya que se colocarón más de 
un comando por descripción.
1. Se creará una solución llamada AutomatizarNavegador y dos proyectos de consola, el primero llamado Facebook y el 
el nombre del segundo proyecto es FacebookTest.
```sh
dotnet new sln -o AutomatizarNavegador
dotnet new console -o AutomatizarNavegador/Facebook
dotnet new xunit -o AutomatizarNavegador/FacebookTest
```
2 .EJecutar el comando `cd AutomatizarNavegador` para abrir la carpeta  del proyecto. Agregar los proyectos a la solución mediante los siguientes comandos.
```sh
dotnet sln add Facebook/Facebook.csproj
dotnet sln add FacebookTest/FacebookTest.csproj
```
3. Abrir la carpeta el proyecto Facebook y agregar el paquete `Selenium.WebDriver` al proyecto Facebook. Este paquete define un conjunto de interfaces que permiten controlar el Navegador.
Existen diferentes que han proveedores que han implementado el WenDrive de Selenium como son: Chrome, Firefox, Internet Explorer, Safari Opera entre otros. 
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

## El codigo. 


### _Page Object_ del inicio de sesion de Facebok
El primero proyecto tiene como única función proporcionar la funcinalidad para manipular los controles del la página de incio de sesión de Facebook.Es decir permite ingresar el usuario,
contraseña y presionar el boton iniciar sesión. Contiene 3 constantes de solo lectura que permiten identificar 

Esta clase intenta seguir el patrón de diseño 
[Page Object](https://martinfowler.com/bliki/PageObject.html) descrito por @martinfowler y popularizado por @selenium.

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
El segundo projecto ejectua pruebas unitarias sobre el primer proyecto. Para ello se utiliza el framework [xunit.net](https://xunit.github.io/) 
esta clase en un proyecto . 

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

Para ejecutar desde la linea de comandos puedes usar `dotnet test` o `dotnet xunit`

Para ejecutar con Visual Studio abre el abre  _Menu Pruebas  > Ventanas  > Explorador De Pruebas_

![Visual Studio 2017.]({{"/img/vs2017.PNG" | absolute_url }} "Ejecucion de pruebas unitarias.")

## Para llevar.

Puedes encontrar el código fuentes en el (repositorio del blog)[https://github.com/jahbenjah/CodigoBlog].