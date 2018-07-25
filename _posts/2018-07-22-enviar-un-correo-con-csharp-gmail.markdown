---
layout: post
title:  "Enviar un correo con C# y Gmail."
date:   2018-07-22 12:30:55 +0000
categories: .net smtp SmptClient dotnet 
---

# Cómo enviar un correo usando C# #

En el desarrollo de software empresarial enviar correos electronicos es un requerimiento muy frecuente  y en este post te mostramos como hacerlo usando C# y Visual Studio Code.


![Revisando el correo electrónico]({{"/img/adult-business-businessman-1061588.jpg" | absolute_url }} "Email en negocios")

Este articulo representa una guia paso a paso para enviar un correo electrónico usando C# y una cuenta de Gmail.
Se usa .Net Core para poder ejecurarlo en Linux , Mac y Windows.

Puedes revisar la documentación en [SmtpClient](https://docs.microsoft.com/en-us/dotnet/api/system.net.mail.smtpclient?view=netframework-4.7.2)

## Configuración de Gmail ##


![alt text]({{"/img/AccesoAplicacionesMenosSeguras.PNG"|absolute_url}} "Pantalla de gmail")
 Permitir el acceso a aplicciones no seguras para GMAIL. tal como se descrbe aqui
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
