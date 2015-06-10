# cdnpm

Note: This is obviously not remotely complete.

### Rationale

Systems like browserify and webpack allow us to use reasonable dependency management in our front-end projects, with all the related benefits like easily staying up-to-date.  However, CDN-hosted libraries offer speed, free bandwidth, and may already be primed in a user's browser cache, but with the caveat that one must manually manage versions and script tags.  The goal of `cdnpm` is to allow us to manage our CDN references in the same fashion that we manage our npm dependencies, and providing us the benefits of both approaches.

### Node API


### CLI Commands

```bash
cdnpm stats
```

This command looks in your `package.json` for packages that are also hosted on CDN.  It then reports the versions and (minified) sizes of those packages on the CDN.  This gives an idea of how much one could reduce their bundle size by using the CDN version.
