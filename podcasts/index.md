---
layout: default
title: Podcasts
bodyClass: podcasts
---

<section class="gallery-page">

  <div class="gallery-header">
    <h1>Podcasts</h1>
    <p class="gallery-tagline">
      Conversations, reflections, and stories exploring creativity and resilience.
    </p>
  </div>

  <div class="magic-gallery-grid">

    {% for audio in site.static_files %}
      {% if audio.path contains '/assets/podcasts/' %}
        <div class="magic-gallery-tile">
          <audio controls preload="metadata">
            <source src="{{ audio.path | relative_url }}" type="audio/mpeg">
          </audio>
        </div>
      {% endif %}
    {% endfor %}

  </div>

</section>
