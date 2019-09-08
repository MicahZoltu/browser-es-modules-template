# Description

This is a simple template project that shows how to use ES modules without bundling in a browser.  It uses knockoutjs to show the utilization of a UMD module, but it can also leverage ES module node dependencies.

# Caveats

CommonJS modules are a problem.  Since they reference the `require` function which isn't present in the browser, and they load files synchronously (which browser doesn't support) they can't be referenced naively.  Ideally, don't use CommonJS modules and encourage project maintainers to distribute ES modules in their projects.

# Usage
```
npm install
npm run build
npm run serve
```
Then browse to http://localhost:8081/index.html

You'll notice that the page initially displays "Loading..." and then switches to displaying "Hello world!" once knockout is loaded and working.  The code utilizes knockout's templating engine to prove that everything is in fact working correctly, and it has multiple files to show that imports are working.

# How it works

`ttsc` is used so that we can compile with compiler plugins referenced in `tsconfig.json`.  In this case, `@zoltu/typescript-transformer-append-js-extension` is the plugin we are using.  That plugin will make it so all import/export statements are compiled to include the `.js` file suffix.  This is necessary because browsers do not have the luxury of being able to follow nodejs's module resolution strategy which involves searching for files, the browser must have the exact filename so it can fetch on the first try.

We are using `es-module-shims` to get [import maps](https://github.com/WICG/import-maps) polyfilled, which aren't yet available in any browsers.  This lets us do things like `import 'knockout'` and have that resolve to `node_modules/knockout/build/output/knockout-latest.js`.  You can see the import map in `index.html`.

With all of that setup, we are able to write pure TypeScript and serve using a static file server without any additional build steps.  Once import maps land in major browsers, we'll be able to drop the `es-module-shims`.  If TypeScript ever adds support for compiling with JS extension, then we'll be able to drop the plugin and `ttsc`.