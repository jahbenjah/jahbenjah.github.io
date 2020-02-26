---
layout: post
title:  "Enviar un correo con C# y Gmail: Windows Forms"
categories: .net smtp SmptClient 
---
En este tutorial te mostramos como enviar un correo desde una aplicación Windows Forms usando C# y una cuenta de Gmail con el control de acceso de aplicaciones no seguras habilitado. Si requieres más detalle de como hacerlo checa la sección *Configuración de Gmail* [Enviar un correo con C# y Gmail]({% post_url 2018-07-22-enviar-un-correo-con-csharp-gmail %}).

Para el tutorial hacemos uso de [Visual Studio 2017](https://visualstudio.microsoft.com/es/) y asumo que cuentas con conocimientos básicos en su manejo. Si tienes alguna duda dejame un comentario.

# Creación del proyecto

1. En Visual Studio crea un nuevo proyecto _Aplicación de Windows Forms_ llamada **EnviarCorreo** mediante  _Nuevo Proyecto > Escritorio de Windows > Aplicación de Windows Forms_.

2. Agrega un proyecto _Biblioteca de clases (.NET Standard)_ llamado **Emailer** mediante _Archivo> Agregar> Nuevo Proyecto > .NET Standard > Biblioteca de clases (.NET Standard)

3. El proyecto **EnviarCorreo** necesitar una referencia al proyecto **Emailer**. Agregala dando clic en el nodo del proyecto **EnviarCorreo** en el Explorador de soluciones y elige _> Proyecto> Agregar Referencia > Proyectos > Emailer_.

Hasta aquí tenemos la estructura del proyecto. En la siguiente sección revisaremos el código.

# El código

Para el proyecto _Emailer_ tendrá la responsabilidad de enviar los correos usando la clase `SmtpClient`. Constara de una interfaz y un clase que implementa esta interfaz.

La interfaz solo define un método con 3 parámetros para definir el destinatario , el asunto y el mensaje del correo a enviar.
```cs
using System.Threading.Tasks;

namespace Emailer
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string emailTo, string subject, string message);
    }
}
```

La clase `EmailSender` implementa la interfaz y su constructor requiere una un objeto del tipo `SmtpClient`  y una cadena que identifica al usuario. El método enviá el correo de forma asíncrona.

```cs
using System.Net.Mail;
using System.Threading.Tasks;

namespace Emailer
{
    public class EmailSender : IEmailSender
    {
        private SmtpClient _smtpClient { get; set; }
        private string _emailFrom { get; set; }

        public EmailSender(SmtpClient smtpClient, string emailFrom)
        {
            _smtpClient = smtpClient;
            _emailFrom = emailFrom;
        }

        public Task SendEmailAsync( string emailTo, string subject, string message)
        {
            var correo = new MailMessage(from: _emailFrom, to: emailTo, subject: subject, body: message);
            correo.IsBodyHtml = true;
            return _smtpClient.SendMailAsync(correo);
        }
    }
}
```

Para el proyecto de  Windows Forms es necesario crear el formulario para la interfaz gráfica y modificar el archivo *App.config* para agregar la configuración de la cuenta de gmail.

El formulario se muestra a continuación y es necesario crear dos métodos uno para manejar el evento de clic del botón y otro para limpiar el formulario.

<img data-src="/img/emailForm.webp" class="lazyload"  alt="Interfaz gráfica para enviar correo">

Modificar el archivo de configuración *App.config* y agregar el elemento `<system.net>` que lee el constructor del SmtpClient automáticamente. :

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <startup>
    <supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.7" />
  </startup>
  <system.net>
    <mailSettings>
      <smtp deliveryMethod="Network" from="usuario@gmail.com">
        <network 
          host="smtp.gmail.com"
          port="587"
          defaultCredentials="false"
          enableSsl="true"
          password="tupassword"
          userName="usuario@gmail.com" />
      </smtp>
    </mailSettings>
  </system.net>
</configuration> 
```

A continuación mostramos el código utilizado

```cs
using Emailer;
using System;
using System.Configuration;
using System.Net.Configuration;
using System.Net.Mail;
using System.Windows.Forms;

namespace EnviarCorreo
{
    public partial class Form1 : Form
    {
        private string correoApp { get; set; }

        public Form1()
        {

            InitializeComponent();
            SmtpSection smtp = (SmtpSection)ConfigurationManager.GetSection("system.net/mailSettings/smtp");
            correoApp = smtp.From;
            correoOrigen.Text = correoApp;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            var smtp = new SmtpClient();
            EmailSender emailSender = new EmailSender(smtp,correoApp);
            emailSender.SendEmailAsync(correoOrigen.Text, correoDestino.Text, mensaje.Text);
            MessageBox.Show("Correo Enviado correctamente");
            LimpiarFormulario();
        }

        private void LimpiarFormulario()
        {
            correoOrigen.Text = string.Empty;
            correoDestino.Text = string.Empty;
            mensaje.Text = string.Empty;
        }
    }
}
```

Ya puedes probar la aplicación. El mensaje enviado puede incluir `html`. por ejemplo

```html
<h1>Mira este  <a href="https://aspnetcoremaster.com">blog</a></h1>

<p> Tiene artículos interesantes sobre ASP.NET Core , C# y Entity Framework Core. Abajo una muestra de los artículos</p>

<ul>
    <li><a href="https://aspnetcoremaster.com/.net/smtp/smptclient/dotnet/2018/07/22/enviar-un-correo-con-csharp-gmail.html">Enviar un correo con C# y Gmail.</a></li>
<li><a href="https://aspnetcoremaster.com/c%23/entityframeworkcore/dotnet/ef/2018/08/07/introduccion-entityframeworkcore.html">Introducción a Entity Framework Core 2.1.</a></li>

<img src="https://aspnetcoremaster.com/img/og-image.webp" alt="logo de C#" />
</ul>
```

<img data-src="/img/CorreoRecibido.webp" class="lazyload"  alt="Muestra de correo recibido">

# Para llevar

Esta aplicación tiene muchas carencias y solo funciona con el caso que el usuario ingresa datos correctos.
