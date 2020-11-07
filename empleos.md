---
layout: defaultbs
title: Empleos
description: Encuentra los mejores empleos para programadores .NET. 
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
        {%- for empleo in site.empleos -%}
        <p>{{ empleo.content | markdownify }}</p>
        {%- endfor -%}
        </div>
    </div>
</section>