---
layout: defaultbs
title: Tienda
description: Encuentra los mejores artículos para programadores. 
---

<div class="breadcrumbs">
    <div class="container">
        <h2>{{ page.title }}</h2>
        <p>{{page.description}} </p>
    </div>
</div>

<section id="courses" class="courses">
    <div class="container">
        <div class="row">
            {%- for libro in site.data.libros -%}
            <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div class="course-item">
                    <img src="{{ libro.imagen | escape}}" loading="lazy" class="img-fluid" alt="{{ libro.descripcion | escape}}">
                    <div class="course-content">
                        <h3><a title="{{ libro.nombre | escape}}" target="_blank" href="{{ libro.link | relative_url }}">{{ libro.nombre | strip_html | strip_newlines | truncate: 30 }}</a>
                        </h3>
                        <p>{{ libro.descripcion | strip_html | strip_newlines | truncate: 150 }}</p>
                        <div class="trainer d-flex justify-content-between align-items-center">
                            <div class="trainer-profile d-flex align-items-center">  
                                <a href="{{ libro.link }}">{{ libro.nombre | escape }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {%- endfor -%}
        </div>
    </div>
</section>
