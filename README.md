# i18n Jekyll Template

i18n Jekyll serves both as starting point for building a multilanguage website in vanilla Jekyll, and as instructional demo for my approach.

This template is using npm and gulp.js to compile sass, js, jekyll build to make the pcompile process faster than using ruby. [demo](https://thesmallaxe.github.io/i18-static-template/).

## The approach

1. Install [node.js](https://nodejs.org/en/download/)
2. Then through the CMD or Terminal navigate to the root folder of the project
3. Then type sudo npm install in mac and npm install in windows and then press enter. It will install all the dependencies needed.
4. After that run gulp watch to run the site.

With Jekyll, the file system structure is the website structure. We deal with multilanguage content by mirroring our site's structure in language-dedicated directories. Our default language will be at the root level, and every other language we want to support will have its own directory. Here's how a basic structure might look:

```
---------------------------------
   FILE SYSTEM  |  URL STRUCTURE
---------------------------------
 index.md       |   /            
 fr/            |                
 ├── index.md   |   /fr          
 ar/            |                
 ├── index.md   |   /ar          
```

**Note**: *`permalink: pretty` needs to be set in `_config.yml` for the URL structure to be generated as above.*

Once we have our starting structure set up, we need to set some metadata in every page using the YAML frontmatter. Besides the usual variables like `layout` and `title`, we need to set a `language` in every page and a `handle` in every page other than index pages:

```yaml
---
# In /index.md:
layout: default
title: Home
language: en
handle: / # same as in /fr/ and /ar/
---
```

The reason for these two extra variables will become clear in a moment. Now let's deal with the content.

### Site-wide content
We put content that needs to present across the whole website (like the one you typically find in header and footer) in our `_config.yml` file. Dealing with strings in different languages is possible with a hash:

```yml
# In _config.yml
description: 
  en: Multilanguage Jekyll Websites
  fr: Sites Web multilingues Jekyll
  ar: متعدد اللغات مواقع Jekyll
```

We then use Liquid's bracket notation in the layout file to access the values in our hash. The `language` variable in the current page's frontmatter ensures that we grab the correct string from `_config.yml`:

```liquid
<!-- Data from _config.yml get stored in the `site` global variable -->
<meta name="description" content="{{ site.description[page.language] }}">
```

### Page-specific content
With the structure described above is simple to add copy to every page, just write it in markdown in every file after the frontmatter, and use the special variable `{{ content }}` to grab it from the layout file.

You often need something more flexible for your average website though. You probably have boxes, buttons, forms and other UI elements, or images with `alt` texts that also need translation. You can deal with this by expanding the frontmatter in the single page files with the variables you need:

```yaml
# In /index.md
title: Home
# In /fr/index.md
title: Accueil
# In /ar/index.md
title: الصفحة الرئيسية
tweet-this: Twitta
```

Thanks to this method, we can keep our layout file nice and tidy:

```liquid
<!-- Data from page files get stored in the `page` global variable -->
<a class="button" href="#">{{ page.see-on-github }}</a>
<a class="button" href="#">{{ page.tweet-this }}</a>
```

The system described above is incredibly flexible and will cover most of the use cases.

### Section-specific content
As we have created this as a single page template using sections. All the sections we have included inside a folder call `partials` inside `_includes` folder.

Each liquid file is a section.

```
----------------------------------------------
 LIQUID FILE [SECTIONS] |     FOLDER PATH
----------------------------------------------
 hero.liquid            |         
 intro.liquid           |                
 about.liquid           |  _includes/partials
 analysis.liquid        |                     
```

Above all the liquid files will be called in the index.md file as shown below.

```
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
```

For all these liquid files, the content will be called through YML files inside `_data` folder. As we created liquid file for each section, we have created YML files for content for each section.

```
----------------------------------------------
 YML CONTENT [SECTIONS]  |    FOLDER PATH
----------------------------------------------
 section_hero.yml        |         
 section_intro.liquid    |                
 section_about.liquid    |       _data/
 section_analysis.liquid |                     
```

### Navigation
Dealing with a navigation menu is a simple matter. But, since our website has every page mirrored for every language, we need to add a conditional in the for loop to make sure that only the pages in the page's current language get picked up, otherwise Jekyll will happily include every page in our project without regard to the language.

```liquid
<nav>
  {% for p in site.pages %}
    {% if p.language == page.language %} 
      <a href="{{ p.url | prepend: site.baseurl }}">
        {{ p.title }}
      </a>
    {% endif %}
  {% endfor %}
</nav>
```

### Language switch
The language switch is slightly trickier to implement. Let's get the easy part out of the way first. Here's how we deal with switching language from an index page (i.e. a homepage):

```liquid
<nav class="language-switcher">
  {% if page.name contains "index" %}
    <a href="{{ site.baseurl }}/">EN</a>
    <a href="{{ site.baseurl | append: "/fr" }}">FR</a>
    <a href="{{ site.baseurl | append: "/ar" }}">AR</a>
  {% endif %}
</nav>
```

Since index pages sit at the first level of their directories, we just need to append the language to the base url. But what if we want to switch language while being on another page? That's where our `handle` variable in the frontmatter comes into play:

```liquid
<nav class="language-switcher">
  {% if page.name contains "index" %}
    <a class="en" href="{{ site.baseurl }}/">EN</a>
    <a class="fr" href="{{ site.baseurl | append: "/fr" }}">FR</a>
    <a class="ar" href="{{ site.baseurl | append: "/ar" }}">AR</a>
  {% else %}
    <a class="en" href="{{ site.baseurl | append: page.handle }}">EN</a>
    <a class="fr" href="{{ site.baseurl | append: "/fr" | append: page.handle }}">FR</a>
    <a class="ar" href="{{ site.baseurl | append: "/ar" | append: page.handle }}">AR</a>
  {% endif %}
</nav>
```

On every page other than index pages, every switch link gets the language *and* the page handle appended. If we're on the page with the `/about` handle, the generated HTML will look like so:

```html
<a href="/about">EN</a>
<a href="/de/about">DE</a>
<a href="/it/about">IT</a>
```

**Note**: *In navigation and language switch, you only need the `prepend: site.baseurl` bit if your site that doesn’t sit at the root of the domain. See [this](https://byparker.com/blog/2014/clearing-up-confusion-around-baseurl/) to learn why.*

---

This wraps up our brief excursus of Polyglot Jekyll. Make sure to clone this repo and experiment with it locally to get a hang of how everything works together. If you want to check out the final result, have a look at the [online demo](http://mrzool.cc/polyglot-jekyll/).

The approach should be solid enough and easily extensible to more complex websites. The next time you need to build a multilingual website, give it a shot. You might find that you don't need PHP, CMS's and databases to deal with it after all.

## Resources

- Still new to Jekyll? The [official docs](https://jekyllrb.com/docs/home/) are the best place to start.
- When you feel a bit more comfortable, this [cheat sheet](http://jekyll.tips/jekyll-cheat-sheet/) put together by [CloudCannon](http://cloudcannon.com/) is the go-to reference for all things Jekyll.
- YAML is a flexible and powerful syntax to structure your data. Here's the [best overview](https://learnxinyminutes.com/docs/yaml/) available.
- To go in-depth into the Liquid templating engine, check out Shopify's [official reference](https://help.shopify.com/themes/liquid) or these [docs](https://shopify.github.io/liquid/).
