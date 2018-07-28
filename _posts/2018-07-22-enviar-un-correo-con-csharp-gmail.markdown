---
layout: post
title:  "Enviar un correo con C# y Gmail."
date:   2018-07-22 12:30:55 +0000
categories: .net smtp SmptClient dotnet 
---
En el desarrollo de software empresarial enviar correos electronicos es un requerimiento muy frecuente y en este post te mostramos como hacerlo usando C#, .Net Core 2.0  y Visual Studio Code.
Actualemente existen varias librerias para enviar correos sin embargo en este post se utiliza la clase [SmtpClient](https://docs.microsoft.com/en-us/dotnet/api/system.net.mail.smtpclient?view=netframework-4.7.2) 
parte  de .NET Standard 2.0.

# Cómo enviar un correo usando C# #
![Revisando el correo electrónico]({{"/img/adult-business-businessman-1061588.jpg" | absolute_url }} "Email en negocios")

Este articulo representa una guia paso a paso para enviar un correo electrónico usando C# y una cuenta de Gmail.
Se asume que esta instadoa el SDK de [.NET Core](https://www.microsoft.com/net/download) y [Visual Studio Code](https://code.visualstudio.com/). Adicionalmente se creara una solucion para poder abrir el proyecto con Visual Studio.

Se creara una blblioteca de clases que tiene como unica funcion enviar correos. Despues se  esta clase en un proyecto de consola. Esta clase se puede usar en cualquier otrp tipo de proyectos que soporte .NET Standard.
El caso de uso que abarca esta clase es : Una aplicacion tiene asignada una  de correo con el cual envia todos los correos a las cuentas necesarias.

## Configuración de Gmail ##

Es necesario permitir el  permitir el acceso a aplicaciones no seguran desde la configuración de Gmail tal como se describe aqui ![alt text]({{"/img/AccesoAplicacionesMenosSeguras.PNG"|absolute_url}} "Pantalla de gmail")
[](https://support.google.com/accounts/answer/6010255?hl=es-41).

La configuracion para el cliente de SMTP de acuredo  a la (documentación de Gmail)[https://support.google.com/mail/answer/7126229?visit_id=1-636683482170517029-2536242402&hl=es&rd=1] es la siguiesnte

Parametro | Valor
------------ | -------------
Servidor de correo saliente (SMTP) | smtp.gmail.com
Requiere SSL| Sí
Requiere SSL: Sí
Requiere TLS| Sí (si está disponible)
Requiere autenticación| Sí
Puerto para TLS/STARTTLS| 587
Nombre completo o nombre mostrado|	Tu nombre
Nombre de la cuenta, nombre de usuario o dirección de correo electrónico|	Tu dirección de correo electrónico completa
Contraseña|Tu contraseña de Gmail

Con esta configuraicon se creara un archivo xml que la aplicacion leera al momento que se crea una instancia de e la clase. 
Este tiene el proposito que si se cambia la contraseña o la cuenta no sea necesario recompilar la aplicacion nuevamente.


## Preparando el proyecto en Visual Studio Code ##

1. Solución
   
   dotnet new sln -o EnviarCorreo
   dotnet new classlib -o EnviarCorreo/EmailService
   dotnet new console -o EnviarCorreo/EmailServiceCliente
   dotnet sln EnviarCorreo/EnviarCorreo.sln add EnviarCorreo/EmailServiceCliente/EmailServiceCliente.csproj
   dotnet sln EnviarCorreo/EnviarCorreo.sln add EnviarCorreo/EmailServiceCliente/EmailServiceCliente.csproj
dotnet add EmailServiceCliente/EmailServiceCliente.csproj reference EmailService/EmailService.csproj
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
