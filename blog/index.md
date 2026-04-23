---
layout: default
title: Blog
bodyClass: blog
---

<section class="gallery-page">

  <div class="gallery-header">
    <h1>Blog</h1>
    <p class="gallery-tagline">
      Thoughts, updates, creative notes, and behind‑the‑scenes reflections.
    </p>
  </div>

  <div class="blog-list">

    {% for post in site.posts %}
      <article class="blog-card">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="blog-date">{{ post.date | date: "%B %d, %Y" }}</p>
        <p>{{ post.excerpt }}</p>
      </article>
    {% endfor %}

  </div>

</section>
