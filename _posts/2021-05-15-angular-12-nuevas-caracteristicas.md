---
layout: post
title:  "Angular 12 : nuevas características"
date:   2021-05-15 12:00:01 +0000
categories: angular
permalink: /:categories/:title:output_ext
image:
  path: /img/angular-12.png
  height: 358
  width: 683
last_modified_at: 2021-05-15 12:00:01 +0000
description: Angular 12 fue liberada 12 de mayo del 2021 y en este articulo traemos las últimas novedades que trae la versión nueva.
---

Angular es una plataforma de desarrollo compuesta por un framework, librerías y herramientas de desarrollo que está soportada por Google con muchos aportes de la comunidad. El equipo de Angular libera una versión nueva cada 6 meses la versión anterior, Angular 11,se libero el 11 de Noviembre del 2020.

Las nuevas características de Angular 12 las dividimos en dos partes actualizaciones que se le hicieron al framework y las actualizaciones que se le hicieron a las herramientas:

## Angular 12 : actualizaciones del framework  

* __Soporta el operador _null coalesing_ `??` de Typescript en las plantillas__ este operador te permite es tener un código más limpio. Por ejemplo supongamos que necesitas hacer un calculo siempre que un propiedad de tu modelo de Typescript no se nula, ante de la versión 11 antes tenías que usar un código similar al siguiente:

```ts
{{propiedad !== null && propiedad !== undefined ? propiedad : calcularAlgo() }}
```

Con la versión 12 se convierte en:

```ts
{{ propiedad ?? calcularAlgo() }}
```

> Este operador con dos signos de interrogación  ?? o otras variantes como ?. a veces se conocen como el _operador de Elvis_ porque si se dan cuenta parEcen dos ojitos y el cabello de Elvis Presley.

* __Soporte para estilos _SaaS_ en línea__ para los proyectos que usan SaaS para los estilos de la aplicación ya es posible  esto quiere decir que el tubo html de tu componente si estás usando un proyecto de cosas podrías utilizar los estilos usando seas anteriormente tendrás que switch arte como de archivo y importarlo hay una característica como para para activarlo en los proyectos que no usan esas pero cuando de esa parte nos vamos a entrar más detalles si quieres ver cómo sería la parte d los estilos en línea pues aquí en este link te muestra hoy te explica cómo son los estilos en línea

* __El soporte para Internet Explorer 11 queda depreciado__ Angular siempre se busca estar vigente con las nuevas características de los navegadores y las nuevas APIs comunes que se liberan para ellos pero también está comprometido con con el soporte a los navegadores antiguos. En Angular 12  ya se deprecia el soporte a Internet Explorer 11 esto es con la idea de cómo tomar ventaja de las últimas novedades que brindan los navegares que IE no soporta. De acuerdo a los datos del equipo de Angular se observo que cerca del 1% comunidad todavía usa Internet Explorer y esto significa que a partir de versión 12 ya que muestra una alerta posteriormente la versión 13 ya no será soportado.

* __View Engine depreciado__  El View Engine es el compilador que viene usando desde versiones anteriores pero desde las versiones 8, 9, 10 y 11 se empezó a utilizar un nuevo compilador de forma experimental. Lo que hicieron que para esta version es ya oficialmente usar Ivy como compilador default y depreciar el uso del anterior lo que significa que en la versions siguiente ya no que será soportado. Puede haber un ecosistema de  librerías de terceros por ejemplo que requieren actualizar por ejemplo si una compañía tiene un conjunto de paquetes o librerías que se basan todavía en View Engine necesitaran ser actualizadas.

## Angular 12 : actualizaciones de las herramientas

* __`ng build` lista para producción por default__ :que sirve para para generar tu aplicación por default ya la ya la usan producción esto pues el equipo de Angular ha detectado que en ocasiones aplicaciones se van con él con una construcción que es como para the box por ejemplo yo caí en eso cuando construye una aplicación me tocó desplegar no le agregue el menos menos brote como para indicar que quise esa construcción de esa aplicación de un excel en producción y tú lo veías en en el servidor desplegada entonces por default cuando tú ya le das en `ng build` te genera aún los archivos listas como si fueran para producción.

* __Modo estricto de Typescript habilitado por default__ anteriormente cuando creabas un nuevo proyecto con `ng new` te preguntaba si querías habilitar el modo estricto ahora por default vendra activo. El modo estricto sirve para para mejorarla mantenibilidad del código y te ayuda a detectar errores en tiempo de compilación.

* __Angular Language Service basado en el nuevo compilador Ivy__ El Language Services basado en el nuevo compilador Ivy es lo que nos permite en los editores de código como Visual Studio Code tener este el completado de sintaxis y completar fragmentos de código por ejemplo cuando estás escribiendo un template o detectar errores cuando haces una sintaxis errónea.

* __Soporte para producción a _Webpack_ 5__ en el caso también otra de las nuevas características es que ya tienen soporte el completo a web pack 11 que  salió hace poco en

* __Protactor__ ya no esta incluido. Esto parece ser el fin del este framework de pruebas y se recomiendan opciones de terceros como testCafe ,WebDriver o Cypress.

## Como luce una aplicación con Angular 12

Como tal una aplicación de Angular 12 luce de la misma forma que lucía antes con la versíon 11.

> ya tengo instalada la versión 12 pero esto lo que sí me observa es que con esta nueva veo está como advertencia de que tengo una versión actual del ies que me recomienda tener una una versión marcada como con bueno con un número impar que será como las que tendrán soporte a largo plazo aquí

## Instalación/Actualización de Angular CLI 12 con npm

ya te dice cómo pues las versiones de Angular en cuanto cuando me tocó a actualizar si detecte que que este que me mandaba algunos errores y me tocó abrir este esta línea de comando y actualizarlo con el

```bash
npm install -g @angular/cli
```

si me tocó actualizarlo como administrador entonces una vez que ya lo admin que ya que lo actualice como administrador ya no marco errores si lo pude administrar bueno ya aquí mismo hice la misma de comprobar que ya se había actualizado y aquí les decía que cuando tú creas un nuevo proyecto con en guinea anteriormente te preguntaba si quería si quieres usar el modo estructurada como la segunda pregunta ortega por de saulo activa me imagino que si tú quieres desactivarlo debe haber una opción pero yo creo que sería bueno esto lo hizo el equipo de Angular porque detectó que la mayoría de los proyectos siempre estaban habilitados entonces era como un paso menos que tenías que ejecutar otra de las cosas que también creo que no mencioné en las en las diapositivas es que ya no incluye el protector en el este las plantillas y básicamente como pareciera que es el fin porque recomiendan como opciones del terceros no entonces la aplicación de ejemplo que creas con engine you es a no cambio básicamente sigue siendo como la misma que teníamos con Angular 12 entonces pues hasta quisieran como las características de esta nueva versión de Angular.

Si deseas ver cuántas personas han descargado el Angular CLI puedes verlo [NPM](https://www.npmjs.com/package/@angular/cli).
Pa leer la visión del equipo de Angular lee el [blog inaugural](https://blog.angular.io/angular-v12-is-now-available-32ed51fbfd49)de liberación de Angular 12 que fue publicado el 12 de mayo del 2021 donde exponen que es una version basada en Ivy. Otro vídeo que puedes ver es el [Release Party de Angular](https://www.youtube.com/watch?v=iQUE02TWVlY)

## Ver un video

Puedes ver la version en video de este tutorial aquí:

<div class="video-responsive">
<iframe loading="lazy" src="https://www.youtube.com/embed/cFqFdLRcUV4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
