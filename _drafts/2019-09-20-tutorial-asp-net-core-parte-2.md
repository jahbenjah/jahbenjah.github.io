---
layout: post
title:  "Tutorial ASP.NET Core Parte 2"
date:   2019-09-20 11:41:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/og-tutorial.webp
  height: 378
  width: 729
description: Tutorial de ASP.NET Core parte 2 cómo enviar correos electrónicos con SMTP y una cuenta de gmail.
author: Benjamin Camacho
---

Bienvenido a la segunda publicación del tutorial de ASP.NET Core en español en esta sección crearemos un formulario de contacto para enviar correos desde una aplicación ASP.NET Core MVC usando una cuenta de gmail.

## Código fuente inicial

Puedes obtener el código de la aplicación ejecutando el siguiente comando:

```bash
git clone https://github.com/jahbenjah/Sakila.git
```

Como mencionamos anteriormente seguimos el [flujo de Github](https://guides.github.com/introduction/flow/),por lo que para esta agregar esta característica crearemos una rama de Git y al final crearemos un Pull Request para incorporar nuestros cambios. Para crear una rama y cambiarse de rama ejecuta dentro de la carpeta _Sakila_.

```bash
cd Sakila
git branch contacto
git checkout contacto
```
