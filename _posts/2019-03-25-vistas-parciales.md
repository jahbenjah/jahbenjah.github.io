---
layout: post
title:  "Vistas parciales ASP.NET Core"
date:   2019-03-25 12:00:01 +0000
categories: asp.net core
image:
  path: /img/vistasparciales.webp
---

En ASP.NET Core las vistas parciales permiten mantener secciones de marcado *HTML* separadas en diferentes archivos que después se utilizan para formar una página web completa. Las vistas parciales deben de tener un propósito especifico como incluir un conjunto de scripts o mostrar cierto contenido en caso de que se cumpla una condición. Las vistas parciales tienen una extensión _.cshtml_ y por convención su nombre comienzan con un guion bajo (_).

Las vistas que pueden ser utilizadas por cualquier controlador o vista suelen estar ubicadas en la carpeta */Views/Shared/* o en la carpeta de vistas especifica para un controlador */Views/{Controller}/*. Las principales ventajas que ofrecen es poder dividir la complejidad de la página en pequeños archivos con propósito especifico  y la re utilización de código.

La plantilla de  proyecto MVC con autenticación de cuentas Individuales o con la linea de comandos `dotnet new mvc --auth individual` contiene 3 vistas parciales que nos permite observar como funcionan las mismas. A continuación mostramos la ruta completa de estas vistas:

 * */Views/Shared/_ValidationScriptsPartial.cshtml*
 * */Views/Shared/_CookieConsentPartial.cshtml*
 * */Views/Shared/_LoginPartial.cshtml*

 La vista **_ValidationScriptsPartial** contiene los elementos script que son utilizados para la validación `jquery.validate.js` y `jquery.validate.unobtrusive.js` dentro de un elemento `environment`. Para  el ambiente de desarrollo se usa las versiones locales y sin minificar y para el ambiente de producción se usan las versiones del minificadas y de un CDN. Revisa este articulo si deseas mas detalles del [script tag helper]({% post_url 2019-02-23-script-tag-helper %}).

Está vista debe invocarse dentro de la sección Scripts (`@RenderSection("Scripts", required: false)`) definida en el archivo de `_Layout`. Esto permite ubicar los scripts de validación antes  cerrar el `<body>`.  

```html
@section Scripts {
  <partial name="_ValidationScriptsPartial" />
}
```

 Si usa una version de ASP.NET Core anterior a la 2.1 debes usar `@await Html.PartialAsync("_ValidationScriptsPartial")` en lugar el tag helper partial.

La vista **_LoginPartial** muestra dos elementos en la barra de navegación que cambian dependiendo si el usuario ha iniciado sesión o no. Se muestran los ligas para *Registrarse* e *Iniciar sesión* si no ha ingresado y un mensaje de bienvenida y la liga para cerrar sesión cuando el usuario ha iniciado sesión.

<img data-src="/img/vistasparciales.webp" class="lazyload"  alt="Visualización de la vista parcial _LoginPartial">

Esta vista usa la inyección de dependencias para poder usar las clases de `Microsoft.AspNetCore.Identity` para poder identificar cuando un usario ha iniciado sesión y obtener el nombre del usuario. A continuación mostramos la parte principal de esta vista.

```cs
@using Microsoft.AspNetCore.Identity
@inject SignInManager<IdentityUser> SignInManager
@inject UserManager<IdentityUser> UserManager

<ul class="navbar-nav">
@if (SignInManager.IsSignedIn(User))
{
  <li class="nav-item">
   <a class="nav-link text-dark" asp-area="Identity" asp-page="/Account/Manage/Index" title="Manage">Hello @User.Identity.Name!</a>
  </li>
 //html
}
else
{
 <li class="nav-item">
  <a class="nav-link text-dark" asp-area="Identity" asp-page="/Account/Register">Register<a>
  </li>
  //...
}
</ul>

```

Esta vista se invoca en el archivo de `Layout`.

```html
<div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
  <partial name="_LoginPartial" />
  <ul class="navbar-nav flex-grow-1">
    ...                  
  </ul>
</div>
```

La vista **CookieConsentPartial** permite cumplir con las disposiciones protección de datos de la Union Europea (EU General Data Protection Regulation GDPR). La explicación detalla  de como funciona esta fuera del alcance de este articulo. Más detalles en la documentación oficial: [GPDR](https://docs.microsoft.com/es-mx/aspnet/core/security/gdpr?view=aspnetcore-2.2)

# Conclusión

Hasta aquí hemos cubierto las vistas incluidas en la plantilla de proyecto por de ASP.NET Core MVC. Todavía hay mas opciones para las vistas parciales como aceptar modelos e invocare desde un controlador pero por ahora es suficiente. Dejamos una lista de ideas que pueden ser implementadas con una vista parcial de ASP.NET Corea

* Script para para Google Analytics o Disqus en el ambiente de producción.

* Código HTML para incluir un favicon personalizado.

* Formulario para un modal o ventana emergente.

* Conjunto de iconos para compartir en Redes Sociales.

Comenta cual de estos te deseas ver como se implementa o que otra cosa se puede implementar como vista parcial.