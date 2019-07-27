---
layout: post
title:  "Controlando los paquetes de Nuget"
comments: true
categories: asp net core
permalink: /:categories/:title:output_ext
---

ASP.NET Core esta formado por múltiples paquetes de Nuget y es normal que nuestros proyectos requieran funciones adicionales por lo que necesitamos instalar más paquetes por lo que nuestros archivos _.csproj_ pueden contener por lo menos 3 paquetes o en algunos casos más. El manejo (actualización) de estos paquetes puede convertirse en un proceso algo tedioso considerando que generalmente una solución tiene más de un proyecto. En este artículo te mostramos 3 formas de manejar los paquetes de Nuget.

1. Administrador de paquetes de Visual Studio
2. Linea de comandos herramienta global dotnet-outdated
3. Propiedades de construcción del directorio (_Directory.Build.props_)

Los paquetes de Nuget instalados en nuestro proyecto se encuentran en el archivo _.csproj_ dentro de un elemento `<ItemGroup>`. La forma mas básica para actualizar los paquetes es verificar si existe una nueve versión en el sitio de Nuget y editar este archivo especificando la version nueva. Esto puede funcionar para soluciones con un solo proyecto pero deja de ser manejable en proyectos mas grandes.

```xml
<ItemGroup>
    <PackageReference Include="Ardalis.ListStartupServices" Version="1.1.3" />
    <PackageReference Include="Microsoft.AspNetCore.App" />
    <PackageReference Include="Microsoft.AspNetCore.Razor.Design" Version="2.2.0" PrivateAssets="All" />
    <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="2.2.3" />
    <PackageReference Include="Microsoft.Web.LibraryManager.Build" Version="1.0.172" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="4.0.1" />
  </ItemGroup>
```

# Gestor de paquetes de Visual Studio

Visual Studio tiene integrado una herramienta gráfica para el manejo de paquetes de Nuget. Esta puede funcionar por proyecto o para toda la solución. A la primera que puedes acceder mediante _Proyecto>Administrar paquetes Nuget_ mientras que a la segunda accedes _Herramientas>Administrar Paquetes de Nuget para la solución_.

<img data-src="/img/NugetVisualStudio.JPG" class="lazyload"  alt="Administrador de Paquetes de Nuget Visual Studio para un proyecto">

Básicamente esta compuesta por 3 pestañas: Examinar, Instalado, Actualizaciones: que permiten buscar e instalar nuevos paquetes. Verificar los paquetes instalados y actualizar la version de los paquetes. Cuando toca actualizar los paquetes de Nuget te recomiendo hacerlo usando el Administrador de paquetes de Nuget para porque con unos clics puedes actualizar todos. Unicamente tienes que seleccionar los paquetes que deseas actualizar y da clic en el botón actualizar adicionalmente tienes que aceptar la licencia.

<img data-src="/img/NugetSolucion.JPG" class="lazyload"  alt="Administrador de Paquetes de Nuget Visual Studio para la solución">

Al final veras que todos los archivos de proyecto fueron actualizados.

> **Tip profesional** siempre usa el control de versiones en tu proyecto. Visual Studio tiene herramientas integradas que permiten el manejo fácil de git.

<img data-src="/img/TeamExplorerNuget.JPG" class="lazyload"  alt="Administrador de Paquetes de Nuget Visual Studio para la solución">

# Linea de comandos : **dotnet-outdated**

Si prefieres usar la linea de comandos puedes usar el comando `dotnet add package` para instalar un nuevo paquete por ejemplo

```console
dotnet add package Humanizer --version 2.6.2
```

Lamentablemente este comando no permite actualizar los paquetes de Nuget pero para ello puede usar la herramienta global [dotnet outdated](https://github.com/jerriep/dotnet-outdated). Lo primero que tienes que hacer es instalarla con el siguiente comando:

```console
dotnet tool install --global dotnet-outdated
```

Posteriormente puedes usarla especificando un archivo de proyecto o solución.

```console
dotnet outdated eShopOnWeb.sln
```

La salida de este comando muestra los paquetes que pueden ser actualizados indicando posibles incompatibilidades o cambios que pueden provocar errores.

<img data-src="/img/dotnet-outdated.JPG" class="lazyload"  alt="Salida del comando dotnet outdated">

Si decides actualizar los paquetes de Nuget puedes usar la opción `-u`.

```console
dotnet outdated eShopOnWeb.sln -u
```

<img data-src="/img/CliUpdate.JPG" class="lazyload"  alt="Salida del comando dotnet outdated -u">

Si quieres ver los cambios puedes usar el los comandos `git status` y `git diff` para ver los archivos modificados. Adicionalmente puedes ver la ayuda de **dotnet-outdated** mediante el comando `dotnet outdated --help`.

<img data-src="/img/CLIDiferencias.JPG" class="lazyload"  alt="Salida del comando git diff">

# Directory.Build.props

Una forma adicional de controlar los paquetes de Nuget es especificando las versiones en archivo _Directory.Build.props_ y agregar un parámetro a la versión de cada referencia del paquete de Nuget _.csproj_.De esta forma solo tendremos que actualizar un archivo y tendremos controlados todos als versiones.

Crea un archivo llamado _Directory.Build.props_ en la raíz del proyecto.

```xml
<Project>
  <PropertyGroup Label="SDK Versions">
    <NetStandardTargetVersion>netstandard2.0</NetStandardTargetVersion>
    <NetCoreTargetVersion>netcoreapp2.2</NetCoreTargetVersion>
  </PropertyGroup>
  <PropertyGroup Label="Package Versions">
    <HumanizePackageVersion>2.6.2</HumanizePackageVersion>
  </PropertyGroup>
</Project>
```

Para el archivo de proyecto que utilice este paquete la referencia quedara de la siguiente forma:

```xml
<PackageReference Include="Humanizer" Version="$(HumanizePackageVersion)" />
```

Cada que necesites actualizar un paquete de Nuget solo necesitas actualiza el archivo _Directory.Build.props_

# Para llevar

* Scott Hanselman tiene un post sobre [dotnet outdated](https://www.hanselman.com/blog/dotnetOutdatedHelpsYouKeepYourProjectsUpToDate.aspx)

* Luis Ruiz Pavón y Carlos Landeras incluyerón al _Directory.Build.props_ como una [buena práctica de ASP.NET Core](https://youtu.be/YMJJh3sNu3o?t=1161).
