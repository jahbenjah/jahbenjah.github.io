---
layout: post
title:  "Agregar Google Analytics ASP.NET Core"
date:   2019-10-27 01:11:01 +0000
permalink: /:categories/:title:output_ext
image:
  path: /img/og-tutorial.jpg
  height: 378
  width: 729
description: Se agregan los script de Google Analytics a una aplicación ASP.NET Core MVC usando vistas parciales, Tag Helper y ViewComponents. Se lee la configuración del archivo appsettigs.json y se usa la inyección de dependencias en las vistas.
---

En este tutorial mostramos como agregar los scripts de Google Analitycs a una aplicación de ASP.NET Core MVC. Estos scripts permiten acceder a información util sobre los visitantes a nuestro sitio web.

Si solo lo usas para un sitio web lo mas sencillo es incluir el script dentro del la elemento `head` del layout. Pero si usas varios layout o tienes más de una aplicación en la que requieres métricas de uso tiene sentido pensar en un tener un componente adicional que te permita reutilizarlo en tus aplicaciones o crear una plantilla personalizada que lo incluya.

# Configuración de Google Analitycs

Agrega la propiedad en GA
Verificar la propiedad de tu dominio

# Usando vistas parciales

Usando inyección de dependencias en la vista

```json
{
  "GoogleAnalytics": "UA-130293099-1"
}
```

```cs
@inject Microsoft.Extensions.Configuration.IConfiguration configuration
@using Microsoft.Extensions.Configuration
@{
    var code = configuration.GetValue<string>("GoogleAnalytics");
    var gtag = $"https://www.googletagmanager.com/gtag/js?id={code}";
}
@*Global site tag(gtag.js) - Google Analytics*@
<environment exclude="Development">
    <script async src="@gtag"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', '@code');
    </script>
</environment>
```

# Usando  Tag Helpers Components

> **Anuncio** [diib](https://diib.com/?ref=benjamincamacho) es un servicio que se conecta a la API de google Analytics  y usa la Inteligencia Artificial para generar un plan de crecimiento personalizado para tu sitio web.
