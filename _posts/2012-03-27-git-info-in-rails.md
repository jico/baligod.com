---
layout: post
title: "Git Info in Rails"
published: true
---
## Initializer

When developing a Rails application (or any app) with Git, it's sometimes useful to see which branch or commit you're currently on. You can initialize some global constants pretty easily in Rails by creating a file under your `config/initializers/` directory. I like to make a single file with all of my application-wide constants in `config/initializers/global_constants.rb`, but you can also split it up into specific files like `config/intializers/git_info.rb` for example.

## Git information

To get your current branch and commit information, just stick this in your initializer file:

{% highlight ruby %}
# Get branch information
GIT_BRANCH = `git branch`.split.last
GIT_COMMIT = `git log | sed -n 1p`
{% endhighlight %}
    
If you come across some color codes in the output, you can strip it out like so

{% highlight ruby %}
# Strip out color codes
GIT_COMMIT = `git log | sed -n 1p`.gsub(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/,'').split.first
{% endhighlight %}

## Tags and versions
    
A great feature of Git is [tagging](http://learn.github.com/p/tagging.html "Git Tagging"), which is typically used to tag version numbers, feature releases, and patches. An annotated tag is probably the simplest way to tag the current or any specified commit. For example:
    
{% highlight sh %}
# Simple annotated tagging
$ git tag -a v1.0.0 454ef4d -m 'Initial public release!'
{% endhighlight %}

Note that you can drop the `454ef4d` commit specification, which would then just tag the current commit. You can also sign your tags with [GPG](http://www.gnupg.org/ "GPG") using the `-s` option instead of the `-a` option. If you're on GitHub, you can push your tags using `git push --tags`.

If you've been tagging along, a neat thing you can do is to display the latest version number or release in your application. Again, we can do this by creating a global constant

{% highlight ruby %}
# Get latest tag information
APP_VERSION = `git describe --tags`.strip
{% endhighlight %}
    
which will output something similar to `v1.0.0-1-g6a9ee26`. The format here is `[tag name]-[# commits ahead]-[current commit]`. This might be useful in a development environment, but you might want to strip it down to just the version number or tag name in your production app:

{% highlight ruby %}
# Get only tag name
APP_VERSION = `git describe --tags \`git rev-list --tags --max-count=1\`
`.strip
{% endhighlight %}
    
Now you can print the `APP_VERSION` or any of the other constants out in one of your views, like your site's footer, and make your app feel super official.