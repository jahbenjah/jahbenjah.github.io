---
layout: post
title:  "Donde van las directivas using de C#"
date:   2021-12-19 12:00:01 +0000
categories: csharp
permalink: /:categories/:title:output_ext
---

En un programa de C# las directivas using generalmente siempre se colocan en la parte superior del archivo antes de la declaración del espacio de nombres por ejemplo:

```cs
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace PizzaStore.Models
{
    public class Pizza
    {
     //  Otro codigo
    }
}
```

Pero este no es el único lugar donde pueden ir, de hecho hay algunos asistente p generadores de codigo que colocan las instrucciones using dentro de la declaración del espacio de nombres : 

```cs
namespace PizzaStore.Models
{
    using System;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;
   
    public class Pizza
    {
     //  Otro codigo
    }
}
```

Lo que sí es como requisito que vayan antes de la declasracion de algu tipo porque si los colocas al final del archivo a ella género un errotr "Error CS1529 Una cláusula using debe preceder al resto de elementos definidos en el espacio de nombres, excepto las declaraciones de alias externos"

```cs
//Este codigo no compila y genera un error CS1529
namespace WindowsFormsApp1
{
    internal static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());
        }

        using System;
        using System.Collections.Generic;
        using System.Linq;
        using System.Threading.Tasks;
        using System.Windows.Forms;
    }
}
```

C# 10 incluye una nueva característica llamada espacio de nombres con un alcance a nivel de archivo que te permite declarar el espacio de nombres sin la necesidad de colocar `{}` por ejemplo

```cs
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace PizzaStore.Models;

public class Pizza
{
    //  Otro codigo
}

```

Entonces con esto cambia cómo podemos ubicarlos las instrucciones using ya que podemos ubicar al principio o antes de la declaración del espacio del nombres. Hay otra cosa que también va a cambiar con el .NET 6 porque que por default trae habilitado una configuración que se llama **ImplicitUsings** que hace es importar las instrucciones using más comunes por tipo de proyecto de forma global por lo en nuestros archivos de .cs ya no seran necesarias.

```cs

<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

</Project>
```

<div class="video-responsive">
<iframe loading="lazy" src="https://www.youtube.com/embed/1kT09zR5XX4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
