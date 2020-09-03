---
layout: post
title:  "Publicación de un solo archivo en Linux"
date:   2020-09-03 09:22:47 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/og-runtime-compilation.jpg
  height: 503
  width: 961
description: Publica tu aplicación ASP.NET Core como un solo archivo en Linux.
---

Este corto articulo muestra el archivo de un proyecto ASP.NET Core sobre .NET 5.0 que esta configurado para publicarse como un solo archivo en Linux. El autor original de esta configuraciones es [Ben Adams](https://twitter.com/ben_a_adams) que lo publico en Twitter y me pareció interesante probarlo y replicarlo.

<blockquote class="twitter-tweet">
<p lang="en" dir="ltr">Is really single file on Linux in .NET 5.0 😍
<a href="https://t.co/kRgPDO2snD">https://t.co/kRgPDO2snD</a>
<a href="https://t.co/Cgmv3IMsL1">pic.twitter.com/Cgmv3IMsL1</a>
</p>&mdash; Ben Adams #BlackLivesMatter (@ben_a_adams)
<a href="https://twitter.com/ben_a_adams/status/1301388865253650433?ref_src=twsrc%5Etfw">September 3, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

El archivo del proyecto

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>
    <RuntimeIdentifier>linux-64</RuntimeIdentifier>
    <TrimMode>Link</TrimMode>
    <PublishSingleFile>Link</PublishSingleFile>
  </PropertyGroup>

</Project>
```
