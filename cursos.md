---
layout: defaultbs
title : cursos
description:  Cursos
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
            {% assign cursos_posts = site.posts | where_exp: "post", "post.tags contains 'curso'" %}
            {%- if cursos_posts.size > 0 -%}
             {% for post in cursos_posts %}
            <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div class="course-item">
                    <img src="{{ post.image.path | escape}}" loading="lazy" class="img-fluid"
                        alt="{{ post.image.path | escape}}">
                    <div class="course-content">
                        <h3><a title="{{ post.title | escape}}"
                                href="{{ post.url | relative_url }}">{{ post.title | strip_html | strip_newlines | truncate: 30 }}</a>
                        </h3>
                        <p>{{ post.excerpt | strip_html | strip_newlines | truncate: 150 }} </p>
                    </div>
                </div>
            </div>
            {%- endfor -%}
        </div>
        {%- endif -%}
    </div>
</section>