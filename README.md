# Cal Poly Data Design Lab website template

A GitHub Pages/Jekyll static website template for the Cal Poly Data Design Lab at Cal Poly San Luis Obispo. Lab members, projects, navigation, and site-wide settings are edited in YAML files under `_data/` and rendered automatically by reusable layouts/includes.

## Edit content

- `_data/site_settings.yml` — lab name, tagline, email, location, footer text.
- `_data/navigation.yml` — top navigation links.
- `_data/people.yml` — affiliated faculty, students, and alumni.
- `_data/projects.yml` — ongoing and past research projects.
- `index.md`, `people.md`, `projects.md`, `about.md`, `join.md` — editable page copy, including the regular lab meeting details on the homepage.

## Add images

Place headshots in `assets/img/people/` and update the `image` field in `_data/people.yml`. Photographs are converted to the site's dithered treatment in the browser. If an image is omitted, the person gets the D mark in the same treatment.

## Run locally

You need Ruby (see `.ruby-version`) and Bundler. No Node.

```sh
bundle install
bundle exec jekyll serve
```

Then open `http://127.0.0.1:4000`. `script/build` does what the deploy does: a production build into `_site/`, then `script/check-site.rb`, which fails if any local link, image, stylesheet, font, script, or JS import in the built site does not resolve.

