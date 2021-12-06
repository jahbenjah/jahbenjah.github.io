---
layout: post
title:  "Visual Studio 2022 | Habilitar la navegación a origenes descompilados "
date:   2021-02-05 12:00:01 +0000
categories: visual-studio
permalink: /:categories/:title:output_ext
---

Revisando las nuevas características de Visual Studio 2022 incluye por defualt una nueva configuración llamada "Habilitar la navegación a origenes descompilados". Esta funcionalidad que existía en versiones anteriores de Visual Studio pero no estaba habilitada por default.

Cuando seleccionas un método y presionas **F12 Ir a definición** por default antes de la version 2022 se iba a los metadatos de la _dll_ donde te dejaba ver la definición la firma del método o miembro seleccionado. Pero ahora por default trae activa la descompilación lo que quiere decir que Visual Studio intentará descompilar y te mostrará la definición del método haciendo una descompilación de la librería. 

Esta característica esta en _Editor de textos > C#> Avanzadas > Opción Habilitar la navegación orígenes descompilados_.

<div class="video-responsive">
<iframe loading="lazy" src="https://www.youtube.com/embed/_gIa4v2c5IQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
