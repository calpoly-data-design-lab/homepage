---
layout: default
title: Home
description: Homepage for the Data Design Lab.
---
<section class="hero" aria-labelledby="hero-title">
<div class="motif-field"><canvas class="motif" data-motif-role="hero" aria-hidden="true"></canvas></div>
<div class="hero-body wrap">
<p class="label aside meta">{{ site.data.site_settings.institution }}</p>
{%- assign name_words = site.data.site_settings.lab_name | split: ' ' %}
<div><h1 id="hero-title" class="display">{{ name_words[0] }}<br />{{ site.data.site_settings.lab_name | remove_first: name_words[0] | strip }}</h1></div>
<p class="button-row lead-col hero-actions"><a class="button primary" href="{{ '/projects/' | relative_url }}">Explore projects</a> <a class="button secondary" href="{{ '/join/' | relative_url }}">Join the lab</a></p>
</div>
</section>
<main id="main">
{% capture meeting -%}
<div class="meeting"><h3 class="meeting-when">Fridays, 12–1 PM</h3><p class="meta"><strong>Location:</strong> Building 14, Room 238B</p><p class="button-row"><a class="button primary" href="https://calpoly.zoom.us/j/84484101305">Join on Zoom</a></p></div>
{%- endcapture %}
{% include section.html id="meeting" title="Regular lab meetings" eyebrow="Weekly meeting" body=meeting raw=true %}
{% capture ongoing -%}
{% include project-list.html projects=site.data.projects.ongoing hide_summary=true %}
{%- endcapture %}
{% include section.html id="ongoing-projects" title="Ongoing projects" body=ongoing raw=true %}
{% capture people -%}
<div class="group"><h3 class="label">Faculty</h3>{% include people-list.html people=site.data.people.faculty %}</div><div class="group"><h3 class="label">Students</h3>{% include people-list.html people=site.data.people.students %}</div>
{%- endcapture %}
{% include section.html id="affiliated-people" title="Affiliated people" body=people raw=true %}
</main>
