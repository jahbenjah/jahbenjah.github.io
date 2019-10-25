---
layout: post
title:  "Agregar Google Analytics ASP.NET Core"
date:   2019-10-18 11:11:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/og-tutorial.jpg
  height: 378
  width: 729
description: Se agregan los script de Google Analytics a una aplicación ASP.NET Core MVC usando vistas parciales, Tag Helper y ViewComponents. Se lee la configuracion y se usar la inyeccion
author: Benjamin Camacho
---


# Usando vistas parciales

Usando inyeccion de dependincias en la vista

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
