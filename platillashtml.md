---
title: Plantillas
layout: plantillas
---

<section id="breadcrumbs" class="breadcrumbs">
  <div class="container">
    <ol>
      <li><a href="{{ "/" | absolute_url }}">{{ site.title | escape }}</a></li>
      <li>{{ page.title | escape }}</li>
    </ol>
    <h2>{{ page.title | escape }}</h2>
  </div>
</section>

<!-- ======= Portfolio Section ======= -->
<section id="portfolio" class="portfolio">
  <div class="container">

    <div class="row">
      <div class="col-lg-12 d-flex justify-content-center">
        <ul id="portfolio-flters">
          <li data-filter="*" class="filter-active">Todos</li>
          {% for categoria in site.data.categorias %}

          <li data-filter=".filter-{{ categoria.nombre }}">{{ categoria.descripcion }}</li>

          {% endfor %}
        </ul>
      </div>
    </div>

    <div class="row portfolio-container">
      {% for plantilla in site.plantillas %}
      <div class="col-lg-4 col-md-6 portfolio-item filter-admin">
        <div class="portfolio-wrap">
          <img src="{{ plantilla.imagenes | first }}" class="img-fluid" alt="" >
          <div class="portfolio-info">
            <h4> {{ plantilla.title }}</h4>
            <p> {{ plantilla.descripcion }}</p>
            <div class="portfolio-links">
              <a href="{{ plantilla.imagen }}" title="{{ plantilla.title }}" data-gall="portfolioGallery" class="venobox"><i
                  class="bx bx-plus"></i></a>
              <a href="{{ plantilla.url }}" title="Detalles"><i class="bx bx-link"></i></a>
            </div>
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section><!-- End Portfolio Section -->

