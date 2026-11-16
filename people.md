---
layout: page
title: People
heading: People
permalink: /people/
description: Faculty, students, and alumni affiliated with the Data Design Lab.
lede: The lab brings together faculty and students across a wide range of disciplines and departments interested in human-centered approaches to data.
---
{% capture faculty %}{% include people-list.html people=site.data.people.faculty %}{% endcapture %}
{% include section.html id="faculty" title="Faculty" body=faculty raw=true %}
{% capture students %}{% include people-list.html people=site.data.people.students %}{% endcapture %}
{% include section.html id="students" title="Students" body=students raw=true %}
{% capture alumni %}{% include people-list.html people=site.data.people.alumni %}{% endcapture %}
{% include section.html id="alumni" title="Alumni" body=alumni raw=true %}
