---
layout: post
title:  "Introducción a C#!"
date:   2018-05-20 15:30:55 +0000
categories: jekyll update
---
# Cómo enviar un correo usando C# #
Tener la capacidad de enviar correos en una aplicación es un requerimiento muy frecuete.
Sistema de facturacion
Sistema de nomina
Registro al sitio.

Este articulo representa una guiá paso a paso para enviar un correo electrónico usando C# y una cuenta de Gmail.
Se usa .Net Core para poder ejecutarlo en Linux , Mac y Windows.

Puedes revisar la documentación en [SmtpClient](https://docs.microsoft.com/en-us/dotnet/api/system.net.mail.smtpclient?view=netframework-4.7.2)

## Configuración de Gmail ##

<img data-src="Imagenes/AccesoAplicacionesMenosSeguras.webp" class="lazyload"  alt="Gmail acceso a aplicaciones menos seguras">

 Permitir el acceso a aplicaciones no seguras para GMAIL. tal como se describe aqui
[https://support.google.com/accounts/answer/6010255?hl=es-41]

## Preparando el proyecto en Visual Studio Code ##

1. Solución
    ```sh
    dotnet new sln -n EnviarCorrreoElectronico
    ```
2. Crear un proyecto biblioteca de clases.
    ```sh
    cd EnviarCorreo
    dotnet new classlib -n EnviarCorreoElectronico
    ```
3. Agregar los proyectos a la solución
    ```sh
    dotnet sln add EnviarCorreo/EnviarCorreo.csproj
    dotnet sln add EnviarCorreo/EnviarCorreoCliente.csproj
    ```
4. Agregar la referencia al paquete de Nugget <<Microsoft.Configuration.Extensions>> 
    ```sh
    dotnet add package Microsoft.Configuration.Extensions
     ```

5. Se utilizan las clases de los espacios de nombres
    ```cs
    using System;
    using System.IO;
    using System.Net;
    using System.Net.Mail;
    using Microsoft.Extensions.Configuration;
    ```

5.Agregar un nuevo archvio xml  que contendrá los datos para ingresar a la cueta de correo.

## Clientes
### Aplicación de consola
### Aplicación Web
