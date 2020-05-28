---
layout: post
title:  "Exportar datos a Excel ASP.NET Core"
date:   2020-03-06 12:00:01 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/og-exportar.webp
  height: 579
  width: 1106
description: Tutorial para exportar una colección de objetos a un libro de Excel en una aplicación ASP.NET Core y Entity Framework Core. Se usa la librería EPPlus"
---

En este articulo intentamos mostrar una opción para generar archivos de Excel en nuestras aplicaciones de ASP.NET Core. Esta funcionalidad es constantemente requerida en las empresas y una pregunta frecuente en grupos de programadores.

Para generar el archivo usamos el paquete de Nuget llamado [EPPlus](https://www.nuget.org/packages/EPPlus)

```
dotnet add package EPPlus --version 4.5.3.3
```

> **Advertencia** asegurate de asegurate de revisar los cambios en la [licencia](https://www.epplussoftware.com/Home/LgplToPolyform) de EPPlus. Considera en que casos puedes usarla y evaluá si te conviene pagar por una licencia de uso comercial para en su lugar usar la version 5.

## Qué es EPPlus

EPPlus se vende a si mismo como una librería capaz de crear avanzadas hojas de Excel sin la dependencia de Interop y ninguna otra dependencia adicional a .NET. Funciona con .NET Core y .NET Framework. Fue creada por [Jan Källman](https://github.com/JanKallman) como un proyecto de código abierto con licencia *GNU Library General Public License (LGPL)* pero esta próximo a cambiar por una licencia [PolyForm Noncommercial License 1.0.0] con la creación de la compañia [EPPlus Software](https://www.epplussoftware.com/).

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

Aquí mostramos unicamente las creación de un libro con una hoja con el fin de iniciar en el manejo y probablemente retornemos para agregar mas características conforme conozca más de esta librería.

## Exportar a Excel ASP.NET Core

Para este proyecto usamos la plantilla MVC con autenticación de cuentas individuales esto para tener Entity Framework instalados y funcionando. Usamos el asistente de creación de controladores que usan Entity Framework para las operaciones CRUD

<img src="/img/agregar-controlador-mvc.webp" loading="lazy" alt="Agregar controlador MVC Visual Studio 2019">

El modelo que creamos corresponde a un _Producto_. Esta clase que usa las anotaciones de datos para especificar restricciones al crear la tabla en la base de datos como la longitud de los campos, el nombre de la tabla y el esquema entre otras cosas. Adicionalmente porque lei que estas eran usadas cuando exportabas una colección a Excel pero por ahora no he logrado que funcionen. Abajo los detalles de la clase producto:

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

Para evitar la necesidad de crear objetos uso el método `HasData` en el contexto de Entity Framework Core para tener datos de prueba.

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

<img src="/img/lista-excel.webp" loading="lazy" alt="Pantalla de una lista en ASP.NET Core">

El método de acción en cuestión es el responsable de obtener los datos de EF y crear el libro de Excel mediante las clases `ExcelPackage`, crear una hoja y los datos en la misma, asignarle formato al documento y finalmente regresar el archivo mediante el método `File` que regresa un `FileContentResult`. La parte del formato todavía no la conozco bien por lo que por ahora lo dejare aquí.

Este método requiere las instrucciones `using using OfficeOpenXml;` y `using OfficeOpenXml.Table;`

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

<img src="/img/libro-excel.webp" loading="lazy" alt="Libro del reporte en Excel con en ASP.NET Core">

### Crear un libro de Excel con C#

Para crear un libro de Excel se usa la clase `ExcelPackage` que implementa la interfaz `IDisposable` por lo que puede usarse con las declaraciones using de C# 8.0. Esta clase tiene varias propiedades que permiten especificar las propiedades del libro controlar las opciones globales del libro de Excel como el cifrado, la compatibilidad y el libro de trabajo. Principalmente nos enfocaremos en la propiedad `WorkBook` para especificar los metadatos del archivo como autor, palabras clave y compañia. Estas propiedades las ves dando clic derecho sobre el archivo y seleccionar _Propiedades_. Seria utili para matener la marca.

```cs
using var libro = new ExcelPackage();
libro.Workbook.Properties.Author = "Benjamín Camacho";
libro.Workbook.Properties.Company = "aspnetcoremaster.com";
libro.Workbook.Properties.Keywords = "Excel,Epplus";
```

<img src="/img/propiedades-excel.webp" loading="lazy" alt="Ventana de propiedades del acrhivo de Excel">

### Crear hojas de Excel con C#

Para agregar hojas de Excel a un libro se usa el método `Add` de la propipedad `Worksheets` que requiere especificar el nombre de la hoja y regresa un objeto del tipo `ExcelWorksheet`. El método Add tambien tiene una sobrecarga que permite copiar una hoja de Excel.

```cs
 ExcelWorksheet hoja = libro.Workbook.Worksheets.Add("MiHoja de Excel");
//Para copiar una Hoja
 ExcelWorksheet copiaHoja = libro.Workbook.Worksheets.Add("copia",hoja);
```

<img src="/img/excel-hojas.webp" loading="lazy" alt="Hoja de Excel con en ASP.NET Core">

### Agregar datos a una hoja de Excel con C#

Para agregar datos a la hoja de Excel necesitas tener una referencia a la celda deseada asignar el valor. Tambien puedes especificar el formato.

```cs

hoja.Cells["A1"].Value = "Valor asignado desde C#";
hoja.Cells["A1"].Style.Font.Color.SetColor(Color.Red);
hoja.Cells["A1"].Style.Font.Name = "Calibri";
hoja.Cells["A1"].Style.Font.Size = 40;

hoja.Cells["B1"].Value = "2020/03/07";
hoja.Cells["B1"].Style.Numberformat.Format = "dd/mm/aaaa";
```

<img src="/img/excel-valores.webp" loading="lazy" alt="Hoja de Excel con en ASP.NET Core">

## Conclusiones

Este es el comienzo para generar libros de Excel en nuestras aplicaciones de ASP.NET Core. La librería EPPlus cuenta con una gran cantidad de opciones que pueden dar para muchos artículos te invito a que me dejes un comentario sobre que función te gustaría conocer de EPPlus.

Tratare de actualizar frecuentemente este articulo asi que vuelve pronto.
