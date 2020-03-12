---
layout: post
title:  "50 dias de Kubernetes"
categories: kubernetes
permalink: /:categories/:title:output_ext
---

Kubernetes es un orquestador de contenedores. Kubernetes se abrevia como _K8S_ por el hecho de que hay 8 letras entre la *K* y la *s* en la palabra de origen griego Kubernates que significa "timón". Es un proyecto que inicio en Google pero ahora pertenece a la <abbr lang="en" title="Cloud Native Computing Foundation">CNCF</abbr> fue programado en el lenguaje de programación Go inicialmente por [Brendan Burns](https://twitter.com/brendandburns), [Brian Grant](https://twitter.com/bgrant0607), [David Oppenheimer](David Oppenheimer), [Eric Brewer](https://research.google/people/EricBrewer/) y [John Wilkes](https://research.google/people/JohnWilkes/).

El repositorio de Kubernetes esta alojado en Github [Kubernetes](https://github.com/kubernetes/kubernetes) y la página oficial del proyecto es [kubernetes.io](https://kubernetes.io/)

Los 50 días de Kubernetes es la forma en que pienso aprenden esta tecnología aprovechando los recursos que brinda Microsoft Azure en la ruta conocida como [50 days from zero to
hero with Kubernetes](https://azure.microsoft.com/resources/kubernetes-learning-path/) usare el #tag #50diasdek8s en Twitter para compartir mis avances si asi lo deseas puedes unirte. Mi propósito es básicamente pasar a algo más allá del hola mundo usando principalmente C#, ASP.NET Core, Docker y Kubernetes.

## Día 1: Conociendo nuevos animales

El recurso para este dia es un libro para niños (esto por las imágenes pero no por el contenido) [Phippy Goes to the Zoo](https://azure.microsoft.com/mediahandler/files/resourcefiles/phippy-goes-to-the-zoo/Phippy%20Goes%20To%20The%20Zoo_MSFTonline.pdf) en el cuál se explican algunos conceptos básicos de Kubernetes. Para mi algunos de estos conceptos no me hacen sentido aun pero espero que pronto se vuelvan mas relevantes

* Pod : Un Pod es responsable de ejecutar uno o más contenedores

* ReplicaSet:

* Deployment

* DeamonSets

* Ingresses : Por ahora veo esto como un balanceador de carga.

* CronJobs : Entiendo que ejecutan tareas periódicas

* CRD Custum Resource Definition

También una version en [video](https://www.youtube.com/watch?v=R9-SOzep73w)  

Por lo que he entendido Kubernetes no esta asociado directamente con Docker y puede manejar otros tipos de contenedores pero por fines prácticos he elegido Docker como mi plataforma de contenedores. He instalad Docker Desktop con la opción de contenedores para Linux en mi "superpoderosa máquina Lenovo Ideapad 320 con 8GB de RAM y Windows" va muy lento pero anda. Adicionalmente he activado la opción de Kubernetes en la configuración de Docker Desktop y ahora veo que tengo unas imágenes de Docker relacionadas a Kubernetes que yo no descargue y la herramienta de linea de comandos **kubectl**

<img data-src="/img/DDKubernetes.PNG" class="lazyload"  alt="Pantalla de configuración de Kubernetes de Docker Desktop">

```bash
>docker images
REPOSITORY                              TAG                 IMAGE ID            CREATED             SIZE
k8s.gcr.io/kube-proxy                   v1.15.5             cbd7f21fec99        3 months ago        82.4MB
k8s.gcr.io/kube-controller-manager      v1.15.5             1399a72fa1a9        3 months ago        159MB
k8s.gcr.io/kube-apiserver               v1.15.5             e534b1952a0d        3 months ago        207MB
k8s.gcr.io/kube-scheduler               v1.15.5             fab2dded59dd        3 months ago        81.1MB
docker/kube-compose-controller          v0.4.23             a8c3d87a58e7        8 months ago        35.3MB
docker/kube-compose-api-server          v0.4.23             f3591b2cb223        8 months ago        49.9MB
k8s.gcr.io/coredns                      1.3.1               eb516548c180        12 months ago       40.3MB
k8s.gcr.io/etcd                         3.3.10              2c4adeb21b4f        14 months ago       258MB
k8s.gcr.io/pause                        3.1                 da86e6ba6ca1        2 years ago         742kB
```

También descargado unas imágenes de Docker para .NET Core mediante el comando `docker pull mcr.microsoft.com/dotnet/core/sdk:3.1`

```bash
>docker images
REPOSITORY                              TAG                 IMAGE ID            CREATED             SIZE
mcr.microsoft.com/dotnet/core/sdk       3.1                 2fe8fe202baf        2 weeks ago         689MB
mcr.microsoft.com/dotnet/core/aspnet    3.1                 5b704ff3cb6b        2 weeks ago         207MB
mcr.microsoft.com/dotnet/core/runtime   3.1                 a708cda756ab        2 weeks ago         190MB
```

## Dia 2 al 5: Fundamentos de Kubernates

El recursos para este periodo es una lista de reproducción en Youtube donde el co-fundador del proyecto Kubernetes Brendan Burns explica algunos conceptos. [Kubernetes Basics](https://www.youtube.com/playlist?list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT)

Aquí he descubierto que esta ruta de aprendizaje me llevará mas de los 50 días inicialmente marcados esto por mi desconocimiento en muchos temas. Por est motivo he tenido que agregar recursos adicionales  El primer libro.

¿Qué es un cluster de Kebernetes?
¿ASP.NET Core cumple con los 12 puntos de las aplicaciones de 12 factores?

## Días 6 - 1 : Conceptos fundamentales de Azure Kubernetes Services



## Libros de Kubernetes "gratuitos"

Nuestros datos personales se han vuelto la moneda de cambio en estos tiempos modernos. Aquí te dejo unos libros o recursos que puedes obtener a cambio de tus datos personales como Nombre, Correo y teléfono. Yo sin pensarlo mucho he decido que vale la pena el intercambio

[Kubernetes: Up and Running, Second Edition](https://azure.microsoft.com/en-us/resources/kubernetes-up-and-running/)
  
[Cloud Native DevOps With Kubernetes](https://www.nginx.com/resources/library/cloud-native-devops-with-kubernetes/)

[Using .NET Core, Docker, and Kubernetes Succinctly](https://www.syncfusion.com/ebooks/using-netcore-docker-and-kubernetes-succinctly) 

[Cloud Native DevOps With Kubernetes](https://www.syncfusion.com/ebooks/kubernetes-succinctly) 

## Creando un cruster de Kubernetes en Azure

Para crear un cluster de Kubernetes en Azure se puede usar el portal, las plantillas ARM y las linea de comandos o CLI.

Una vez que tienes instlada de CLI de Azure en tu equipo debes logearte con el comando `az login` y completar confirmar el dispositivo en un navegador esto te regresa un json similar al que te muestro abajo

```json
benjamin@laptop:~/source/repos/kuard$ az login
Abriendo en una sesión existente del navegador
You have logged in. Now let us find all the subscriptions to which you have access...
[
  {
    "cloudName": "AzureCloud",
    "homeTenantId": "4de3de93b-4e4b-338e-b6d6-973d2760546d",
    "id": "06eacb4a-292e-4fa0-92bf-b97d35f34aa4",
    "isDefault": true,
    "managedByTenants": [],
    "name": "Pago por uso",
    "state": "Enabled",
    "tenantId": "4de6789-3e3b-789e-d2b2-789d2760877f",
    "user": {
      "name": "tu@email.com",
      "type": "user"
    }
  }
```

Lo primero que se debe crear es un grupo de recursos donde se ubicara el cluster de Kubernetes. Para crear un grupo de recursos en Azure con la linea de comandos se usa el comando `az group create` y requiere por lo menos los parametros de nombre y la región de Azure donde se ubicara

```bash
az group create --name mi-grupo-de-recursos --location=centralus
```

Parsa crear un cluster de Kubernetes dentro de un grupo de recurso se usa el comando `az aks create` especificando por lo menos el grupo de recursos y el nombre del cluster

```
az aks create --resource-group=mi-grupo-de-recursos --name=mi-cluster
```

> **Nota** asegurate de revisar los valores default al crear el cluster porque ahi se encuentran el tamaño de las maquinas virtuales y el número de nodos. Puedes usar `az aks create --help` para ver la lista completa de opciones y los valores por default.