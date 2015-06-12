[![Stories in Ready](https://badge.waffle.io/home-buddy/cdnpm.png?label=ready&title=Ready)](https://waffle.io/home-buddy/cdnpm)
# cdnpm

Note: This is obviously not remotely complete.

### Rationale

Systems like browserify and webpack allow us to use reasonable dependency management in our front-end projects, with all the related benefits like easily staying up-to-date.  However, CDN-hosted libraries offer speed, free bandwidth, and may already be primed in a user's browser cache, but with the caveat that one must manually manage versions and script tags.  The goal of `cdnpm` is to allow us to manage our CDN references in the same fashion that we manage our npm dependencies, and providing us the benefits of both approaches.

In prod, we will have certain large deps pulled in via CDN with versions that exactly match what we pulled in via npm locally (or in dev).

### Usage

While not required, you will probably be using browserify or webpack to create a js bundle for your app.  To extract CDN-able deps from your project you will:

1. Run `cdnpm stats` to see which deps you can extract
1. Use the API to add these deps to your `index.html`
1. Add these deps to
    * `localify` plugin config for browserify (see https://github.com/pluma/literalify)
    * `external` property in your webpack config (see http://webpack.github.io/docs/library-and-externals.html)
1. Serve your project with deps pulled in via CDN up-to-date (as much as your `node_modules` anyhow ;-)

### Node API

#### Usage

```js
var cdnpm = require('cdnpm')(/*config*/);
```

Note: config is currently unused (future use)

#### `getScriptTags`

```js
var cdnpm = require('cdnpm')(/*config*/);
var getScriptTags = cdnpm.getScriptTags;
...
getScriptTags().then(function(depScriptTags) {
    templateEngine.template(stringVar, {
        depScriptTags: depScriptTags
    });
});
```

`getScriptTags` returns a promise for the html markup for relevant script tags.  You will want to template this into your `index.html` wherever you deem appropriate for these libraries.

### CLI Commands

#### `cdnpm stats`


This command looks in your `package.json` for packages that are also hosted on CDN.  It then reports the versions and (minified) sizes of those packages on the CDN.  This gives an idea of how much one could reduce their bundle size by using the CDN version.

#### `cdnpm dry-tags`

Dry run to see what script tags get returned by the API.  Useful to ensure that these are indeed the scripts you are looking for.
