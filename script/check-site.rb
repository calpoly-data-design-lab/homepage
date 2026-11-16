#!/usr/bin/env ruby
# Check a built site (default: _site): every local link, image, stylesheet,
# script, font, and JS import resolves to a file, and the Cloudflare Pages files
# are present. Standard library only.
#
#   ruby script/check-site.rb [_site]

require "pathname"
require "uri"

root = Pathname.new(ARGV[0] || "_site").expand_path
abort "check-site: #{root} does not exist (run jekyll build first)" unless root.directory?

errors = []
missing = ->(what, from) { errors << "#{from.relative_path_from(root)}: #{what}" }

# Resolve a URL found in `from` to a file under root, or nil if it is not local.
resolve = lambda do |raw, from|
  raw = raw.strip
  return nil if raw.empty? || raw.start_with?("#", "mailto:", "tel:", "data:", "javascript:") || raw =~ %r{\A[a-z][a-z0-9+.-]*://}i || raw.start_with?("//")
  path = URI.decode_www_form_component(raw.sub(/[?#].*\z/, "").gsub("+", "%2B"))
  base = path.start_with?("/") ? root + path.delete_prefix("/") : from.dirname + path
  base = base.cleanpath
  base = base + "index.html" if path.end_with?("/") || base.directory?
  base
end

pages = root.glob("**/*.html")
abort "check-site: no HTML pages in #{root}" if pages.empty?

pages.each do |page|
  html = page.read
  html.scan(/\b(?:href|src)="([^"]*)"/).flatten.each do |url|
    target = resolve.call(url, page)
    missing.call("#{url} does not exist", page) if target && !target.file?
  end
  ids = html.scan(/\bid="([^"]+)"/).flatten
  html.scan(/href="#([^"]+)"/).flatten.each { |id| missing.call("#" + id + " has no target on the page", page) unless ids.include?(id) }
end

root.glob("**/*.css").each do |css|
  css.read.scan(/url\(\s*["']?([^"')]+)["']?\s*\)/).flatten.each do |url|
    target = resolve.call(url, css)
    missing.call("#{url} does not exist", css) if target && !target.file?
  end
end

root.glob("**/*.js").each do |js|
  js.read.scan(/(?:^|\n)\s*import\s[^"']*["']([^"']+)["']/).flatten.each do |url|
    target = resolve.call(url, js)
    missing.call("import #{url} does not exist", js) if target && !target.file?
  end
end

# Cloudflare Pages: _headers at the root; 404.html is served for unknown paths.
%w[_headers 404.html index.html].each { |f| errors << "#{f} is missing from the output" unless (root + f).file? }
errors << "_headers has no rules" unless (root + "_headers").file? && (root + "_headers").read =~ /^\/\S*\s*\n\s+\S+:/

if errors.empty?
  puts "check-site: ok (#{pages.size} pages)"
else
  warn errors.map { |e| "check-site: #{e}" }
  exit 1
end
