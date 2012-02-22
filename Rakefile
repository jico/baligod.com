require 'date'
require 'fileutils'

namespace :new do
  desc "Draft a new post"
  task :post do
    d = DateTime.now
    dstr = "%d-%02d-%02d-" % [d.year, d.month, d.day]
    puts "What should we call this post for now?"
    name = STDIN.gets.chomp
    
    filename = dstr + name.gsub(/ /, '-').gsub(/[^\w+\-]/, '')
    FileUtils.touch("drafts/#{filename.downcase}.md")

    open("drafts/#{filename}.md", 'a') do |f|
      f.puts "---"
      f.puts "layout: post"
      f.puts "title: \"#{name}\""
      f.puts "published: false"
      f.puts "---"
    end
  end
  
  desc "Draft a new project"
  task :project do
    d = DateTime.now
    dstr = "%d-%02d-%02d-" % [d.year, d.month, d.day]
    puts "What should we call this project for now?"
    name = STDIN.gets.chomp
    puts "How about a brief summary?"
    summary = STDIN.gets.chomp
    puts "What's the project url?"
    projectUrl = STDIN.gets.chomp
    
    filename = dstr + name.gsub(/ /, '-').gsub(/[^\w+\-]/, '')
    FileUtils.touch("drafts/#{filename.downcase}.md")

    open("drafts/#{filename}.md", 'a') do |f|
      f.puts "---"
      f.puts "layout: project"
      f.puts "title: \"#{name}\""
      f.puts "published: false"
      f.puts "category: projects"
      f.puts "summary: #{summary}"
      f.puts "project-url: #{projectUrl}"
      f.puts "features:"
      f.puts "---"
    end
  end
end

namespace :dev do
  desc "Startup Jekyll"
  task :jekyll do
    sh "jekyll --server"
  end
  
  desc "Startup SASS"
  task :sass do
    sh "sass --style compressed -l --watch static/_sass/:static/css"
  end
end

desc "Publish any finished drafts"
task :publish do
  Dir.foreach("drafts/") do |file|
    next if File.directory?(file)
    unless File.readlines("drafts/#{file}").grep(/published: true/).empty?
      d = DateTime.now
      dstr = "%d-%02d-%02d-" % [d.year, d.month, d.day]
      newFile = dstr + file[11, file.length]
      FileUtils.mv("drafts/#{file}", "_posts/#{newFile}")
      puts "Published \"#{newFile}\""
    end
  end
end