---
layout: post
title: "LESS extends suck"
published: true
---

CSS preprocessors such as [Sass](http://sass-lang.com/) and [LESS](http://lesscss.org/) provide a really great way to modularize and reuse our CSS properties with the `@extend` concept. Extending essentially allows us to inherit properties from another existing selector. This is especially powerful in Sass, as it merely modifies the extended CSS declaration. So something like:

```scss
.foo {
  background: #000;
}

.bar {
  @extend .foo;
  color: #eee;
}
```

Outputs the following:

```scss
.foo, .bar {
  background: #000;
}

.bar {
  color: #eee;
}
```

Stupidly simple and highly efficient.

## Where LESS does less

We can do the same thing in LESS:

```scss
.foo {
  background: #000;
}

.bar {
  .foo;
  color: #eee;
}
```

But notice LESS doesn't use an `@extend` keyword, instead we just drop in the selector. The funny thing that's not so funny is, we use periods to include LESS mixins as well, which can make our LESS code pretty convoluted. So what happens when we have a class _and_ a mixin called `foo`? It turns out that both the `foo` mixin is included and the `.foo` class extended. Obviously this conflict will only occur when extending classes, but that's likely 99% of the time. Granted we should probably avoid situations like this, but still, yikes.

One other disadvantage of LESS extends is in the way it inherits the extended properties, which is by simply copying those properties into the extending block. The above LESS code will output the following:

```scss
.foo {
  background: #000;
}

.bar {
  background: #000;
  color: #eee;
}
```

Still stupidly simple, yet not so efficient. For small projects with minimal CSS, the extra generated output is negligible. But imagine a large project where we want to modularize our CSS for easy maintainability and updates. Extending large classes would keep things very clean, but the output of these extends may add unnecessary weight to your CSS files.
