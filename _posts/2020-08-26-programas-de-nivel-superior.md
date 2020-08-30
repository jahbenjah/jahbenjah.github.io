---
layout: post
title:  "Programas de Nivel Superior"
date:   2020-08-26 22:22:47 +0000
categories: csharp
permalink: /:categories/:title:output_ext
image:
  path: /img/og-top-level-programs.jpg
  height: 715
  width: 1366
description: "Los Top Level Programs en C# 9.0 permiten eliminar la necesidad del método Main en las aplicaciones de .NET sin perder ninguna característica."
---

Hola qué tal en este artículo les mostraré una de las características de C# 9.0 llamada en ingles "Top Level Programs" o programas de nivel superior en español que lo que hace básicamente eliminar la necesidad de tener una clase llamada `Program` y dentro de esa clase programa un método `Main`. Esta característica esta por salir en C# 9.0 en conjunto con la liberación de .NET 5. La primera como ves que vi un demo sobre esto fue en la sesión de Mads Torgensen y Dusting Cambell [C# Today & Tomorrow](https://www.youtube.com/watch?v=OHue6faaIwU) en la conferencia de [Build 2020](https://www.youtube.com/watch?v=S_wNRx7f7rU&list=PLFPUGjQjckXEiPiW868RGBYYHXhBCGLng). Justo unos minutos después de ver este demo ya tenia intenciones de probar esta característica , asi que me descargue .NET 5 y comencé a realizar pruebas para mi sorpresa todavía no estaba disponible ninguna de las características de C# 9.0. Como antes he visto otros autores que admiro citar sus propios Tweets y yo también quiero hacerlo le escribía se mismo día al diseñador principal de C# , Mads Torgensen , para mi sorpresa si me contesto

> @MadsTorgersen ,@dcampbell : Estoy tratando de usar la nueva característica de C# 9.0   "programas de nivel superior" con la vista previa 4 de .NET 5.O pero obtengo el error CS0116 ¿Me falta algo?

<img src="/img/respuesta_csharp9.png" loading="lazy"  alt="Respuesta de Mads Torgersen">

El día 25 de agosto del 2020 anunciaron la nueva versión de .NET 5 el previo 8 esta version ya es una versión completa en características y muy parecida a la versión final que saldrá en noviembre.Falta cerca de dos meses para que completen todo lo que incluye .NET 5 que será una versión _Current_ es decir no tiene marcada como a largo plazo es decir tendrá soporte de un año. La versión que esta planeado para tener soporte largo plazo o LTS sera la version NET 6.0.Bueno para probar las nuevas características de C# 9.0 necesitas tener el SDK de .NET 5.0 O superior por ejemplo `5.0.100-preview.8.20417.9`. 

Dentro de las nuevas características de C# 9.0 están

* Init-only properties
* Init accessors and readonly fields
* Records
  * With-expressions
  * Value-based equality
  * Data members
  * Positional records
* Top-level programs
* Improved pattern matching

Para una mas detalles revisa [Welcome to C# 9.0](https://devblogs.microsoft.com/dotnet/welcome-to-c-9-0/). Por ahora lo que vamos a enfocarnos en los programas de un nivel superior 

# Nuestro ambiente de Pruebas

Para mostrar las nuevas características de C# 9.0 estoy utilizando Visual Studio Code y la versión previo 8 corriendo sobre en un contenedor de Docker con ayuda de la extension Visual Studio Code Remote Containers. El Dockerfile nada más específica la versión de .NET 5 y trae una instalación para Node.js que es necesaria para que funcionen los proyectos de Angular y React.

```Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:5.0
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG INSTALL_NODE="true"
ARG NODE_VERSION="lts/*"
ENV NVM_DIR=/home/vscode/.nvm
ARG INSTALL_AZURE_CLI="false"
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \
    && apt-get -y install git iproute2 procps apt-transport-https gnupg2 curl lsb-release \
    && groupadd --gid $USER_GID $USERNAME \
    && useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME\
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    && if [ "$INSTALL_NODE" = "true" ]; then \
        mkdir ${NVM_DIR} \
        && curl -so- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash 2>&1 \
        && chown -R vscode:vscode ${NVM_DIR} \
        && /bin/bash -c "source $NVM_DIR/nvm.sh \
            && nvm install ${NODE_VERSION} \
            && nvm alias default ${NODE_VERSION}" 2>&1 \
        && INIT_STRING='[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"  && [ -s "$NVM_DIR/bash_completion" ] && \\. "$NVM_DIR/bash_completion"' \
        && echo $INIT_STRING >> /home/vscode/.bashrc \
        && echo $INIT_STRING >> /home/vscode/.zshrc \
        && echo $INIT_STRING >> /root/.zshrc \
        && curl -sS https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/pubkey.gpg | apt-key add - 2>/dev/null \
        && echo "deb https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
        && apt-get update \
        && apt-get -y install --no-install-recommends yarn; \
    fi \
    && if [ "$INSTALL_AZURE_CLI" = "true" ]; then \
        echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $(lsb_release -cs) main" > /etc/apt/sources.list.d/azure-cli.list \
        && curl -sL https://packages.microsoft.com/keys/microsoft.asc | apt-key add - 2>/dev/null \
        && apt-get update \
        && apt-get install -y azure-cli; \
    fi \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*
ENV DEBIAN_FRONTEND=dialog
```

Puedes verificar tú instalación con el comando `dotnet --info`. AquÍ abajo puedes ver el ejemplo de salida de este entorno.

```bash
dotnet --info


SDK de .NET Core (reflejando cualquier global.json):
 Version:   5.0.100-preview.8.20417.9
 Commit:    fc62663a35

Entorno de tiempo de ejecución:
 OS Name:     debian
 OS Version:  10
 OS Platform: Linux
 RID:         debian.10-x64
 Base Path:   /usr/share/dotnet/sdk/5.0.100-preview.8.20417.9/

Host (useful for support):
  Version: 5.0.0-preview.8.20407.11
  Commit:  bf456654f9

.NET SDKs installed:
  5.0.100-preview.8.20417.9 [/usr/share/dotnet/sdk]

.NET runtimes installed:
  Microsoft.AspNetCore.App 5.0.0-preview.8.20414.8 [/usr/share/dotnet/shared/Microsoft.AspNetCore.App]
  Microsoft.NETCore.App 5.0.0-preview.8.20407.11 [/usr/share/dotnet/shared/Microsoft.NETCore.App]

To install additional .NET runtimes or SDKs:
  https://aka.ms/dotnet-download
```

# Adiós método Main

El proyecto de consola trae el clásico _Hola Mundo_ , que todos conocemos y hemos ejecutado con .NET 5 funciona igual. Este programa tan pequeño y sin sentido contiene gran cantidad de conceptos que pueden representar gran dificultad para el que recién inicia el su camino con C#. Entre los conceptos que se incluyen están los espacios de nombres, directivas `using`, métodos estáticos,modificadores de acceso, argumentos, valores de retorno, arreglos entre otros.

```cs
using System;
namespace HolaMundo
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("!Hola mundo!");
        }
    }
}
```

C# 9.0 elimina la necesidad de tener toda esta código de ceremonia, es decir, la necesidad de tener esta clase `Program` y dentro de el método `Main` por lo que el programa anterior se reduce a lo siguiente: a 2 simples linea o una sola línea `System.Console.WriteLine("!Hola mundo!")`:

```cs
using System;
Console.WriteLine("!Hola mundo!");
```

Comparando entre ambas versiones puedes ver que el método `Main` contiene un parámetro del tipo `string[]` llamado args y en C# 9.0 con los programas de nivel superior parece que ya no esta pero el compilador Roslyn hace todo ese trabajo por nosotros e inserta una variable mágica llamada `args` del tipo `string[]` como la del método `Main` y que tiene el mismo alcance. 

Para asignar valores a la variable args puedes especificar los argumentos separados por espacio con el después del comando `dotnet run`

```cs
dotnet run argumento1 argumento2 argumento
```

Por ejemplo el siguiente código imprimirá en la pantalla cada uno de los argumento proporcionados en la linea de comandos.

```cs
if (args.Length > 0)
{
  foreach(string arg in args)
  System.Console.WriteLine(arg);
}

```

# ¿Qué mas puedo hacer en los programas de nivel superior de C# 9.0 ?

Puedes ejecutar la mayoría del código de C#  que puedes ejecutar por ejemplo
* Importar espacios de nombres con `using`
* Usar funciones locales
* Declarar clases 
* Declarar interfaces
* Usar `async` `await`
* Usar un `return`

# Restricciones

No puedes usar métodos
Si declaras un tipo (clase , estructura, enumeración) tiene que ser al final.


# Donde puedo saber más

Actualmente todavía no hay documentación en el sitio de Microsoft toda la propuesta de diseño y las motivaciones de esta característica se encuentra en el repositorio de Github dedicado al diseño del Lenguaje C# [csharplang](https://github.com/dotnet/csharplang/blob/master/proposals/csharp-9.0/top-level-statements.md)