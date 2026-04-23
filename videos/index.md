---
layout: default
title: Videos
bodyClass: videos
---

<section class="gallery-page">

  <div class="gallery-header">
    <h1>Videos</h1>
    <p class="gallery-tagline">
      Visual storytelling, motion, and creative exploration through video.
    </p>
  </div>

  <div class="magic-gallery-grid">

    {% for video in site.static_files %}
      {% if video.path contains '/assets/videos/' %}
        <div class="magic-gallery-tile">
          <video controls preload="metadata">
            <source src="{{ video.path | relative_url }}" type="video/mp4">
          </video>
        </div>
      {% endif %}
    {% endfor %}

  </div>

</section>
