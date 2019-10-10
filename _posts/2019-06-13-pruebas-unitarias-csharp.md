---
layout: post
title:  "Pruebas unitarias con C#"
comments: true
categories: dotnet 
---

 La práctica llamada desarrollo guiado por pruebas o por sus siglas en ingles TDD <span lang="en">Test Driven Development</span>) es algo que no he encontrado en los proyectos que he visto y participado mas sin embargo considero que todos los proyectos deberían tener prueba automatizadas debido principalmente a dos razones: he visto lo tedioso y susceptible de error que son las pruebas manuales y la facilidad con que los programadores cometemos el mismo error más de una vez en nuestro código.

> Nunca pidas permiso para [refactorizar](https://es.wikipedia.org/wiki/Refactorizaci%C3%B3n). Nunca pidas permiso para escribir pruebas. Haces estas cosas porque SABES que son la mejor manera de avanzar más rápido. Cuando pides permiso, le estás pidiendo a alguien que se haga responsable de tus acciones. [Tio Bob Martin](https://twitter.com/unclebobmartin/status/1134824807969804291)

En la practica del <abbr title="Test Driven Development" lang="en">TDD</abbr> se busca codificar inicialmente las pruebas que cubran los requerimiento de proyecto y posteriormente escribir la menor cantidad de código que permita pasar las pruebas implementando el ciclo conocido como Rojo-Verde-Refactorizar o (<span lang="en">Red-Green-Refactor</span>). Este ciclo toma su nombre de los colores que usan los ejecutores de pruebas para rojo identificar una prueba fallida, verde una prueba satisfactoria, y refactorización es la acción que lleva a cabo el programador para pasar la prueba y aumentar la calidad del código.

El ciclo Red-Green-Refactor lleva 3 etapas : La primera RED, implica escribir una prueba unitaria está debe fallar ya que aun no contamos con el código escrito y el ejecutar de pruebas la marca en rojo. La segunda etapa se alcanza cuando se ha escrito código suficiente para pasar la prueba unitaria y el ejecutor de pruebas indica un estado verde. El último paso es refactorizar nuestro código para este optimizado y que sea que sea legible se debe asegurar que el estado quede en verde.

En este articulo se da una guía de como crear un proyecto con pruebas unitarias usando C# , [x.unit.net](https://xunit.net/) y la línea de comando `dotnet`. Para crear el proyecto se usa la versión preliminar del SDK de .NET Core 3.0 pero funcionará igual para cualquier otra versión.

A pesar de que existen gran cantidad de marcos de pruebas unitarias como [NUnit](https://nunit.org/) y [MSTest](https://docs.microsoft.com/dotnet/core/testing/unit-testing-with-mstest) preferimos usar **xunit.net** principalmente porque es el marco de pruebas elegido por los proyectos de código abierto [ASP.NET Core](https://github.com/aspnet/AspNetCore) y [Entitity Framework Core](https://github.com/aspnet/EntityFrameworkCore) y tengo la idea de en algún momento contribuir con algo de código. He de decir que ahora mismo esa posibilidad la veo lejana pero aun asi tengo la ilusión de poder hacerlo. Los marcos de pruebas unitarias tambíen se pueden usar para crear pruebas de integración ver por ejemplo:

* [Automatizando el Navegador con C# y Selenium]({% post_url 2018-07-30-automatizando-el-navegador %})
* [Web scraping con C#]({% post_url 2018-12-24-web-scraping-con-csharp %})

Elegimos hacerlo con la linea de comandos por dos razones porque me gusta entender como funcionan las cosas detrás de cámaras y es necesario saber estas cosa para configurar un <span lan="en">Pipeline</span> de entrega continua en Azure Devops o GitLab. Lo que es básicamente un archivo con extensión  *.yml* (ver ejemplo a continuación) donde se especifican las pasos necesarios (instrucciones para la linea de comandos) para construir, probar y desplegar nuestra aplicación. En mi trabajo uso [Gitlab Comunnity Edition](https://about.gitlab.com/) para el control de código fuente en un servidor en alojado en la red interna. Altamente recomendable.

```yml

image: microsoft/dotnet:latest
variables:
  OBJECTS_DIRECTORY: 'obj'
  NUGET_PACKAGES_DIRECTORY: '.nuget'
  SOURCE_CODE_PATH: '*/*/'
stages:
  - build
  - test.
# se omite parte del archivo
before_script:
  - 'dotnet restore --packages $NUGET_PACKAGES_DIRECTORY'
build:
  stage: build
  script:
    - 'dotnet build --no-restore'
tests:
  stage: test
  script:
    - 'dotnet test --no-restore'
```

## Biblioteca de clases con proyecto de pruebas unitarias

Por simplicidad en este ejercicio suponemos que requerimos escribir un método estático para invertir una cadena.
Èl método `InvierteCadena` estará en una clase estática llamada `Utilidades`
Este método debe cumplir con los siguientes requisitos:

* regresar `null` si le mandamos una cadena nula
* regresar `string.Empty` si le mandamos una cadena vacía.
* regresar la misma cadena si la longitud de la cadena es una
* regresar `aloh` si le mandamos `hola`
* regresar `aloH` si le mandamos `Hola`

La versión inicial del método sera `InvierteCadena` es igual a la que utiliza la característica **Implementar Interfaz** de Visual Studio. Esto es necesario para poder compilar la aplicación.

```cs
public static string InvierteCadena(string entrada)
{
  throw new NotImplementedException();
}
```

### Estructura del proyecto

1. Abrir una terminal y crear una nueva solución en blanco con el comando

```bash
dotnet new sln -o MiApp
```

Esto es por si en algún momento quieres usar Visual Studio 2019 [aca]({% post_url 2019-04-05-visual-studio-2019 %}) puedes ver las características mas importantes de esta version. Esto creara una carpeta llamada *MiApp* que contendrá el proyecto que tiene la siguiente estructura. En la carpeta *src* colocaremos todo el código de la aplicación y en la carpeta *test* el código de pruebas unitarias.

```clean
 MiApp
├───src
│   └───MiApp
└───test
    └───MiAppTest
```

2. Crear un proyecto biblioteca de clases:

```console
dotnet new classlib -o MiApp/src/MiApp
```

Este proyecto es donde se escribirá el código de la aplicación. Algunos autores lo llamas **Sistema Bajo Prueba**.
Aquí es donde debe estar la clase estática `Utilidades` con el método invierte cadena.

4. Crear un proyecto de pruebas con la plantilla xUnit. El argumento `-o` especifica la carpeta del proyecto.

```
dotnet new xunit -o MiApp/test/MiAppTest
```

Esta plantilla contiene añade al archivo de proyecto `.csproj` los paquetes de Nuget necesarios para poder codificar y ejecutar pruebas unitarias con xunit. En algunas ocaciones las versiones de estos paquetes pueden estar desactualizadas. Puedes usar la herramienta global  [dotnet-oudated]() para actualizarlos mediante la linea de comandos.

```xml
<ItemGroup>
  <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.0.1" />
  <PackageReference Include="xunit" Version="2.4.0" />
  <PackageReference Include="xunit.runner.visualstudio" Version="2.4.0" />
</ItemGroup>
```

5. Agregar una referencia al proyecto de la aplicación en en el proyecto de pruebas.

```
dotnet add MiApp\test\MiAppTes reference MiApp\src\MiApp
```

6. Agregar proyectos a solución

```
dotnet sln MiApp add MiApp\src\MiApp
dotnet sln MiApp add MiApp\test\MiAppTest
```

### Implementar ciclo Red , Green , Refactor

Primero empezamos a crear las pruebas. Cambiamos el nombre de la clase `UnitTest` por `InvierteCadenaTest` y escribimos nuestra primera prueba.

```cs
[Fact]
public void DebeSerNulo()
{
  string entrada = null;
  var result =  Utilidades.InvierteCadena(entrada);
  Assert.Null(result);
}
```

Una prueba unitaria en xunit es un método decorado con el atributo `[Fact]` o `[Theory]` del espacio de nombres `Xunit` que regresa `void`. Esta prueba cubre el primer requerimiento descrito anteriormente. Una prueba unitaria generalmente usa el patrón 3A o en ingles <span lang="en">[Arrange Act Assert](http://wiki.c2.com/?ArrangeActAssert)</span> donde en la etapa

|Etapa  |Detalles |
|-------|---------|
|Arrange| Se establecen las precondiciones y entradas necesarias para la prueba|
|Act    | Se invoca el método o porción de código a probar.|
|Assert | Se afirma que los resultados esperados han ocurrido|

Con esto en mente escribimos las siguientes dos pruebas del requerimiento. Que sigue el mismo patrón que el método anterior.

```cs
[Fact]
public void DebeSerVacio()
{
  string entrada = string.Empty;
  var result =  Utilidades.InvierteCadena(entrada);
  Assert.Equal(string.Empty,result);
}

[Fact]
public void DebeSerIgual()
{
  string entrada = "A";
  var result =  Utilidades.InvierteCadena(entrada);
  Assert.Equal(entrada,result);
}
```

Para el ultimo requerimiento usaremos una prueba con el atributo `[Theory]` que básicamente estable un conjunto de valores de entrada y resultado esperado integrados en el atributo `[InlineData()]`.

```cs
[Theory]
[InlineData("Hola","aloH")]
[InlineData("oso", "oso")]
[InlineData("hola", "aloh")]
[InlineData("yo Programo", "omargorP oy")]
[InlineData("Omar", "ramO")]
public void InvertirConjuntoDeCadenas(string entrada,string valorEsperado)
{
    var result =  Utilidades.InvierteCadena(entrada);
    Assert.Equal(valorEsperado,result);
}
```

Con esto podemos estamos en la primera etapa del ciclo Red-Green-Refactor ejecutando las pruebas y viéndolas fallar

```
dotnet test
```

<img data-src="/img/dotnet-test-red.JPG" class="lazyload"  alt="Salida del comando dotnet test">

La primeras 3 pruebas se pueden pasar con el siguiente código. La salida del comando `dotnet test`.

```cs
if (string.IsNullOrEmpty(entrada) || entrada.Length == 1)
{
  return entrada;
}
else
{
  throw new NotImplementedException();
}
```

<img data-src="/img/dotnet-test-red-2.JPG" class="lazyload"  alt="Salida del comando dotnet test">

El código que puede pasar todas las pruebas el siguiente.
```cs
public static string InvierteCadena(string entrada)
{

  if (string.IsNullOrEmpty(entrada) || entrada.Length == 1)
  {
    return entrada;
  }
  else
  {
    var letras = entrada.ToCharArray();
    string salida = string.Empty;
    for (int indice = letras.Length; indice > 0; indice--)
    {
      salida += letras[indice - 1];
    }
    return salida;
  }
}
```

<img data-src="/img/dotnet-test-green.JPG" class="lazyload"  alt="Salida del comando dotnet test">

Finalmente puedes refactorizar el codigo para aumentar la calidad del mismo. Por ejemplo usando el refactoring sugerido de Visual Studio conocido como **Invertir if**

<img data-src="/img/dotnet-test-refactor.JPG" class="lazyload"  alt="Salida del comando dotnet test">

# Referencias

* [Pruebas unitarias con x.unit](https://docs.microsoft.com/dotnet/core/testing/unit-testing-with-dotnet-test)

* [Getting Started with xUnit.net. Using .NET Core with the .NET SDK command line](https://xunit.net/docs/getting-started/netcore/cmdline)

* Serie de videos sobre pruebas unitarias del show _Visual Studio Toolbox_:
    * [Modern Dev Practices Unit Testing high](https://www.youtube.com/watch?v=4averylLdjQ)
    * [Unit Testing: Test Driven and Scenario Based Testing](https://www.youtube.com/watch?v=HhRvW1b4IwM)
    * [Unit Testing: xUnit](https://www.youtube.com/watch?v=a7iGLAvekt4)
    * [Unit Testing: MOQ Framework](https://www.youtube.com/watch?v=dZ2Psa_Bn2Q&t=16s)
    * [Unit Testing: Existing Code](https://www.youtube.com/watch?v=148LeEedba4)

* Serie de videos _Devops para ASP.NET Developers_:
    * [DevOps For ASP.NET Developers Pt.1 - What is DevOps?](https://www.youtube.com/watch?v=RAlHg2adggQ)
    * [DevOps For ASP.NET Developers Pt.2 - Source Control](https://www.youtube.com/watch?v=2G6uS4ShdPc)
    * [DevOps For ASP.NET Developers Pt.3 - Work Item Tracking](https://www.youtube.com/watch?v=2qhFITzTeIo)
    * [DevOps For ASP.NET Developers Pt.4 - Continuous Integration](https://www.youtube.com/watch?v=ewTEgumgO2I)
    * [DevOps For ASP.NET Developers Pt.5 - Unit Testing](https://www.youtube.com/watch?v=NTO2P4K0CGo)
    * [DevOps For ASP.NET Developers Pt.6 - Release Pipelines](https://www.youtube.com/watch?v=tl4o0xDWj28)
