---
layout: post
title:  "Tutorial ASP.NET Core"
date:   2019-09-08 12:00:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/og-tutorial.jpg
  height: 378
  width: 729
description: Tutorial de ASP.NET Core 2.2, Entity Framework Core y MySQL creando una aplicación MVC. Estructura del proyecto y creación del modelo de C# usando "Code Firts" 
last_modified_at: 2019-09-08 8:05:26 +0000
author: Benjamin Camacho
---

Bienvenido a la primera publicación del tutorial de ASP.NET Core en español en este crearemos una aplicación web basada en la plantilla MVC de ASP.NET Core y tiene como propósito principal mostrar una forma de hacer tareas comunes en este framework como ejecutar las operaciones <abbr lang="en" title="Create Read Update Delete">CRUD</abbr> con una base de datos, validar formularios ,instalar la aplicación , crear un contenedor de docker, usar la inyección de dependencias y algunos temas adicionales. Este estará basado en mi experiencia personal e incluirá las referencias a otros recursos de donde aprendido como son libros, blogs o la documentación misma.

En este primera sección creamos la estructura del proyecto,agregaremos el control de código fuente con git y crearemos el modelo de la base de datos. Adicionalme alojaremos el código fuente del proyecto en un repositorio de Github.

Aunque en mi trabajo del dia a dia uso Visual Studio y harto el ratón siempre me ha atraído el poder de la linea de comandos y poder teclar sin el uso del ratón por tal motivo siempre que exista una herramienta de linea de comandos intentare hacer uso de ella, esto siguiendo el consejo "**Aprende a usar la herramientas de linea de comanando**" del libro [97 Things Every Programmer Should Know](https://www.oreilly.com/library/view/97-things-every/9780596809515/). Para poder seguir este tutorial debes tener instalado las siguientes herramientas de línea de comandos y tener una cuenta en Github. Incluimos el comando para para verificar la versión que están instaladas.

* SDK de dotnet : `dotnet --version`
* git `git --version`

Si tienes alguna duda con alguna de ellas revisa la documentación o dejame un comentario que intentare responder a la brevedad.

# Control de código fuente y Estructura del proyecto

 Seguiremos una estructura del proyecto muy común en el contexto del Open Source.El código sera alojado en un repositorio de Github pero es posible alaojarlo en cualquier otro servicio que soporte git como Azure Repos, BitBucket o Gitlab. Particularmente en mi trabajo uso Gitlab en una máquina virtual y funciona de maravilla.

## git y Github

Todo el código de la aplicación estará dentro de la carpeta _Sakila_ que incluirá dos carpetas: _src_ para el código y _test_ para los proyectos de prueba. A nivel de la estos directorios incluiremos archivos que tienen un alcance para todo el proyecto como los siguientes archivos `.gitignore`, `LICENSE`, `Dockerfile`,`global.json` o el archivo `README` entre otros.

> En proyectos más grandes pueden existir carpetas adicionales a _src_ y _test_ como ejemplo ve la estructura del código fuente de [ASP.NET Core](https://github.com/aspnet/AspNetCore) y revisa el contenido de la carpeta _eng_  y _docs_.

```bash
├───src
└───test
```

La primer tarea a realizar es el repositorio git, agregaremos el archivo `.gitignore` basado en la plantilla de Visual Studio y crearemos repositorio de Github. Para crear el repositorio en Github usamos las siguientes opciones en la pantalla. Observa que hay una opción para activar las Azure Pipelines esto es por que tengo instalada está [extensión](https://github.com/marketplace/azure-pipelines) en mi cuenta espera un post para agregar el archivo _.yml_ y definir el proceso de integración continua en Azure Devops.

<img data-src="/img/crear-sakila-repo.JPG" class="lazyload" alt="Pantalla para crear un nuevo repositorio en Github">

> **Archivo .gittgnore** es una buena practica incluir siempre el archivo `.gitignore` en el repositorio. Hay una gran colección de archivos con opciones predefinidas en el repositorio [Github gitignore](https://github.com/github/gitignore/). Generalmente usamos el [archivo _.gitignore_ para Visual Studio](https://github.com/github/gitignore/blob/master/VisualStudio.gitignore). El SDK de .NET Core trae una nueva plantilla que copia el archivo .gitignore para Visual Studio con `dotnet new gitignore`

Para comenzar con el proyecto crea una carpetalla llamada _Sakila_ y ejecuta inicializa el repositorio de git.

```bash
mkdir Sakila
git init
```

Hasta aquí tenemos un repositorio local sin ningun archivo. Para agregar una relación con el repositorio creado en Github necesitamos agregar lo que en git se conoce como un remoto. Esto lo hacemos mediante el siguiente comando

```bash
git remote add origin https://github.com/jahbenjah/Sakila.git
```

Copiamos el contenido del archivo _.gitignore_ del repositorio de Github y lo agregamos al control de código fuente mediante el comando

```bash
git add .gitignore
```

Con esto ya podemos publicar nuestro código el el repositorio remoto para ello agregammos un `commit` y publicamos la rama master al repositorio remoto.

```bash
git commit -m "Se crea estructura inicial del proyecto"
git push -u origin master
```

A partir de aqui empezaremos a repetir el patron anterior de publicación y seguieremos el [flujo de Github](https://guides.github.com/introduction/flow/),es decir, para cada característica nueva de la aplicación crearemos una **rama de git** y cuando esten listos los cambios crearemos un **Pull Request** para incorporar nuestros cambios a la rama _master_. Para crear una rama y cambiarse de rama ejecuta

```bash
git branch estructura-proyecto
git checkout estructura-proyecto
```

## Proyecto

Crearemos 3 proyectos contenidos en la carpeta `Sakila/src`. Tenemos planeado agregaremos pruebas unitarias a esta aplicación en un articulo posterior

* _Sakila.Core_ Biblioteca de clases para la lógica de la aplicación
* _Sakila.Infrastructure_ Biblioteca de clases para el código de Entity Framework Core que se comunica con la base de datos.
* _Sakila.Web_ aplicación de ASP.NET Core usando la plantilla de MVC para para mostrar como acceder a la base de datos en este proyecto.

> **Nota** Si cuentas con más de una versión del _SDK_ de .NET Core es recomendable que uses un archivo _global.json_ para especificar la versión de las herramientas que deseas utilizar. Se sugiere que el archivo global.json se coloque en la carpeta raíz que contiene todo el código. Puedes verificar los SDK instalado en tu computadora con el comando `dotnet --list-sdks`. Puedes crear un archivo global.json con el comando `dotnet new globaljson --sdk-version 2.2.401`.

En una terminal ejecuta los siguientes comandos para crear una carpeta y un solución llamada *Sakila* y _Sakila.sln_ respectivamente.Para crear los proyectos ejecuta los siguientes comandos uno seguido de otro. La opción -o permite especificar el directorio de salida.

```bash
mkdir Sakila
cd Sakila
dotnet new sln
dotnet new globaljson --sdk-version 2.2.401
dotnet new classlib -o src\Sakila.Core --no-restore
dotnet new classlib -o src\Sakila.Infrastructure --no-restore
dotnet new mvc -o src\Sakila.Web --no-restore
```

Elimina los archivos _Class1.cs_ de los proyectos _Sakila.Core_ y _Sakila.Infrastructure_. Si usas Linux puedes usar `rm` en lugar de `del`

```bash
del src\Sakila.Core\Class1.cs
del src\Sakila.Infrastructure\Class1.cs
```

Agrega los proyectos a la solución ejecuta los siguientes comandos:

```bash
dotnet sln add src\Sakila.Core\Sakila.Core.csproj
dotnet sln add src\Sakila.Infrastructure\Sakila.Infrastructure.csproj
dotnet sln add src\Sakila.Web\Sakila.Web.csproj
```

Hasta aquí tenemos una solución con los tres proyectos sin ninguna relación entre ellos. En la siguiente sección agregaremos los paquetes de Nuget y referencias a proyectos necesarios.

### Referencias a proyectos y Paquetes de Nuget

El proyecto _Sakila.Core_ unicamente requiere el paquete `MySql.Data` y esto porque la tabla _address_ utiliza el tipo de dato `MySqlGeometry` de MySQL. Lo instalamos con el siguiente comando :

```bash
dotnet add src\Sakila.Core\Sakila.Core.csproj package MySql.Data
```

El proyecto _Sakila.Infrastructure_ requiere el paquetes de Nuget `MySql.Data.EntityFrameworkCore` y una referencia al proyecto _Sakila.Core_ para agregarlas ejecuta el siguiente comando para instalarlo:

```bash
dotnet add src\Sakila.Infrastructure\Sakila.Infrastructure.csproj package MySql.Data.EntityFrameworkCore
dotnet add src\Sakila.Infrastructure\Sakila.Infrastructure.csproj reference src\Sakila.Core\Sakila.Core.csproj
```

Finalmente en el proyecto _Sakila.Web_ instala el paquete de Nuget `Microsoft.EntityFrameworkCore.Design` con el comando:
También agrega referencias a los proyectos Sakila.Core y Sakila.Infrastructure

```bash
dotnet add src\Sakila.Web\Sakila.Web.csproj package Microsoft.EntityFrameworkCore.Design --version 2.2.2
dotnet add src\Sakila.Web\Sakila.Web.csproj reference src\Sakila.Core\Sakila.Core.csproj
dotnet add src\Sakila.Web\Sakila.Web.csproj reference src\Sakila.Infrastructure\Sakila.Infrastructure.csproj
```

Hasta aquí tenemos lista la estructura del proyecto por lo que es un buen momento para inicializar el repositorio de git. Posteriormente comenzaremos el proceso para generar el modelo de clases de C# a partir de una base existente. Si usas Visual Studio fácilmente puedes usar _Archivo>Nuevo Proyecto_ en la interfaz gráfica para crear estos proyectos.

## Cadena de conexión para MySQL

Lo primero que necesitamos son las credenciales para acceder a la base de datos. Con estas debemos crear una cadena de conexión que no es más que un conjunto de claves y valores separadas por comas. Si tienes duda como crearla puedes ver mi post [sobre cadenas de conexión con C#]({% post_url 2019-02-27-cadenas-de-conexion-csharp %}) para más detalles.

```bash
server=localhost;database=Sakila;port=3306;user id=root;password=TuContraseña.
```

Esta cadena la usaremos más adelante para general el modelo de clases a partir de la base de datos.

## Generando el modelo de clases en C\#

Para generar el modelo de clases de C# de la base de _sakila_ usaremos el comando `dotnet ef dbcontext scaffold` por lo que es importante conocer las opciones disponibles para ello ejecutamos `dotnet ef dbcontext scaffold --help` para obtener la siguiente salida:

`dotnet ef dbcontext scaffold` para generar una modelo de _Entity Framework Core_ para la base de datos *sakila* de MySQL con un proyecto que sigue la arquitectura limpia que describen en el libro gratuito [Architect Modern Web Applications with ASP.NET Core and Azure](https://dotnet.microsoft.com/learn/aspnet/architecture). Usamos la version de 5.7 de MySQL y la version 2.2 de ASP.NET Core.


Los valores para los argumentos que necesitamos son:

```cs
Connection :"database=Sakila;server=localhost;port=3306;user id=root;password=Password"
Proveedor: MySql.Data.EntityFrameworkCore
```

Como vemos existen gran cantidad de opciones disponibles. A continuacion enlistamos las que opciones que usaremos:

|Parametro|Valor| Descripcion|
|-------------|-----------|------------|
|-s           | src/Sakila.Web/Sakila.Web.csproj|Define el proyecto de inicio |
|-o           | ../Sakila.Core/Entities | Define el directorio donde se colocaran los archivos de salida|
|-c           | SakilaContext |Especifica el nombre del DbContext|
|-context-dir |./Sakila.Infrastructure |Especifica la ubicacion del DbContext|
|-v           | |No sirve para ver detalles de la salida|

Sin más detalle ejecutamos el siguiente comando para realizar la ingenieria inversa de la base de MySQL

```bash
dotnet ef dbcontext scaffold "database=Sakila;server=localhost;port=3306;user id=root;password=Password" MySql.Data.EntityFrameworkCore -s src/Sakila.Web/Sakila.Web.csproj -o ../Sakila.Core/Entities -c SakilaContext --context-dir ../Sakila.Infrastructure -v
```

## Usar el contexto en la aplicación ASP.NET Core MVC

Para usar el contexto de la aplicación en el proyecto de ASP.NET Core requerimos hacer uso de la inyección de dependecias que viene integrado. Lo primero que tenemos que hacer es agregar el servicio. Lo priomero es agregar el servico en el metodo `ConfigureServices`

```csharp
public void ConfigureServices(IServiceCollection services)
{
  services.AddDbContext<SakilaContext>(options => options
                      .UseMySQL(Configuration.GetConnectionString("Sakila")));
  //...
  services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
}
```

El siguiente paso es especificar la dependencia en el controlador. Para este caso HomeController

```csharp
private readonly SakilaContext _context;
public HomeController(SakilaContext context)
{
  _context = context;
}
```

## Para llevar
