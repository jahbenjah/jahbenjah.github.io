---
layout: post
title:  "Enviar un correo con C# y Gmail."
comments: true
categories: .net smtp SmptClient dotnet 
---

En el desarrollo de software empresarial enviar correos electrónicos es un requerimiento muy frecuente y en este tutorial te mostramos como hacerlo usando C#, .Net Core 2.0  y Visual Studio Code.
Actualmente existen varias biblioteca para enviar correos como SendGrid o MailKit, sin embargo en este tutorial se utiliza la clase [SmtpClient](https://docs.microsoft.com/en-us/dotnet/api/system.net.mail.smtpclient?view=netframework-4.7.2) 
parte  de .NET Standard 2.0.

![Revisando el correo electrónico]({{"/img/adult-business-businessman-1061588.jpg" | absolute_url }} "Email en negocios")

Este artículo representa una guía paso a paso para enviar un correo electrónico usando C# y una cuenta de Gmail.
Se asume que tienes instalado el SDK de [.NET Core](https://www.microsoft.com/net/download) y el editor de código [Visual Studio Code](https://code.visualstudio.com/). Adicionalmente se creará una solución para poder abrir el proyecto con Visual Studio.

Se creará una biblioteca de clases que tiene como única función enviar correos. Después se usa esta clase en un proyecto de consola. Esta clase se puede usar en cualquier otrp tipo de proyectos que soporte .NET Standard.
El caso de uso cubre está clase es : Una aplicación tiene asignada una cuenta de correo con la cuál envía todos los correos al destinatario especificado.

## Configuración de Gmail ##

Es necesario permitir el  permitir el acceso a aplicaciones no seguran desde la configuración de Gmail tal como se describe en la 
[documentación de Gmail](https://support.google.com/accounts/answer/6010255?hl=es-41). 

![alt text]({{"/img/AccesoAplicacionesMenosSeguras.PNG"|absolute_url}} "Pantalla de gmail")

La configuracion necesaria para el cliente de SMTP de acuerdo a la [documentación de Gmail](https://support.google.com/mail/answer/7126229?visit_id=1-636683482170517029-2536242402&hl=es&rd=1) 
es la siguiente:

Parametro    | Valor
-------------| -------------
Servidor de correo saliente (SMTP) | smtp.gmail.com
Requiere TLS| Sí (si está disponible)
Requiere autenticación| Sí
Puerto para TLS/STARTTLS| 587
Nombre completo o nombre mostrado|	Tu nombre
Nombre de la cuenta, nombre de usuario o dirección de correo electrónico|	Tu dirección de correo electrónico completa
Contraseña|Tu contraseña de Gmail

Con esta configuración se creara un archivo XML que la aplicación leerá al momento que se crear una instancia de la clase. 
Esto tiene como proposito hacer la aplicación no dependa de la configuración y en caso de ser necesario actualizar  la contraseña o cambiar la  cuenta no sea necesario recompilar la aplicación nuevamente.
```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <host>smtp.gmail.com</host>
  <port>587</port>
  <user>tucuenta@gmail.com</user>
  <password>contraseñagmail</password>
  <enableSsl>true</enableSsl>
</configuration>
```
## Preparando el proyecto en Visual Studio Code ##

Para realizarlo ejecuta en la terminal o consola los siguientes comandos. Ejecuta línea por línea ya que se colocarón más de un comando por descripción.

1. Se creará una solución llamada _EnviarCorreo_ y dos proyectos, el primero una biblioteca de clases llamada _EmailService_ y el segundo proyecto es una aplicacion de consola llamada _EmailServiceCliente_.
   
   ```sh
   dotnet new sln -o EnviarCorreo
   dotnet new classlib -o EnviarCorreo/EmailService
   dotnet new console -o EnviarCorreo/EmailServiceCliente
   ```
2. Agregar los proyectos a la solución,
   ```sh
   dotnet sln EnviarCorreo/EnviarCorreo.sln add EnviarCorreo/EmailServiceCliente/EmailServiceCliente.csproj
   dotnet sln EnviarCorreo/EnviarCorreo.sln add EnviarCorreo/EmailServiceCliente/EmailServiceCliente.csproj
   ```
3. El proyecto EmailServiceCliente tendra una referencia al proyecto EmailService para poder utilizarlo.
   ```sh
    dotnet add EnviarCorreo/EmailServiceCliente/EmailServiceCliente.csproj reference EnviarCorreo/EmailService/EmailService.csproj
    ```
4. Abir la carpeta _EnviarCorreo\EmailService_ (```cd EnviarCorreo\EmailService```) y agregar la referencia al paquete de Nuget ```Microsoft.Extensions.Configuration.Xml``` esta es necesaria para poder leer el archivo _XML_.
    ```sh    
    dotnet add package Microsoft.Extensions.Configuration.Xml
    ```
5. Crear un nuevo archvio llamado _Configuracion.xml_ xml (Windows ```type NUL > Configuration.xml``` , Linux ```touch Configuracion.xml```).

6. Abrir la carpeta _EnviarCorreo_ con Visual Studio Code.
    ```sh
    code ..
    ```
7. Editar el archivo del proyecto _EnviarCorreo\EmailService_ para que siempre coloque a la salida el archivo de configurcion.
    ```xml
    <ItemGroup>
        <None Update="Configuracion.xml">
          <CopyToOutputDirectory>Always</CopyToOutputDirectory>
        </None>
      </ItemGroup>
    ```
### Código biblioteca de clases.

Esta clase esta compuesta por 2 campos y una propiedad. En el constructor se inicializa la propiedad ```Configuration``` responsable de leer los archivos de XML y se
inicializa el cliente SMTP con los parámetros de configuración.

El método ```EnviarCorreo(string , string , string ,bool esHtlm = false)``` utiliza un paámetro opcional que define si el mensaje es HTML. Por default envia texto.
El método  ```EnviarCorreo(MailMessage)``` esta pensado para poder construir un objecto MailMessage y poder aprovechar todas las capacidades este objecto como adjuntar archivos


```cs
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace EnviarCorreoElectronico
{
    public class GestorCorreo
    {
        private SmtpClient cliente;
        private static IConfiguration Configuration { get; set; }
        private MailMessage email;
        public GestorCorreo()
        {
            InicializaConfiguracion();
            cliente = new SmtpClient(Configuration["host"], Int32.Parse(Configuration["port"]))
            {
                EnableSsl = Boolean.Parse(Configuration["enableSsl"]),
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(Configuration["user"], Configuration["password"])
            };
        }
        private static void InicializaConfiguracion()
        {
            var builder = new ConfigurationBuilder()
                                    .SetBasePath(Directory.GetCurrentDirectory())
                                    .AddXmlFile("Configuracion.xml");
            Configuration = builder.Build();
        }
        public void EnviarCorreo(string destinatario, string asunto, string mensaje,bool esHtlm = false)
        {
            email = new MailMessage(Configuration["user"], destinatario, asunto, mensaje);
            email.IsBodyHtml = esHtlm;
            cliente.Send(email);
        }
        public void EnviarCorreo(MailMessage message)
        {
            cliente.Send(message);
        }
        public async Task EnviarCorreoAsync(MailMessage message)
        {
            await cliente.SendMailAsync(message);
        }
    }
}
```

### Código Aplicación de consola.
 Muestra como usar la clase GestorCorreo.
 
```cs

using System;
using EmailService;
using System.Net.Mail;

namespace EmailServiceCliente
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                GestorCorreo gestor = new GestorCorreo();
                //Aqui se puede definir agregar adjuntos
                MailMessage correo = new MailMessage("tucuenta@gmail.com", "tucuenta@gmail.com", "Reporte Mensual.", "Por favor ve el reporte adjunto.");  
                gestor.EnviarCorreo(correo);
                gestor.EnviarCorreo("tucuenta@gmail.com", "Prueba", "Mensaje en texto plano");
                // Se tiene la idea de utilizar un archivo HTML como plantilla personalizare e invocar este metodo. 
                gestor.EnviarCorreo("tucuenta@gmail.com", "Prueba", "<h1>Mensaje en HTML<h1><p><s>Super Awesome html Message.</s></p>",true);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}

```
# Ejecutar

Abrir la terminal en la carpeta _EmailServiceCliente_ y ejecutar ```dotnet run ```

# Para llevar

Puedes encontrar el código fuente el el repositorio de [Github](https://github.com/jahbenjah/CodigoBlog).

