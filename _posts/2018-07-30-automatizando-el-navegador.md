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
Este artículo representa una guía paso a paso para automatizar el inicio de sesion de Facebok usando Selenuim , xunit.net . 
Se asume que tienes instalado el SDK de .NET Core y el editor de código Visual Studio Code.

Se creará el proyecto usando la linea de comandos para .NET Core. El proyecto puede ejecutarse en Visual Studio.

## Preparando el proyecto en Visual Studio Code
Para realizarlo ejecuta en la terminal o consola los siguientes comandos. Ejecuta línea por línea ya que se colocarón más de 
un comando por descripción.
1. Se creará una solución llamada AutomatizarNavegador y dos proyectos de consola, el primero llamado Facebook y el 
segundo proyecto  FacebookTest.
```sh
  dotnet new sln -o AutomatizarNavegador
  dotnet new console -o AutomatizarNavegador/Facebook
  dotnet new xunit -o AutomatizarNavegador/FacebookTest
```
2 .Agregar los proyectos a la solución,
```sh
  dotnet sln AutomatizarNavegador/AutomatizarNavegador.sln add AutomatizarNavegador/Facebook/Facebook.csproj
  dotnet sln AutomatizarNavegador/AutomatizarNavegador.sln add AutomatizarNavegador/FacebookTest/FacebookTest.csproj
```
3. Agregar los paquetes de nuget al proyecto Facebook.
```sh
   dotnet add AutomatizarNavegador\Facebook\Facebook.csproj package Selenium.WebDriver
```
4. El proyecto FacebookTest tendra una referencia al proyecto Facebook para poder utilizarlo.
```sh
  dotnet add AutomatizarNavegador\FacebookTest\FacebookTest.csproj reference AutomatizarNavegador\Facebook\Facebook.csproj
  dotnet add AutomatizarNavegador\FacebookTest\FacebookTest.csproj package Selenium.Firefox.WebDriver
  dotnet add AutomatizarNavegador\FacebookTest\FacebookTest.csproj package Selenium.Chrome.WebDriver
```

## El codigo. 


### Page Object
El primero con clases que tienes como única función proporcionar la funcinalidad para 
manipular los controles del la pagina de inciio de sesion de Facebook. Esta clase intenta seguir el patrón de diseño 
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

Puedes encontrar el código fuentes en el repositorio ()[]