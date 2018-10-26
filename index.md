---
layout: default
title: Home
language: en
nav-order: 1
see-on-github: See on GitHub
---

<!-- Section Hero  -->
{% include partials/hero.liquid
  background_image=site.data.section_landing.hero.image
  video_webm=site.data.section_landing.hero.video_webm
  video_mp4=site.data.section_landing.hero.video_mp4
  background_image=false
%}

<!-- Section About  -->
{% include partials/about.liquid %}

<!-- Section Intro  -->
{% include partials/intro.liquid %}

<!-- Section Analysis  -->
{% include partials/analysis.liquid %}