---
layout: post
title:  "Validación remota ASP.NET Core"
date:   2021-01-31 12:00:01 +0000
categories: aspnetcore
image:
  path: /img/og-connectionstring.webp
  height: 358
  width: 683
last_modified_at: 2021-01-31 22:24:25 +0000
description: La validación remota permite invocar un método en el backend para realizar las validaciones del lado de servidor.
---

El proceso de validación de los datos de entrada del cliente en ASP.NET Core se realiza con apoyo de las librerías jQuery Validate, jQuery Validate Unobtrusive. Del lado del Backend se utilizan atributos de C# sobre las propiedades del modelo o también conocidas como anotaciones de datos. La mayoria de estas clases para anotar los modelos se encuentran en el espacio de nombres `System.ComponentModel.DataAnnotations` pero existe un atributo que permite invocar un método en el backend para realizar las validaciones del lado de servidor que no esta en este espacio de nombres.

## Como validar de forma remota en MVC

1. Asegurate que la vista donde se realizara la validación remota incluya vista parcial `_ValidationScriptsPartial.cshtm` dentro de la sección _Scripts_ por ejemplo:

```cs
@section Scripts
{
<partial name="_ValidationScriptsPartial" />
}
```

o si prefieres puedes incluir los Scripts directamente 

```html
@section Scripts
{
<script src="~/lib/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="~/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js"></script>
}
```

2. El modelo tiene que tener el atributo `Remote` especificando el método que realizara la validación y el controlador donde se encuentra. Opcionalmente puedes especificar el Mensaje de Error.

```cs
using Microsoft.AspNetCore.Mvc;

namespace WebApplication.Models
{
    public class Person
    {
        [Remote(action: "Validate" ,controller: "Home" ,ErrorMessage = "El nombre de usuario ya existe.")]
        public string Name { get; set; }
    }
}
```

3. El metodo que realiza la validación debe regresar un `JSON` el resultado de la validación y tener un parámetro con el mismo nombre de la propiedad sobre la que se realiza la validación. Por ejemplo :

```cs
 public IActionResult Validate(string name)
{
  return name.Length > 10 ? Json(true) : Json(false);
}
```

En este ejemplo unicamente se verifica la longitud del texto pero se puede comparar contra una base de datos o un servicio externo para lo cual se necesitara la versión asíncrona del método. 

4. Finalmente la vista queda de la siguiente manera:

```cs
@model Person
@{ ViewData["Title"] = "Home Page"; }

<div class="row">
    <form action="/" method="post">
        <input asp-for="Name" class="form-control" />
        <span asp-validation-for="Name" class="text-danger"></span>
    </form>
</div>

@section Scripts { <partial name="_ValidationScriptsPartial" /> }
```

El HTML generado incluye atributos adicionales que son utilizados por la librerua jQuery Validate para realizar automaticamente cada que el usuario ingrese datos en el control.

```html
<form action="/" method="post" novalidate="novalidate">
    <label class="col-form-label" for="Name">Name</label>
    <input class="form-control" type="text" data-val="true" data-val-remote="El nombre de usuario ya existe." data-val-remote-additionalfields="*.Name" data-val-remote-url="/Home/Validate" id="Name" name="Name" value="">
    <span class="text-danger field-validation-valid" data-valmsg-for="Name" data-valmsg-replace="true"></span>
</form>
```