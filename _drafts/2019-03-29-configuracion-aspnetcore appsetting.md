---
layout: post
title:  "Archivo appsettings.json ASP.NET Core"
date:   2019-03-25 12:00:01 +0000
categories: asp.net core
image:
  path: /img/vistasparciales.PNG
---

En este post te mostrare como como leer los datos contenidos en el archivo `appsettings.json` en un controlador.

Se agrega en el metod WebHost  Buildet
y permite usar dos appSetting Seguido del Ambiente.

producción y desarrollo


Primer debes inyectar una dependencia en tru controlador que se encuentra en el espacio de nombres Microsoft.Extensions.Configuration.


```cs
private readonly IConfiguration _configuration;

public HomeController(IConfiguration configuration)
{
    _configuration = configuration;
}
```


