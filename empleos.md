---
layout: default
title: Empleos
description: Encuentra los mejores empleos para programadores .NET. 
---

{% for empleo in site.empleos %}
    <a href="{{ empleo.url | prepend: site.baseurl }}">
    <h2>{{ empleo.titulo }}</h2>
    </a>
{% endfor %}