---
layout: post
title:  "Exportar datos a Excel ASP.NET Core"
date:   2020-03-06 12:00:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/og-exportar.jpg
  height: 579
  width: 1106
description: Tutorial para exportar una colección de objetos a un libro de Excel en una aplicación ASP.NET Core y Entity Framework Core. Se usa la librería EPPlus"
---

En este articulo intentamos mostrar una opción para generar archivos de Excel en nuestras aplicaciones de ASP.NET Core. Esta funcionalidad es constantemente requerida en las empresas y una pregunta frecuente en grupos de programadores.

Para generar el archivo usamos una el paquete de Nuget llamada [EPPlus](https://www.nuget.org/packages/EPPlus)

```
dotnet add package EPPlus --version 4.5.3.3
```

> **Advertencia** asegurate de asegurate de revisar los cambios en la licencia [licencia](https://github.com/JanKallman/EPPlus#epplus) de EPPlus.

## EPPlus

EPPlus se vende a si mismo como una librería capaz de crear avanzadas hojas de Excel sin la dependencia de Interop  y ninguna otra dependencia adicional a .NET. Funciona con .NET Core y .NET Framework. Fue creada por [Jan Källman](https://github.com/JanKallman) como un proyecto de código abierto con licencia *GNU Library General Public License (LGPL)* pero esta próximo a cambiar por una licencia [PolyForm Noncommercial License 1.0.0] con la creación de la compañia [EPPlus Software](https://www.epplussoftware.com/).

Algunas de las características de Excel soportadas por EPPlus son

* Rangos de celdas
* Estilos para celdas
* Validación de datos
* Formato condicional
* Gráficas
* Imágenes
* Comentarios
* Tablas
* Tablas dinámicas
* Entre otras

Aquí mostramos unicamente las creación de un libro con una hoja  con el fin de inicia y probablemente retornemos para agregar mas características conforme conozca mas de esta librería.

## Exportar a Excel ASP.NET Core

Para este proyecto usamos la plantilla MVC con autenticación de cuentas individuales esto para tener Entity Framework instalados y funcionando. Usamos el asistente de creación de controladores que usan Entity Framework para las operaciones CRUD

<img data-src="/img/agregar-controlador-mvc.PNG" class="lazyload"  alt="Agregar controlador MVC Visual Studio 2019">

El modelo que creamos corresponde a un Producto. Esta clase que usa las anotaciones de datos para especificar restricciones al crear la base de datos como la longitud de los campos, el nombre de la tabla, el esquema entre otras cosas. Adicionalmente porque lei que estas eran usadas cuando exportabas una colección a Excel pero por ahora no he logrado que funcionen. Abajo los detalles de la clase producto:

```cs
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExportarExcel.Models
{
    [Table("Productos", Schema = "ventas")]
    public class Producto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Producto")]
      
        [StringLength(100)]
        public string Nombre { get; set; }

        [Display(Name = "Disponible")]
        public bool? Descontinuado { get; set; }

        [Display(Name = "Fecha Recepción")]
        [StringLength(100)]
        public DateTime FechaDaLanzamiento { get; set; }

        [Display(Name = "Fecha")]
        public decimal Precio { get; set; }
    }
}
```

Para evitar la necesitad de crear objetos uso el método `HasData` en el contexto de EF Core para tener datos de prueba.

```cs
using ExportarExcel.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace ExportarExcel.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Producto>(producto => producto.
            HasData(

               new Producto { Id = 1, Nombre = "Dark Side of The Moon", Descontinuado = false, FechaDaLanzamiento = DateTime.Now, Precio = 99.9m },
               new Producto { Id = 2, Nombre = "Desire", Descontinuado = true, FechaDaLanzamiento = new DateTime(2010, 1, 31), Precio = 69.9m },
               new Producto { Id = 3, Nombre = "Próxima estación esperanza", Descontinuado = false, FechaDaLanzamiento = DateTime.Now, Precio = 19.9m },
               new Producto { Id = 4, Nombre = "OK Computer", Descontinuado = false, FechaDaLanzamiento = new DateTime(2018, 6, 3), Precio = 79.9m },
               new Producto { Id = 5, Nombre = "Amnesiac", Descontinuado = false, FechaDaLanzamiento = new DateTime(2011, 7, 5), Precio = 89.9m },
               new Producto { Id = 6, Nombre = "Merlina", Descontinuado = true, FechaDaLanzamiento = new DateTime(2015, 5, 4), Precio = 99.9m }
               )

            );

            base.OnModelCreating(builder);
        }
        public DbSet<Producto> Productos { get; set; }
    }
}
```

Abajo mostramos la pagina de la lista de productos creada por el asistente de Visual Studio. Adicionalmente agregamos un enlace con la descripción _Exportar a Excel_ que invoca al método `ExportarExcel` del controlador Productos.

```html
<a asp-action="ExportarExcel">Exporta a Excel</a>
```

<img data-src="/img/lista-excel.PNG" class="lazyload"  alt="Pantalla de una lista en ASP.NET Core">

El método de acción en cuestión es el responsable de obtener los datos de EF y crear el libro de Excel mediante las clases `ExcelPackage`, crear una hoja y los datos en la misma, asignarle formato al documento y finalmente regresar el archivo mediante el método `File` que regresa un  `FileContetResult`. La parte del formato todavía no la conozco bien por lo que por ahora lo dejare aquí.

```cs
public IActionResult ExportarExcel()
{
    string excelContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    var productos = _context.Productos.AsNoTracking().ToList();
    using (var libro = new ExcelPackage())
    {
        var worksheet = libro.Workbook.Worksheets.Add("Productos");
        worksheet.Cells["A1"].LoadFromCollection(productos, PrintHeaders: true);
        for (var col = 1; col < productos.Count + 1; col++)
        {
            worksheet.Column(col).AutoFit();
        }

        // Agregar formato de tabla
        var tabla = worksheet.Tables.Add(new ExcelAddressBase(fromRow: 1, fromCol: 1, toRow: productos.Count + 1, toColumn: 5), "Productos");
        tabla.ShowHeader = true;
        tabla.TableStyle = TableStyles.Light6;
        tabla.ShowTotal = true;

        return File(libro.GetAsByteArray(), excelContentType, "Productos.xlsx");
    }
}
```

> El repositorio de EPPlus cuenta con más ejemplos que te pueden servir para ver como hacen determinadas acciones como agregar formato de fechas, monedas, dar formato a celdas, agregar gráficas y mucho más. Dale un vistazo seguro aprendes algo nuevo.

El libro de Excel generado es el siguiente:

<img data-src="/img/libro-excel.PNG" class="lazyload"  alt="Libro del reporte en Excel con en ASP.NET Core">

## Conclusiones

Este es el comienzo para generar libros de Excel en nuestras aplicaciones de ASP.NET Core. La librería EPPlus cuenta con una gran cantidad de opciones que pueden dar para muchos artículos te invito a que me dejes un comentario sobre que función te gustaría conocer de EPPlus.

Tratare de actualizar frecuentemente este articulo asi que vuelve pronto.