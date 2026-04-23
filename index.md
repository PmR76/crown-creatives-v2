<!-- ============================
     HERO SECTION (CROWN + GALLERY)
     ============================ -->
<section class="home-hero">

  <!-- HERO CROWN (day/night swap) -->
  <div class="hero-crown-wrapper">

    <!-- DAY CROWN -->
    <img src="{{ '/assets/icons/day-crown.svg' | relative_url }}"
         class="home-crown day"
         alt="Day Crown">

    <!-- NIGHT CROWN -->
    <img src="{{ '/assets/icons/night-crown.svg' | relative_url }}"
         class="home-crown night"
         alt="Night Crown">

  </div>

  <!-- HERO GALLERY LANES -->
  <div class="hero-gallery">

    <!-- LEFT LANE -->
    <div class="gallery-left">
      <img src="{{ '/assets/images/gallery/img1.jpg' | relative_url }}" class="lane-img">
      <img src="{{ '/assets/images/gallery/img2.jpg' | relative_url }}" class="lane-img">
      <img src="{{ '/assets/images/gallery/img3.jpg' | relative_url }}" class="lane-img">
    </div>

    <!-- RIGHT LANE -->
    <div class="gallery-right">
      <img src="{{ '/assets/images/gallery/img4.jpg' | relative_url }}" class="lane-img">
      <img src="{{ '/assets/images/gallery/img5.jpg' | relative_url }}" class="lane-img">
      <img src="{{ '/assets/images/gallery/img6.jpg' | relative_url }}" class="lane-img">
    </div>

  </div>

</section>
