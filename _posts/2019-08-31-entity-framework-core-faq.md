---
layout: faq
title:  "Preguntas frecuentes Entity Framework Core"
categories: entityframeworkcore
permalink: /:categories/:title:output_ext
---

A continuación un serie de preguntas y respuestas que pueden servir como introducción para conocer este framework.

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h2 itemprop="name">¿Cómo ejecutar un procedimiento almacenado con Entity Framework Core?</h2>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">
            <p>Hay varias formas de ejecutar un procedimiento de almacenado con Entity Framework Core. La forma que es más adecuada depende del tipo de retorno del procedimiento almacenado. La siguiente lista muestra las formas más comunes</p>
            <ul>
                <li>Usando el método de extension <a href="https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.relationalqueryableextensions.fromsql?f1url=https%3A%2F%2Fmsdn.microsoft.com%2Fquery%2Fdev16.query%3FappId%3DDev16IDEF1%26l%3DEN-US%26k%3Dk(Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSql%60%601);k(SolutionItemsProject);k(TargetFrameworkMoniker-.NETFramework,Version%3Dv4.7.2);k(DevLang-csharp)%26rd%3Dtrue&view=efcore-2.1">FromSql</a></li>
                <li>Usando el método de extension <a href="https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.relationaldatabasefacadeextensions.executesqlcommand?f1url=https%3A%2F%2Fmsdn.microsoft.com%2Fquery%2Fdev16.query%3FappId%3DDev16IDEF1%26l%3DEN-US%26k%3Dk(Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.ExecuteSqlCommand);k(SolutionItemsProject);k(DevLang-csharp)%26rd%3Dtrue&view=efcore-2.1">ExecuteSqlCommand</a> de la propiedad Database o su versión asíncrona</li>
                <li>Usando los <a href="https://docs.microsoft.com/en-us/ef/core/modeling/query-types">tipos de consulta</a></li>
            </ul>
            <p>Para más detalles ver el ejemplo de código más abajo</p>
            <h1 id="usando-fromsql">Usando <code class="language-plaintext highlighter-rouge">FromSql</code></h1>

<div class="language-cs highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kt">var</span> <span class="n">entidades</span> <span class="p">=</span> <span class="n">_context</span><span class="p">.</span><span class="n">Entidad</span>
               <span class="p">.</span><span class="nf">AsNoTracking</span><span class="p">()</span>
               <span class="p">.</span><span class="nf">FromSql</span><span class="p">(</span><span class="s">$"exec dbo.ReadAllEntities"</span><span class="p">)</span>
               <span class="p">.</span><span class="nf">ToList</span><span class="p">();</span>
</code></pre></div></div>

<h1 id="usando-executesqlcommand">Usando <code class="language-plaintext highlighter-rouge">ExecuteSqlCommand</code></h1>

<div class="language-cs highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kt">var</span> <span class="n">afectados</span> <span class="p">=</span> <span class="n">context</span><span class="p">.</span><span class="n">Database</span>
                <span class="p">.</span><span class="nf">ExecuteSqlCommand</span><span class="p">(</span><span class="s">$"exec dbo.tuProcedimiento @Id=</span><span class="p">{</span><span class="n">id</span><span class="p">}</span><span class="s">"</span><span class="p">);</span>
</code></pre></div></div>

<h1 id="usado-los-tipos-de-consulta">Usado los tipos de consulta</h1>

<div class="language-cs highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
 <span class="k">public</span> <span class="k">partial</span> <span class="k">class</span> <span class="nc">MyContext</span> <span class="p">:</span> <span class="n">DbContext</span>
 <span class="p">{</span>
        <span class="k">public</span> <span class="nf">MyContext</span><span class="p">()</span>
        <span class="p">{</span>
        <span class="p">}</span>

        <span class="k">public</span> <span class="nf">MyContext</span><span class="p">(</span><span class="n">DbContextOptions</span><span class="p">&lt;</span><span class="n">MyContext</span><span class="p">&gt;</span> <span class="n">options</span><span class="p">)</span>
            <span class="p">:</span> <span class="k">base</span><span class="p">(</span><span class="n">options</span><span class="p">)</span>
        <span class="p">{</span>
        <span class="p">}</span>

        <span class="k">public</span> <span class="k">virtual</span> <span class="n">DbSet</span><span class="p">&lt;</span><span class="n">Empleado</span><span class="p">&gt;</span> <span class="n">Empleados</span> <span class="p">{</span> <span class="k">get</span><span class="p">;</span> <span class="k">set</span><span class="p">;</span> <span class="p">}</span>

        <span class="k">public</span> <span class="n">DbQuery</span><span class="p">&lt;</span><span class="n">InfoEmpleado</span><span class="p">&gt;</span> <span class="n">InfoEmpleado</span> <span class="p">{</span> <span class="k">get</span><span class="p">;</span> <span class="k">set</span><span class="p">;</span> <span class="p">}</span>


        <span class="k">protected</span> <span class="k">override</span> <span class="k">void</span> <span class="nf">OnModelCreating</span><span class="p">(</span><span class="n">ModelBuilder</span> <span class="n">modelBuilder</span><span class="p">)</span>
        <span class="p">{</span>
            <span class="n">modelBuilder</span><span class="p">.</span><span class="n">Query</span><span class="p">&lt;</span><span class="n">InfoEmpleado</span><span class="p">&gt;(</span><span class="n">entity</span> <span class="p">=&gt;</span>
            <span class="p">{</span>
                <span class="n">entity</span><span class="p">.</span><span class="nf">ToQuery</span><span class="p">(()</span> <span class="p">=&gt;</span> <span class="n">InfoEmpleado</span>
                    <span class="p">.</span><span class="nf">FromSql</span><span class="p">(</span><span class="s">"dbo.GetEmpleadoInfo"</span><span class="p">));</span>

                <span class="n">entity</span><span class="p">.</span><span class="nf">Property</span><span class="p">(</span><span class="n">e</span> <span class="p">=&gt;</span> <span class="n">e</span><span class="p">.</span><span class="n">Id</span><span class="p">).</span><span class="nf">HasColumnName</span><span class="p">(</span><span class="s">"empleado_id"</span><span class="p">);</span>
                <span class="c1">//...</span>
            <span class="p">});</span>
        <span class="p">}</span>
<span class="p">}</span>
</code></pre>
</div>
</div>
        </div>
    </div>
</div>


<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h2 itemprop="name">¿Con qué bases de datos puedo usar Entity Framework Core ?</h2>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">
            <p>Entity Framework Core tiene un modelo de <a href="https://docs.microsoft.com/ef/core/providers/">proveedores</a> lo que permite usarlo con multiples bases de datos. Solamente es necesario instalar el paquete de Nuget correspondiente y construir la <a href="/connectionstring/2019/02/27/cadenas-de-conexion-csharp.html">cadena de conexión</a>.
            </p>

            <p>A continuación una lista de ejemplos de algunas bases de datos con las que puedes usar Entity Framework Core y la dirección del paquete de Nuget
            </p>
<table>
  <thead>
    <tr>
      <th>Base de dato</th>
      <th>Paquete de Nuget</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>SqlServer</td>
      <td><a href="https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer">Microsoft.EntityFrameworkCore.SqlServe</a></td>
    </tr>
    <tr>
      <td>SQLite</td>
      <td><a href="https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Sqlite">Microsoft.EntityFrameworkCore.Sqlite</a></td>
    </tr>
    <tr>
      <td>Oracle</td>
      <td><a href="https://www.nuget.org/packages/Oracle.EntityFrameworkCore/">Oracle.EntityFrameworkCore</a></td>
    </tr>
    <tr>
      <td>MySql</td>
      <td><a href="https://www.nuget.org/packages/MySql.Data.EntityFrameworkCore">MySql.Data.EntityFrameworkCore</a></td>
    </tr>
    <tr>
      <td>PostgreSQL</td>
      <td><a href="https://www.nuget.org/packages/Npgsql.EntityFrameworkCore.PostgreSQL">Npgsql.EntityFrameworkCore.PostgreSQL</a></td>
    </tr>
  </tbody>
</table>
        </div>
    </div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h2 itemprop="name">¿Dónde esta el repositorio de Entity Framework Core?</h2>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">
            <p>El código fuente de Entity Framework Core esta alojado en <a href="https://github.com/aspnet/EntityFrameworkCore">Github</a>.Puedes clonar el código a tu computadora y explorar los detalles del código fuente.</p>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>git clone https://github.com/aspnet/EntityFrameworkCore.git 
</code></pre></div></div>

            <p>Adicionalmente se pueden ver los "issues" y realizar contribuciones al código.</p>
        </div>
    </div>
</div>


<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h2 itemprop="name">¿En qué proyectos puedo usar Entity Framework Core ?</h2>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">
            <p>Con cualquier tipo de proyecto de .NET Core y para cualquier tipo de proyecto .NET Framework que use la version 4.6.1 o superior.</p>
        </div>
    </div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">¿Con qué lenguajes de programación puedo usar Entity Framework Core?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">
            <p>Se puede utilizar con los lenguajes C#, Visual Basic y F#.</p>
        </div>
    </div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">¿Cuál es la relación entre los características de SQL y los de C#?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">
            <p></p>
            
<table>
  <thead>
    <tr>
      <th>SQL</th>
      <th>Programación orientada a objetos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Base de datos</td>
      <td>Clase que hereda de DbContext</td>
    </tr>
    <tr>
      <td>Tabla</td>
      <td>Clase DbSet<t></t></td>
    </tr>
    <tr>
      <td>Columnas</td>
      <td>Propiedades o campos</td>
    </tr>
    <tr>
      <td>Llaves primarias</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Llaves foráneas</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Restricciones</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Store Procedures</td>
      <td>Query Types</td>
    </tr>
    <tr>
      <td>Funciones</td>
      <td>&nbsp;</td>
    </tr>
  </tbody>
</table>

        </div>
    </div>
</div>


<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">¿Qué debería saber para usar Entity Framework Core ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">
            <p></p>
            <ul>
                <li>Métodos de extensión.</li>
                <li>Expresiones Lamda</li>
                <li>LINQ</li>
                <li>Atributos C#</li>
                <li>SQL Básico</li>
            </ul>
        </div>
    </div>
</div>


<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name"></h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">
            <p></p>
        </div>
    </div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">¿Cuáles son los principales componentes de Entity Framework Core?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">
            <p>Entity framework Core utiliza los siguientes espacios de nombres </p>

<div class="language-cs highlighter-rouge">
<div class="highlight">
<pre class="highlight">
<code>
<span class="n">Microsoft</span><span class="p">.</span><span class="n">EntityFrameworkCore</span>
<span class="n">System</span><span class="p">.</span><span class="n">ComponentModel</span><span class="p">.</span><span class="n">DataAnnotations</span><span class="p">.</span><span class="n">Schema</span>
<span class="n">System</span><span class="p">.</span><span class="n">ComponentModel</span><span class="p">.</span><span class="n">DataAnnotations</span>
</code>
</pre>
</div>
</div>

          <p>Las clases principales son <code class="language-plaintext highlighter-rouge">DbContext</code> y <code class="language-plaintext highlighter-rouge">DbSet</code>
          </p>
        </div>
    </div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">¿Cuáles son las versiones de Entity Framework Core ? </h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">
            <p>La ultima version de Entity Framework Core al momento de actualizar este artículo es la 3.1. Cada liberación de una nueva versión de EF Core va acompañada de un post donde mencionan las nuevas características de la misma. Actualmente ya esta anunciada la próxima liberación de Entity Framework 3.0 para septiembre de 2019 dentro del evento virtual de 3 días <a href="https://www.dotnetconf.net/">.NET Conf 2019</a> y para 2020 estará disponible <a href="https://devblogs.microsoft.com/dotnet/introducing-net-5/">.NET 5.0</a></p>

<table>
  <thead>
    <tr>
      <th>Versión</th>
      <th>Fecha de lanzamiento</th>
      <th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>3.1</td>
      <td>03 diciembre  2019</td>
      <td><a href="https://devblogs.microsoft.com/dotnet/announcing-entity-framework-core-3-1-and-entity-framework-6-4/">Announcing Entity Framework Core 3.1 and Entity Framework 6.4</a></td>
    </tr>
    <tr>
      <td>3.0</td>
      <td>23 septiembre 2019</td>
      <td><a href="https://devblogs.microsoft.com/dotnet/announcing-ef-core-3-0-and-ef-6-3-general-availability/">Announcing Entity Framework Core 3.0 and Entity Framework 6.3 General Availability</a></td>
    </tr>
    <tr>
      <td>2.2</td>
      <td>04 Diciembre 2018</td>
      <td><a href="https://devblogs.microsoft.com/dotnet/announcing-entity-framework-core-2-2/">Announcing Entity Framework Core 2.2</a></td>
    </tr>
    <tr>
      <td>2.1</td>
      <td>30 Mayo 2018</td>
      <td><a href="https://blogs.msdn.microsoft.com/dotnet/2018/05/30/announcing-entity-framework-core-2-1/">Announcing Entity Framework Core 2.1</a></td>
    </tr>
    <tr>
      <td>2.0</td>
      <td>14 Agosto 2017</td>
      <td><a href="https://blogs.msdn.microsoft.com/dotnet/2017/08/14/announcing-entity-framework-core-2-0/">Announcing Entity Framework Core 2.0</a></td>
    </tr>
    <tr>
      <td>1.1</td>
      <td>16 Noviembre 2016</td>
      <td><a href="https://blogs.msdn.microsoft.com/dotnet/2016/11/16/announcing-entity-framework-core-1-1/">Announcing Entity Framework Core 1.1</a></td>
    </tr>
    <tr>
      <td>1.0</td>
      <td>27 Junio 2016</td>
      <td><a href="https://blogs.msdn.microsoft.com/dotnet/2016/06/27/entity-framework-core-1-0-0-available/">Announcing Entity Framework Core 1.0</a></td>
    </tr>
  </tbody>
</table>

        </div>
    </div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">¿Cómo se instala Entity Framework Core ?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">

<p>Se instala mediante paquetes de NuGet lo que lo hacen muy ligero. Y lo puedes hacer mediante la línea de comandos, la interfaz gráfica del gestor de paquetes de Visual Studio o mediante Power Shell.</p>

<p>Utiliza un modelo llamado Code Firts en donde se escriben las clases del dominio y a partir de ellas se crea la base de datos.También es posible crear un modelo a partir de una base de datos existente.</p>

<p>Cuenta con una interfaz de linea de comandos  <code class="language-plaintext highlighter-rouge">dotnet ef</code> que permite :<p>

<ol>
<li>Crear y modificar la base de datos</li>
<li>Generar clases a partir de una base de datos existentes.</li>
<li>Gestionar los cambios a la base de datos.</li>
</ol>

<img data-src="/img/efcoretools.webp" class="lazyload"  alt="Imagen de linea de comando Entity Framework Core">
        </div>
    </div>
</div>
