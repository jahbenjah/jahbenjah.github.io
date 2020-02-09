---
layout: post
title:  "Introducción a ASP.NET Core Web API"
date:   2019-12-25 12:22:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
---

La historia de este post es más o menos así :en el trabajo realizábamos una reescritura de una aplicación con ASP.NET WebForms a ASP.NET Core 2.2 MVC y nos dimos cuenta que muchos de nuestros controladores regresaban unicamente Json o algunas vistas solo regresaban un fragmento HTML con un `div` donde pintaríamos la interfaz gráfica con Javascript.  Por lo que tener una web API hacia mucho mas sentido. De aquí surgió mi interés por las Web API.

Cuando era un neófito en ASP.NET Core decidí aprender MVC e ignorar todo lo demás (Web APIs, Razor Pages y Blazor) esto simplemente por la falta de tiempo y considerando el patrón MVC esta por demás bien establecido lleva bastante tiempo funcionando bien. Asi que este articulo sera donde coloque todo lo que considere pertinente para mi aprendizaje.

> "API are powered the world"

## Como consumir una web API desde ASP.NET Core

Lo primero que vamos a hacer mostrarte como consumir un web API desde una aplicación ASP.NET Core MVC. Para consumir servicios web en .NET Core existen la clase `HttpClient` que puede utilizarse casi desde cualquier tipo de proyecto en .NET.

La clase `HttpClient` se ha usado principalmente con dos patrones : dentro de un bloque `using` y como miembro estático de una clase pero es importante recalcar que hay dos problemas conocidos con esta clase : []()  y []() por lo que usaremos los métodos que agregan esta clase usando inyección de dependencias.

Consumiremos el API de Github y trataremos de hacer un clon de la interfaz de usuario de Github que muestra los detalles del usuario y los repositorios

<img data-src="/img/CapturaGithub.PNG" class="lazyload"  alt="Captura de la página de Github">

En un proyecto MVC coloca el siguiente código en el método `ConfigureServices` la clase `Startup`

```cs
services.AddHttpClient("Github", client => {
                client.BaseAddress = new Uri("https://api.github.com");
                client.DefaultRequestHeaders.Add("User-Agent", "aspnetcoremaster.com");
            });
```

Con esto ya tenemos disponible el `HttpClientFactory` en el contenedor de dependencias lo que nos permite instanciar nuestro client HTTP.

```cs
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using IntroWebApi.Models;
using System.Net.Http;
using System.Text.Json;

namespace IntroWebApi.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHttpClientFactory _clientFactory;

        public HomeController(ILogger<HomeController> logger, IHttpClientFactory clientFactory)
        {
            _logger = logger;
            _clientFactory = clientFactory;
        }

        public async Task<IActionResult> Index()
        {
            var request = new HttpRequestMessage(HttpMethod.Get,"users/jahbenjah");
            var client = _clientFactory.CreateClient("Github");
            var response = await client.SendAsync(request);
            GithubUser user = new GithubUser();
            if (response.IsSuccessStatusCode)
            {
                using var responseStream = await response.Content.ReadAsStreamAsync();
                user = await JsonSerializer.DeserializeAsync<GithubUser>(responseStream);
            }
            else
            {               
            }
            return View(user);
        }
    }
}
```

## Documentando nuestra API con Swagger

Para generar la documentación de nuestra API usando el estandar OpenApI Specification podemos usar el paquete de Nuget

## Docker

Las imágenes de Docker necesarias para crear web API con ASP.NET Core 3.1 se encuentran en registro de contenedores de Microsoft _mcr.microsoft.com/dotnet_

## Desplegar una aplicación web API en Azure

Desplegar una API con ASP.NET Core necesitas

## Desplegar una API en IIS Windows 10
