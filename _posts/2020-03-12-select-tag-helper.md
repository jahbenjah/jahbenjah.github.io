---
layout: post
title:  "Select Tag Helper"
date:   2020-03-12 23:23:47 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/og-scripttaghelper.webp
  height: 331
  width: 632
description: Aprende a usar el Select Tag Helper de ASP.NET Core
---

El elemento **select** de HTML permite mostrar una lista de opciones y tiene la capacidad de permitir elegir una sola opción o múltiples opciones. Este control es muy usado y es posible que cualquier sitio web que realiza la operaciones de creación de "nuevos elementos" lo requiera. Por ejemplo cuando requieres elegir tu país en una página web de registro o seleccionar la talla en un página de pedidos o también puedes seleccionar varios sabores al ordenar tu helado favorito.

El elemento **select** luce de la siguiente manera en una HTML5 y es completamente soportados dentro de las vistas Razor de ASP.NET Core por lo que si tienes un escenario donde solo necesitas mostrar un listado de opciones que no cambia puedes usar HTML5 puro sin ningún problema. Otro escenario en el cual te puede ser útil saber el funcionamiento del **select** es cuando tienes una plantilla que requieres pasar a Razor ya que aquí es importante estar familiarizado con el para poder realizar la equivalencia entre HTML5 y Razor adecuadamente.

```html
<label for="talla-select">Talla:</label>
<select name="talla" id="talla-select">
    <option value="">--Por favor elija su talla--</option>
    <option value="CH">Chica</option>
    <option value="M">Mediana</option>
    <option value="G">Grande</option>
    <option value="EG">Extra grande</option>
</select>

<!-- Selección múltiple agrupado -->
<label for="sabor-select">Seleccione sabores :</label>
<select id="sabor" name="sabor-select" multiple size="8">
   <optgroup label="Leche">
        <option value="1">Chocolate</option>
        <option value="2">Vainilla</option>
        <option value="3">Fresa</option>
   </optgroup>
   <optgroup label="Agua">
        <option value="4">Limón</option>
        <option value="5">Mango</option>
        <option value="6">Uva</option>
    </optgroup>
</select>
```

> **Referencia:** Para ver más detalles sobre el todos los atributos soportados y detalles del funcionamiento del `select` de HTML5 recomendamos revisar la página de referencia de [Mozilla Developer Network  para el elemento select](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/select).

En el desarrollo web con ASP.NET Core para generar un elemento select de forma dinámica usamos el `SelectTagHelper`. Este tiene dos asistentes `asp-for` y `asp-items` que puedes usar como atributos dentro de la etiqueta de apertura del select.

Debido a que `ASP.NET Core` es código abierto puedes te sugiero revisar directamente el [código fuente del Select Tag Helper](https://github.com/dotnet/aspnetcore/blob/master/src/Mvc/Mvc.TagHelpers/src/SelectTagHelper.cs) en el repositorio en del proyecto para ver su funcionamiento interno. Puedes ver la documentación del API [Select Tag Helper](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.taghelpers.selecttaghelper?view=aspnetcore-3.1) y ejemplos de uso en la [documentación de ASP.NET Core](https://docs.microsoft.com/es-es/aspnet/core/mvc/views/working-with-forms?view=aspnetcore-3.1#the-select-tag-helper)

`asp-for` sirve para determinar la propiedad de la clase usada como modelo que que tomara el valor o valores al seleccionar una opción del `select`. El elemento *option* tiene un atributo **value** que acepta cadenas de texto. Frecuentemente en el select se usa tomando un identificador del objeto tipo entero no te preocupes por convertir el atributo **value** ya que el enlazado del modelo lo hace por ti. Si tu `select` debe soportar la selección múltiple asegurate que la propiedad que especificas para el `asp-for` corresponda a una colección de objetos.

`asp-items` sirve para especificar la colección de objetos con los que se llenaran las opciones del `select`. Esta colección usa objetos de la clase `SelectListItem` que se encuentra en el espacio de nombres `Microsoft.AspNetCore.Mvc.Rendering`.

El Select Tag Helper se encuentra en el espacio de nombres `Microsoft.AspNetCore.Mvc.TagHelpers` y para que este disponible en todas nuestras vistas debe estar la siguiente directiva en el archivo *_Views/_ViewImports.cshtml*.

 ```csharp
 @addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
 ```

## Usando el SelectTagHelper

Comenzaremos a ver algunos casos más simples de usar el SelectTagHelper 

a) Usando un `select` con valores predefinidos en el HTML.

Para generar este `select` usando Razor necesitamos crear un modelo que incluya una propiedad del tipo de dato para asignarla al control. Como las opciones solo son dos y no requerimos guardar esto en base de datos podemos usar la opciones predefinidas la vista. Como generamos la colección con C# solo necesitamos usar el _tag helper_ `asp-for` especificando la propiedad del modelo.

```cs
  public class InputModel
        {
            // Se omiten las demás propiedades
            [Required]
            [Display(Name = "Sexo")]
            public char Sexo { get; set; }
        }

```

La sección del la vista del formulario de registro responsable de crear el `select` .En este caso usamos el formulario de registro de ASP.NET Core Identity que se basa en Razor Pages.

```html
<div class="form-group">
    <label asp-for="Input.Sexo"></label>
       <select asp-for="Input.Sexo" class="form-control">
            <option value="" disabled="" selected="">Selecciona el sexo</option>
            <option value="M">Mujer</option>
            <option value="H">Hombre</option>
        </select>
    <span asp-validation-for="Input.Sexo" class="text-danger"></span>
</div>
```

<img src="/img/simple-select.webp" loading="lazy" alt="SelectTagHelper en el formulario de registro">

b) Llenar un `select` con los valores de una enumeración

Otro escenario en que podemos necesitar un `select` es cuando tenenos una enumeración de los valores posibles para un campo determinado. Por ejemplo los estados de una pedido en una aplicación de ventas. Para}esto necesitamos el método estático Html.GetEnumSelectList<T>() donde T es un Enum

```cs
public enum EstadosPedido
{
    Capturado,
    Confirmado,
    Cancelado,
    Entregado
}
```

```html
<select asp-for="Estado" asp-items="Html.GetEnumSelectList<EstadosPedido>()"></select>

<select data-val="true" data-val-required="The Estado field is required." id="Estado" name="Estado"><option selected="selected" value="0">Capturado</option>
<option value="1">Confirmado</option>
<option value="2">Cancelado</option>
<option value="3">Entregado</option>
</select>
```

## Conclusiones
