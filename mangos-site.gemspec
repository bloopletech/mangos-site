# -*- encoding: utf-8 -*-
require File.expand_path("../lib/mangos-site/version", __FILE__)

Gem::Specification.new do |s|
  s.name        = "mangos-site"
  s.version     = Mangos::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ['Brenton "B-Train" Fletcher']
  s.email       = ["i@bloople.net"]
  s.homepage    = "http://github.com/bloopletech/mangos-site"
  s.summary     = "Web-based frontend SPA for Mangos."
  s.description = "mangos-site generates a HTML/JS Single Page Application (SPA) that allows you to browse and view manga/comics in your collection. The SPA UI is much easier to use than using a filesystem browser or normal image viewer; and the SPA, along with the collection can be trivially served over a network by putting the collection and the SPA in a directory served by nginx or Apache."

  s.required_rubygems_version = ">= 1.3.6"
  s.rubyforge_project         = "mangos-site"

  s.add_development_dependency "bundler", ">= 1.0.0"
  s.add_dependency "mangos", ">= 0.0.9"

  s.files        = `git ls-files`.split("\n")
  s.executables  = `git ls-files`.split("\n").map{|f| f =~ /^bin\/(.*)/ ? $1 : nil}.compact
  s.require_path = 'lib'
end
