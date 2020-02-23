---
layout: post
title:  "Enviar un correo con C# y Gmail."
comments: true
categories: .net smtp SmptClient dotnet 
last_modified_at: 2019-12-11 14:45:55 +0000
---

En el desarrollo de software empresarial enviar correos electrónicos con documentos adjuntos o con un diseño personalizados es un requerimiento muy frecuente, en este tutorial te mostramos enviar correos con C#, .NET Core 2.0 y Visual Studio Code.
Actualmente existen varias bibliotecas para enviar correos como SendGrid o MailKit, sin embargo en este tutorial se utiliza la clase [SmtpClient](https://docs.microsoft.com/en-us/dotnet/api/system.net.mail.smtpclient?view=netframework-4.7.2) parte de .NET Standard 2.0.

<img data-src="/img/adult-business-businessman-1061588.webp" class="lazyload"  alt="Revisando el correo electrónico">

Este artículo representa una guía paso a paso para enviar un correo electrónico usando C# y una cuenta de Gmail el correo puede estar formateado como HTML, texto e incluir archivos adjuntos.
Se asume que tienes instalado el SDK de [.NET Core](https://www.microsoft.com/net/download) y el editor de código [Visual Studio Code](https://code.visualstudio.com/). Adicionalmente se creará una solución para poder abrir el proyecto con Visual Studio.

Se creará una biblioteca de clases que tiene como única función enviar correos. Después se usa esta clase en un proyecto de consola. Esta clase se puede usar en cualquier otro tipo de proyectos que soporte .NET Standard.
El caso de uso cubre está clase es : Una aplicación tiene asignada una cuenta de correo con la cuál envía todos los correos al destinatario especificado.

# Actualización

Si requieres enviar un correo en usando el .NET Framework en lugar de .NET Core puedes ver mi articulo [Enviar un correo con C# y Gmail: Windows Forms]({% post_url 2019-03-11-enviar-un-correo-con-csharp-gmail-winforms %}). Aquí se utiliza el archivo de configuración *App.config* para guardar los datos de la cuenta de gmail
Si usas un proyecto web puedes usar lo mismo en el *Web.config*.

## Configuración de Gmail ##

Es necesario permitir el acceso a aplicaciones no seguras desde la configuración de Gmail tal como se describe en la
[documentación de Gmail](https://support.google.com/accounts/answer/6010255?hl=es-41).

<img data-src="/img/AccesoAplicacionesMenosSeguras.webp" class="lazyload"  alt="Pantalla de configuracion de Gmail">

La configuración necesaria para el cliente de <abbr lang="en" title="Simple Mail Transfer Protocol">SMTP</abbr> de acuerdo a la [documentación de Gmail](https://support.google.com/mail/answer/7126229?visit_id=1-636683482170517029-2536242402&hl=es&rd=1)
es la siguiente:

Parámetro    | Valor
-------------| -------------
Servidor de correo saliente (SMTP) | smtp.gmail.com
Requiere TLS| Sí (si está disponible)
Requiere autenticación| Sí
Puerto para TLS/STARTTLS| 587
Nombre completo o nombre mostrado|Tu nombre
Nombre de la cuenta, nombre de usuario o dirección de correo electrónico|Tu dirección de correo electrónico completa
Contraseña|Tu contraseña de Gmail

Con esta configuración se creara un archivo XML que la aplicación leerá al momento que se crear una instancia de la clase.
Esto tiene como propósito hacer la aplicación no dependa de la configuración y en caso de ser necesario actualizar la contraseña o cambiar la cuenta no sea necesario recompilar la aplicación nuevamente.

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

1. Se creará una solución llamada _EnviarCorreo_ y dos proyectos, el primero una biblioteca de clases llamada _EmailService_ y el segundo proyecto es una aplicación de consola llamada _EmailServiceCliente_.
 
```sh
dotnet new sln -o EnviarCorreo
dotnet new classlib -o EnviarCorreo/EmailService
dotnet new console -o EnviarCorreo/EmailServiceCliente
```

2. Para agregar los proyectos a la solución ejecuta los siguientes comandos

```sh
dotnet sln EnviarCorreo/EnviarCorreo.sln add EnviarCorreo/EmailServiceCliente/EmailServiceCliente.csproj
dotnet sln EnviarCorreo/EnviarCorreo.sln add EnviarCorreo/EmailServiceCliente/EmailServiceCliente.csproj
```

3. El proyecto _EmailServiceCliente_ necesita una referencia al proyecto _EmailService_ para poder utilizarlo.

```sh
 dotnet add EnviarCorreo/EmailServiceCliente/EmailServiceCliente.csproj reference EnviarCorreo/EmailService/EmailService.csproj
```

4. Abrir la carpeta _EnviarCorreo\EmailService_ (`cd EnviarCorreo\EmailService`) y agregar la referencia al paquete de Nuget `Microsoft.Extensions.Configuration.Xml` esta es necesaria para poder leer el archivo _XML_.
    
```sh    
dotnet add package Microsoft.Extensions.Configuration.Xml
```

5. Crear un nuevo archivo llamado _Configuracion.xml_ xml (Windows `type NUL > Configuration.xml` , Linux `touch Configuracion.xml`).

6. Abrir la carpeta _EnviarCorreo_ con Visual Studio Code. Los `..` especifican el directorio un directorio arriba del actual `EnviarCorreo\EmailService`.

```sh
code ..
```

7. Editar el archivo del proyecto _EmailService/EmailService.csproj_ para agregar el siguiente código antes de la etiqueta de cierre de `</Project>`. Este hace que siempre coloque el archivo de configuración en la carpeta de salida del proceso de compilación
    
```xml
<ItemGroup>
    <None Update="Configuracion.xml">
    <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </None>
</ItemGroup>
```

## Código biblioteca de clases

Esta clase esta compuesta por 2 campos y una propiedad. En el constructor se inicializa la propiedad `Configuration` responsable de leer los archivos de configuración <abbr lang="en" title="Extensible Markup Language">XML</abbr> y se inicialize el cliente SMTP con los parámetros de configuración.

El método `EnviarCorreo(string , string , string ,bool esHtlm = false)` utiliza un parámetro opcional que define si el mensaje es <abbr lang="en" title="Hyper Text Markup Language">HTML</abbr>. Por default enviá texto.
El método `EnviarCorreo(MailMessage)` esta pensado para poder construir un objecto `MailMessage` y poder aprovechar todas las capacidades este objecto como adjuntar archivos

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

## Código Aplicación de consola

En la aplicación de consola se muestra como usar la clase `GestorCorreo` para enviar un correo con datos adjuntos, uno con solo texto y otro con formato HTML.
Puedes utilizar un archivo HTML como plantilla personalizar con el nombre del cliente e invocar este método para enviar correo.

```cs
using System;
using EmailService;
using System.Net.Mail;
using System.Net.Mime;

namespace EmailServiceCliente
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                GestorCorreo gestor = new GestorCorreo();
                
                //Correo con archivos adjuntos
                MailMessage correo = new MailMessage("tucuenta@gmail.com",
                                                     "benjamin@aspnetcoremaster.com",
                                                     "Archivo de configuracíon",
                                                     "Por favor verificar adjunto.");

                string ruta = "Configuracion.xml";
                Attachment adjunto = new Attachment(ruta, MediaTypeNames.Application.Xml);
                correo.Attachments.Add(adjunto);
                gestor.EnviarCorreo(correo);

                // Correo con HTML
                gestor.EnviarCorreo("tucuenta@gmail.com",
                                    "Prueba",
                                    "Mensaje en texto plano");
                // Correo de texto  
                gestor.EnviarCorreo("tucuenta@gmail.com",
                                    "Prueba",
                                    "<h1>Mensaje en HTML<h1><p>Contenido</p>",
                                    true);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
```

<img data-src="/img/CorreoAdjunto.webp" class="lazyload"  alt="Imagen del correo enviado">

# Ejecutar

Abrir la terminal en la carpeta _EmailServiceCliente_ y ejecutar

```sh
dotnet run
```

# Enviar correos en ASP.NET Core

En el caso de que requieras enviar correos en un aplicacion de ASP.NET Core es necesario usar la [inyección de dependencias]({% post_url 2019-11-05-inyeccion-de-dependencias-asp-net-core %}) que viene integrada en el mismo framework y usar el archivo  [appsettins.json]({% post_url 2019-04-07-aspnetcore appsettings %}) para manejar la configuración. Aquí muestro una forma de hacerlo en un proyecto web haciendo uso del [patrón opciones](https://docs.microsoft.com/aspnet/core/fundamentals/configuration/options?view=aspnetcore-3.0)

1. Agregar la configuración del correo en el archivo _appsettings.json_

```json
"EmailSenderOptions": {
    "Port": "587",
    "Password": "contraseñagmail",
    "EnableSsl": "true",
    "Email": "tucuenta@gmail.com",
    "Host": "smtp.gmail.com"
  }
```

2. Posteriormente creamos una clase en la carpeta _Services_ llamada `EmailSenderOptions`. Esta clase nos ayudara a leer los datos de configuración del archivo _json_

```cs
namespace App.Services
{
    public class EmailSenderOptions
    {
        public int Port { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool EnableSsl { get; set; }
        public string Host { get; set; }
    }
}
```

3. Posteriormente creamos una interfaz para el servicio de envío de correos y una implementación de la misma. En este caso la interfaz esta en una carpeta llamada interfaces

```cs
namespace App.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
```

La clase que implementa esta interfaz se encuentra en la carpeta _Services_. Nota el construcctor de la clase

```cs
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using App.Interfaces;

namespace App.Services
{
    public class EmailSender : IEmailSender
    {
        private SmtpClient Cliente { get; }
        private EmailSenderOptions Options { get; }

        public EmailSender(IOptions<EmailSenderOptions> options)
        {
            Options = options.Value;
            Cliente = new SmtpClient()
            {
                Host = Options.Host,
                Port = Options.Port,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(Options.Email, Options.Password),
                EnableSsl = Options.EnableSsl,
            };
        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            var correo = new MailMessage(from:Options.Email,to:email,subject: subject, body:message);
            correo.IsBodyHtml = true;
            return Cliente.SendMailAsync(correo);
        }
    }
}
```

4. En la clase `Startup`hay que agregar y configura este servicio al contendedor de dependencias para que este disponible en nuestra aplicación web.

```cs
services.AddTransient<IEmailSender, EmailSender>();
services.Configure<EmailSenderOptions>(Configuration.GetSection("EmailSenderOptions"));
```

5. Con lo anterior el servicio para enviar correos ya esta disponible solo debemos especificar en el constructor la dependencia que necesitamos. Por ejemplo en un controlador:

```cs
 public class HomeController : Controller
{
    private readonly IEmailSender _emailSender;
    public HomeController(IEmailSender emailSender,)
    {
        _emailSender = emailSender;
    }
}
```

6. Finalmente para enviar un correo en un método de acción de forma asíncrona.

```cs
public async Task<IActionResult> Index()
{
    await _emailSender
        .SendEmailAsync("usuario@email.com", "Asunto","Mensaje")
        .ConfigureAwait(false);

    return View();
}
```

# Conclusión

Puedes encontrar el código fuente el el repositorio de [Github](https://github.com/jahbenjah/CodigoBlog).
