---
layout: faq
title:  "Preguntas frecuentes Entity Framework Core"
categories: entityframeworkcore
permalink: /:categories/:title:output_ext
---

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">¿Como ejecutar un procedimiento almacenado con Entity Framework Core?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">
            <p>Hay varias formas de ejecutar un procedimiento de almacenado con Entity Framework Core. La forma que es mas adecuada depende del tipo de retorno del procedimiento almacenado. La siguiente lista muestra las formas más comunes</p>
            <ul>
                <li>Usando el método de extension <a href="https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.relationalqueryableextensions.fromsql?f1url=https%3A%2F%2Fmsdn.microsoft.com%2Fquery%2Fdev16.query%3FappId%3DDev16IDEF1%26l%3DEN-US%26k%3Dk(Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSql%60%601);k(SolutionItemsProject);k(TargetFrameworkMoniker-.NETFramework,Version%3Dv4.7.2);k(DevLang-csharp)%26rd%3Dtrue&view=efcore-2.1">FromSql</a></li>
                <li>Usando el método de extension <a href="https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.relationaldatabasefacadeextensions.executesqlcommand?f1url=https%3A%2F%2Fmsdn.microsoft.com%2Fquery%2Fdev16.query%3FappId%3DDev16IDEF1%26l%3DEN-US%26k%3Dk(Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.ExecuteSqlCommand);k(SolutionItemsProject);k(DevLang-csharp)%26rd%3Dtrue&view=efcore-2.1">ExecuteSqlCommand</a> de la propiedad Database o su versión asíncrona</li>
                <li>Usando los <a href="https://docs.microsoft.com/en-us/ef/core/modeling/query-types">tipos de consulta</a></li>
            </ul>
            <p>Para más detalles ver el ejemplo de código más abajo</p>
        </div>
    </div>
</div>

# Usando `FromSql`

```cs
var entidades = _context.Entidad
               .AsNoTracking()
               .FromSql($"exec dbo.ReadAllEntities")
               .ToList();
```

# Usando `ExecuteSqlCommand`

```cs
var afectados = context.Database
                .ExecuteSqlCommand($"exec dbo.tuProcedimiento @Id={id}");
```

# Usado los tipos de consulta

```cs

 public partial class MyContext : DbContext
 {
        public MyContext()
        {
        }

        public MyContext(DbContextOptions<MyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Empleado> Empleados { get; set; }

        public DbQuery<InfoEmpleado> InfoEmpleado { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Query<InfoEmpleado>(entity =>
            {
                entity.ToQuery(() => InfoEmpleado
                    .FromSql("dbo.GetEmpleadoInfo"));

                entity.Property(e => e.Id).HasColumnName("empleado_id");
                //...
            });
        }
}
```
