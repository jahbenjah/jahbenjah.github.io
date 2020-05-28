---
layout: post
title:  "Script Tag Helper"
date:   2019-02-23 12:00:01 +0000
categories: asp.net core
image:
  path: /img/og-scripttaghelper.webp
  height: 331
  width: 632
---

El Script Tag Helper de ASP.NET Core tiene 3 casos de uso: el primero ayuda generar dinámicamente el atributo **src** del elemento [script](https://www.w3.org/TR/html5/semantics-scripting.html), el segundo permite usar un ubicación alternativa en caso de que la del script principal no éste disponible y el tercero para impedir que los scripts sean tomados de la memoria cache del navegador (<span lang="en">Cache busting</span>).

<img src="/img/scripttaghelper.webp" loading="lazy"  alt="Script Tag Helper">

Como `ASP.NET Core` es *open source* puede ver directamente el código fuente del [Script Tag Helper](https://github.com/aspnet/AspNetCore/blob/master/src/Mvc/Mvc.TagHelpers/src/ScriptTagHelper.cs) en el repositorio en Github. La documentación se [ScripTag Helper](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.taghelpers.scripttaghelper?view=aspnetcore-2.2) Se encuentra en el espacio de nombres _Microsoft.AspNetCore.Mvc.TagHelpers_ y  para que este disponible en todas nuestras vistas  de estar la siguiente directiva en el archivo *_Views/_ViewImports.cshtml*.

 ```csharp
 @addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
 ```

## Generar elementos *script* de forma dinámica

El atributo `asp-src-include` permite indicar un patrón para encontrar los archivos de los que se debe generar un elemento script.

El atributo `asp-src-exclude` permite indicar un patrón para encontrar los archivos de los que no se debe generar un elemento script.

Si dentro del directorio _js_ tenemos 3 archivos _site.js_ , _archivo.js_ y _feature.js_ para incluir los tres archivos en el layout tenemos que generar un elemento script para cada uno. Con la ayuda del Script Tag Helper lo podemos realizar fácilmente con una sola línea:

```html
<script asp-src-include="~/js/*.js"></script>
```
El código generara el siguiente código HTML

```html
<script src="/js/site.js"></script>
<script src="/js/archivo.js"></script>
<script src="/js/feature.js"></script>
```
Si queremos excluir archivo _feature.js_ podemos usar
`<script asp-src-include="~/js/*.js" asp-src-exclude="~/js/feature.js"></script>`.

## Usar un archivo alternativo

Cuando usamos librerías Javascript muy populares generalmente se prefiere  usar una de Red de Distribución de Contenidos o CDN por sus siglas en ingles, pero debemos considerar que nuestra aplicación web debe funcionar aun si el CND falla. Para esto nos ayudan los atributos `asp-fallback-test` y `asp-fallback-src` por ejemplo, el primero establece una prueba para verificar que nuestra librería esta disponible el segundo define una ubicación alternativa para obtener la librería. Por ejemplo:

```html
 <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.17.0/feather.min.js"
    asp-fallback-src="~/lib/feather-icons/feather.min.js"
    asp-fallback-test="window.feather"
    integrity="sha256-XcN55BkQ8zLrLvJmpE4nPHW+zYKGwW10JaYd7bq49gQ="
    crossorigin="anonymous">
</script>
```
Generar el siguiente código HTML que inserta la librería con la ubicación alternativa en caso de que la prueba definida no pase.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.17.0/feather.min.js" 
    crossorigin="anonymous" 
    integrity="sha256-XcN55BkQ8zLrLvJmpE4nPHW+zYKGwW10JaYd7bq49gQ=">
</script>
<script>
(
    window.feather||document.write("\u003Cscript src=\u0022\/lib\/feather-icons\/feather.min.js\u0022 integrity=\u0022sha256-XcN55BkQ8zLrLvJmpE4nPHW\u002BzYKGwW10JaYd7bq49gQ=\u0022 crossorigin=\u0022anonymous\u0022\u003E\u003C\/script\u003E")
);
</script>
```
## Invalidar Cache del navegador

Si quieres invalidar la memoria cache del navegador puedes usar el atributo `asp-append-version` para agregar un identificador único al archivo. Este cambiara cada que modifiques el archivo del tal forma que el navegador puede determinar cuando es necesario obtener este nuevamente este archivo. Por ejemplo

```html
<script src="~/js/site.js" asp-append-version="true"></script>
```
Generara el siguiente condigo HTML
```html
<script src="/js/site.js?v=v5eb6SIBTg4i2HQmWsekz6lCtbtrak5LzXpGbwZO148"></script>
```
Si editas el archivo se generara un identificador nuevo.
```html
<script src="/js/site.js?v=jmfLBXt8pbnF2Gi-5WTYFO9GRiuX0XHXAHtuwSTRv1c"></script>
```