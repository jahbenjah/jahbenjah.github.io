---
layout: post
title:  "Hola mundo Docker y ASP.NET Core"
date:   2020-02-22 11:18:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/og-docker.jpg
  height: 398
  width: 760
description: "ASP.NET Core y Docker pueden trabajar juntos para crear y desplegar aplicaciones" 
author: Benjamin Camacho
---

En este artículo te explico los pasos para crear una imagen de un contenedor Docker para una aplicación Hola Mundo de .NET Core. Intento explicar com más detalles las cosas relativas a las proceso de crear las imágenes de Docker que al proceso de desarrollar la aplicación con .NET Core considerando que una vez que tienes listo el archivo Dockerfile puedes reutilizarlo en otras aplicaciones.

> **TL:DR**  Si ya tienes Docker instalado puedes ver el no muy impresionante resultado ejecutando `docker run jahbenjah/holamundodocker`

Primero asegurate de tener instalado Docker, en mi caso uso [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop), el SDK de .NET Core 3.1, Visual Studio Code y la [extensión para Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker).

<img data-src="/img/DockerDesktop.PNG" class="lazyload"  alt="Pantalla de Docker Desktop">

## Imágenes de Docker para .NET Core y ASP.NET Core

Para construir nuestras propias imágenes de Docker para nuestras aplicaciones de .NET Core necesitamos por lo menos 2 imágenes distintas una con el SDK y otra con el motor de tiempo de ejecución o con las dependencias del mismo si utilizamos un despliegue con

1. **Imagen del SDK** Esta imagen contiene todo lo necesario para compilar y probar aplicaciones en .NET Core pero muchas de las cosas incluidas en esta imagen no son necesarias en producción como el compilador o Power Shell Core. Aunque hablamos de una imagen es importante decir que mas bien representan un conjunto de imágenes basadas en diferentes sistemas operativos identificadas por una etiqueta. La imágenes del SDK de .NET Core basadas en Linux pesan entre los 400Mb y 600MB. Aunque el equipo de Microsoft ha logrado [reducir el tamaño de las imágenes de Docker para Windows Server en un 40%](https://devblogs.microsoft.com/dotnet/we-made-windows-server-core-container-images-40-smaller/) para mi están descartadas completamente y solo haré referencia a las imágenes basadas en Linux.

Para descarga la imagen del .NET Core SDK puedes ejecutar el comando `docker pull` especificando el nombre de la imagen. Opcionalmente puedes especificar la etiqueta pero si no especificas la etiqueta por default se usa la etiqueta `lastest`. Puedes ver la lista completa de etiquetas en el [Docker Hub](https://hub.docker.com/_/microsoft-dotnet-core-sdk/).  

```bash
>docker pull mcr.microsoft.com/dotnet/core/sdk

Using default tag: latest
latest: Pulling from dotnet/core/sdk
dc65f448a2e2: Already exists
346ffb2b67d7: Already exists
dea4ecac934f: Already exists
8ac92ddf84b3: Already exists
5739cea041bc: Pull complete
c672494e8688: Pull complete
5ef2f2a67e1c: Pull complete
Digest: sha256:95f3924485a995b3e5098527e74863209ea7686f2682cf311dbd9e1dcd67ca15
Status: Downloaded newer image for mcr.microsoft.com/dotnet/core/sdk:latest
mcr.microsoft.com/dotnet/core/sdk:latest
```

> **Buena practicas para Docker:** Se considera una buena practica especificar siempre la etiqueta de la imagen deseada por ejemplo mcr.microsoft.com/dotnet/core/sdk:3.1-alpine

2. **Imagen del Runtime o imagen con las dependencias del RUNTIME**

En mi ruta de aprendizaje de Kubernetes con los [50 días de Kubernetes]({% post_url 2020-02-02-50-dias-de-kubernetes %}) y he leído y visto [videos](https://www.youtube.com/watch?v=wGz_cbtCiEA) que por razones de seguridad y rendimiento es una buena practica usar contenedores pequeños.

```console
>docker build -t jahbenjah/holamundodocker:latest .
Sending build context to Docker daemon   5.12kB
Step 1/10 : FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build
 ---> 3daf49f77d3c
Step 2/10 : WORKDIR /source
 ---> Running in d009b6c441be
Removing intermediate container d009b6c441be
 ---> a8d3b96a21ca
Step 3/10 : COPY *.csproj .
 ---> 4383dd51b18f
Step 4/10 : RUN dotnet restore -r linux-musl-x64
 ---> Running in b37002a8c68f
  Restore completed in 19.65 sec for /source/HolaMundoDocker.csproj.
Removing intermediate container b37002a8c68f
 ---> d12bddc58f16
Step 5/10 : COPY . .
 ---> 9e67aab2fd65
Step 6/10 : RUN dotnet publish -c release -o /app -r linux-musl-x64 --self-contained true --no-restore /p:PublishTrimmed=true /p:PublishReadyToRun=true
 ---> Running in b2247b2e4330
Microsoft (R) Build Engine version 16.4.0+e901037fe for .NET Core
Copyright (C) Microsoft Corporation. All rights reserved.

  HolaMundoDocker -> /source/bin/release/netcoreapp3.1/linux-musl-x64/HolaMundoDocker.dll
  Optimizing assemblies for size, which may change the behavior of the app. Be sure to test after publishing. See: https://aka.ms/dotnet-illink
  Some ReadyToRun compilations emitted warnings, indicating potential missing dependencies. Missing dependencies could potentially cause runtime failures. To show the warnings, set the PublishReadyToRunShowWarnings property to true.
  HolaMundoDocker -> /app/
Removing intermediate container b2247b2e4330
 ---> aba6f02af28b
Step 7/10 : FROM mcr.microsoft.com/dotnet/core/runtime-deps:3.1-alpine
3.1-alpine: Pulling from dotnet/core/runtime-deps
c9b1b535fdd9: Already exists
d314a858a3d7: Already exists
Digest: sha256:0895037a486aa130d737a64eb592056b8a42073118ca870d9554b90de9894acd
Status: Downloaded newer image for mcr.microsoft.com/dotnet/core/runtime-deps:3.1-alpine
 ---> 65324893f144
Step 8/10 : WORKDIR /app
 ---> Running in bcb0fa81b995
Removing intermediate container bcb0fa81b995
 ---> 3aad358320f7
Step 9/10 : COPY --from=build /app .
 ---> 727162a0b410
Step 10/10 : ENTRYPOINT ["./HolaMundoDocker"]
 ---> Running in e8ff085661ff
Removing intermediate container e8ff085661ff
 ---> 7593ec0e971c
Successfully built 7593ec0e971c
Successfully tagged jahbenjah/holamundodocker:latest
SECURITY WARNING: You are building a Docker image from Windows against a non-Windows Docker host. All files and directories added to build context will have '-rwxr-xr-x' permissions. It is recommended to double check and reset permissions for sensitive files and directories.
```

## Publicando la imagen en registro : Ducker Hub

Para publicar tu imagen un registro de contenedores puedes usar el comando `docker push`. La imagen debe contener una etiqueta y debes estar logeado en el regitro

## Conclusiones

