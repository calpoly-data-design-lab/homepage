---
layout: page
title: Projects
heading: Projects
permalink: /projects/
description: Ongoing and past research projects from the Data Design Lab.
lede: In addition to our ongoing funded and independent research projects, we are always interested in listening to new ideas and forming new collaborations, so if nothing that we ware currently doing sounds like what you are interested in, please reach out and we can talk.
---
{% capture ongoing %}{% include project-list.html projects=site.data.projects.ongoing %}{% endcapture %}
{% include section.html id="ongoing-research" title="Ongoing research" body=ongoing raw=true %}
{% capture past %}{% include project-list.html projects=site.data.projects.past %}{% endcapture %}
{% include section.html id="past-projects" title="Past projects" body=past raw=true %}
