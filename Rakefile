task :default => :start

desc "Startup Jekyll"
task :start do
  sh 'jekyll --server'
end

desc "Start SASS watch"
task :sass do
  sh 'sass --watch static/_sass/:static/css/'
end
