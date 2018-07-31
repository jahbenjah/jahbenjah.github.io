---
layout: post
title:  "Automatizando el Navegador con C# y Selenium."
date:   2018-07-30 22:30:55 +0000
comments: true
categories: C# selenium testing xunit dotnet 
---


![Visual Studio 2017.]({{"/img/v2107.PNG" | absolute_url }} "Ejecucion de pruebas unitarias.")
![Controlando un titere.]({{"/img/blurred-background-dolls-fashion-935019" | absolute_url }} "Metofora de automatizacón")
> "Selenium es un conjunto de herramientas para automatizar navegadores web  atraves de multiples plataformas.
  ...Selenium puede ser controlado por multiples lenguajes de progrmacion y frameworks de pruebas."  
<cite>[SeleniumHQ]()</cite>

Todas la tareas repetitivas se tien
## 
Este artículo representa una guía paso a paso para automatizar el inicio de sesion de Facebok usando Selenuim , xunit.net . 
Se asume que tienes instalado el SDK de .NET Core y el editor de código Visual Studio Code.
Adicionalmente se creará una solución para poder abrir el proyecto con Visual Studio.

Se creará dos proyecto de consola para .NET Core. 
El primero con clases que tienes como única función proporcionar la funcinalidad para 
manipular los controles del la pagina de inciio de sesion de Facebook. Esta clase intenta seguir el patrón de diseño 
[Page Object](https://martinfowler.com/bliki/PageObject.html) descrito por @martinfowler y popularizado por @selenium.


El segundo projecto ejectua pruebas unitarias sobre el primer proyecto. Para ello se utiliza el framework [xunit.net](https://xunit.github.io/) 
esta clase en un proyecto de consola. Esta clase se puede usar en cualquier otrp tipo de proyectos que soporte 
.NET Standard. El caso de uso cubre está clase es : 
Una aplicación tiene asignada una cuenta de correo con la cuál envía todos los correos al destinatario especificado.

## Preparando el proyecto en Visual Studio Code
Para realizarlo ejecuta en la terminal o consola los siguientes comandos. Ejecuta línea por línea ya que se colocarón más de 
un comando por descripción.
1. Se creará una solución llamada AutomatizarNavegador y dos proyectos de consola, el primero llamado Facebook y el 
segundo proyecto  FacebookTest.
```bash
  dotnet new sln -o AutomatizarNavegador
  dotnet new console -o AutomatizarNavegador/Facebook
  dotnet new xunit -o AutomatizarNavegador/FacebookTest
```
2 .Agregar los proyectos a la solución,
```bash
  dotnet sln AutomatizarNavegador/AutomatizarNavegador.sln add AutomatizarNavegador/Facebook/Facebook.csproj
  dotnet sln AutomatizarNavegador/AutomatizarNavegador.sln add AutomatizarNavegador/FacebookTest/FacebookTest.csproj
```
3. Agregar los paquetes de nuget al proyecto Facebook.
```bash
   dotnet add AutomatizarNavegador\Facebook\Facebook.csproj package Selenium.WebDriver
```
4. El proyecto FacebookTest tendra una referencia al proyecto Facebook para poder utilizarlo.
```bash
  dotnet add AutomatizarNavegador\FacebookTest\FacebookTest.csproj reference AutomatizarNavegador\Facebook\Facebook.csproj
  dotnet add AutomatizarNavegador\FacebookTest\FacebookTest.csproj package Selenium.Firefox.WebDriver
  dotnet add AutomatizarNavegador\FacebookTest\FacebookTest.csproj package Selenium.Chrome.WebDriver
```

## El codigo. 

### Page Object

### Las pruebas 

## Ejecucion 

## Para llevar.

Puedes encontrar el código fuentes en el repositorio ()[]