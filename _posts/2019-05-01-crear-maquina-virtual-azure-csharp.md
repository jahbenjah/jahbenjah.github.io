---
layout: post
title:  "Crear una máquina virtual en Azure con C#"
date:   2019-05-01 11:18:55 +0000
categories: azure
permalink: /:categories/:title:output_ext
image:
  path: /img/og-vmcsharp.jpg
  height: 341
  width: 650
---

La máquinas virtuales de Azure son un ejemplo de Infraestructura como Servicio o <abbr lang="en" title="Infrastructure as a Service">IaaS</abbr> por sus siglas en ingles. Estas se pueden crear mediante el portal de Azure, la linea de comandos, el Cloud Shell o mediante un lenguaje de programación para los que exista un SDK como C#, Java o Javascript entre otros. Aquí te mostramos como crear una máquina virtual con C# y .NET Core.

Una vez que hayamos iniciado sesión con `az login` en la linea de comandos de Azure podemos permitir acceder a Azure una aplicación de C# necesitamos crear un "service principal" y lo hacemos con la linea de comandos ejecutando:

```bash
az ad sp create-for-rbac --sdk-auth
```

<img data-src="/img/serviceprincipal.webp" class="lazyload"  alt="Linea de comandos de Azure">

Con esta información armaremos un archivo de texto llamado `azureauth.properties` con el siguiente contenido :

```txt
subscription=<coloca el tuyo aquí>
client=<coloca el tuyo aquí>
key=<coloca el tuyo aquí>
tenant=<coloca el tuyo aquí>
managementURI=https://management.core.windows.net/
baseURL=https://management.azure.com/
authURL=https://login.windows.net/
graphURL=https://graph.windows.net/
```

Este archivo debe estar colocado en la carpeta _bin_ donde se encuentra nuestra _.dll_ del proyecto esto por simplicidad y considerando que solo es una prueba.

Para el proyecto de C# es un proyecto de consola creado con `dotnet new console -o CreateAzureVm` al cual le instalamos los siguientes paquetes de Nuget.

```bash
dotnet add package Microsoft.Azure.Management.Compute.Fluent
dotnet add package Microsoft.Azure.Management.Compute
```

El código es divido en 3 partes la primera sirve para crear las credenciales y autenticarse en Azure. La segunda parte crea una maquina virtual de Linux usando Centos 7.2 y la ultima parte crea una maquina virtual de Windows Server 2012. Cada una de las maquinas se crea en su propio Grupo de Recursos. Nota los enumeraciones que existen para las regiones de azure, el tamaño de las maquinas virtuales y los sistemas operativos conocidos.

```cs
using Microsoft.Azure.Management.Compute.Fluent;
using Microsoft.Azure.Management.Compute.Fluent.Models;
using Microsoft.Azure.Management.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;

namespace CreateAzureVm
{
    class Program
    {
        static void Main(string[] args)
        {
            var credentials = SdkContext
                .AzureCredentialsFactory
                .FromFile("azureauth.properties");

            var azure = Azure
                .Configure()
                .WithLogLevel(HttpLoggingDelegatingHandler.Level.Basic)
                .Authenticate(credentials)
                .WithDefaultSubscription();

            //Crear una máquina Centos sin acceso SSH
            IVirtualMachine centos = azure.VirtualMachines
                .Define("MyVirtualMachine")
                .WithRegion(Region.USSouthCentral)
                .WithNewResourceGroup("MiGrupDeRecursosCetnos")
                .WithNewPrimaryNetwork("10.0.0.0/28")
                .WithPrimaryPrivateIPAddressDynamic()
                .WithNewPrimaryPublicIPAddress("CentosnIPAddressLabel")
                .WithPopularLinuxImage(KnownLinuxVirtualMachineImage.CentOS7_2)
                .WithRootUsername("benjamin")
                .WithRootPassword("SecretPassword123")
                .WithSize(VirtualMachineSizeTypes.BasicA0)
                .Create();

            IVirtualMachine windowsVM = azure.VirtualMachines.Define("WinVirtualMachine")
                .WithRegion(Region.USEast)
                .WithNewResourceGroup("MiGrupDeRecursosWindows")
                .WithNewPrimaryNetwork("10.0.0.0/28")
                .WithPrimaryPrivateIPAddressDynamic()
                .WithNewPrimaryPublicIPAddress("WinIPAddressLabel")
                .WithPopularWindowsImage(KnownWindowsVirtualMachineImage.WindowsServer2012R2Datacenter)
                .WithAdminUsername("benjamin")
                .WithAdminPassword("SecretPassword123")
                .WithSize(VirtualMachineSizeTypes.StandardD3V2)
                .Create();
        }
    }
}
```

Este ejemplo no esta listo para producción pero se puede tomar como base para germinar ideas de como explotar esta funcionalidad con una Interfaz gráfica para escritorio, web o movil. Puedes ver consultar tus maquinas virtuales en Azure con el comando `az vm list` o desde el portal.

```
> az vm list -o table
Name               ResourceGroup            Location        Zones
-----------------  -----------------------  --------------  -------
WinVirtualMachine  MIGRUPDERECURSOSWINDOWS  eastus
MyVirtualMachine   MIGRUPDERECURSOSCETNOS   southcentralus
```

<img data-src="/img/MaquinasVistualesAzure.webp" class="lazyload"  alt="Máquinas virtuales creadas con C# en Azure">

Si deseas eliminar estas máquinas virtuales, también puedes hacerlo con C# , en este caso eliminamos el grupo de recursos y los recursos que le pertenecen.

```cs
azure.ResourceGroups.DeleteByName("MiGrupDeRecursosWindows");
```

> Nota: En el portal de Azure hay una sección para descargar la **plantilla** que contiene la definición de un recurso en Azure en distintos lenguajes como C#, Ruby o json, la CLI de Azure o PowerShell. Pero en el caso de C# no usa la version de la <abbr lang="en" title="Application Programming Interface">API</abbr> fluida de Azure.

Donde aprender más

* [Azure for .NET and .NET Core developers](https://docs.microsoft.com/dotnet/azure/index?view=azure-dotnet)
* [API Reference](https://docs.microsoft.com/en-us/dotnet/api/overview/azure/?view=azure-dotnet)