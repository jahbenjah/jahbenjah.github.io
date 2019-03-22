---
layout: post
title:  "Vistas paraciales ASP.NET Core"
date:   2019-03-17 12:00:01 +0000
categories: asp.net core
image:
  path: https://aspnetcoremaster.com/little-aspnetcore-book/cover.jpg
---

Las vistas paraciales permiten mantener separadas secciones de codio idealment con un proposito especifico. El proyecto dontne new mvc --asut individual contiene 3 vistas paraciales que nos permite obsevar de que se trata.

Las vistas parciales por convencion comienzanc on _ , y no contineen el bloaqu no especifican un layout.


Tienen extension cshtml

 *Views/Shared*

 _ValidationScriptsPartial.cshtml , _LoginPartial.cshtml , _CookieConsetPartial.cshtml

 La primera vista contiene los elementos script que son utilizados para la validadcion jquery.validate y jqueryvalidate.unobsstrosive dentro de un elemento environment para se producicon se usa las versiones locales y sun minifica y para el ambiente de produccioon se usan las versiones del  minificadas CDN 

**LoginPArtia** Muestra dos botones para registrarse e iniciar sesion. La visata coambia dependienedoe que  si es usuario ha iniciado sesion

la vista ** Cookie consen* solo se muestra cuando se inicia  I tracker consent