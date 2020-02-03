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

# Día 1: Conociendo nuevos animales

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

# Dia 2 al 5: Fundamentos de Kubernates

El recursos para este period es una lista de reproducción en Youtube donde el co-fundador del proyecto Kubernetes Brendan Burns explica algunos conceptos. [Kubernetes Basics](https://www.youtube.com/playlist?list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT)