# OpenNextJs + Postgres clearImmediate already been declared

A repro for using `postgres.js` with opennextjs.

## How

If you use follow the doc https://opennext.js.org/cloudflare/howtos/workerd
and add `serverExternalPackages: ["postgres"],` to your `next.config.ts` 
You will get the following error when doing `opennextjs-cloudflare build`:

```
✘ [ERROR] Build failed with 1 error:

  ✘ [ERROR] The symbol "clearImmediate" has already been
  declared

      .open-next/server-functions/default/handler.mjs:289:40384:
        289 │ ...lete(id))}),id}function clearImmediate(id){tasks.delete(id)}va...
            ╵                            ~~~~~~~~~~~~~~

    The symbol "clearImmediate" was originally declared here:

      .open-next/server-functions/default/handler.mjs:1:76:
        1 │ ...out, clearTimeout, setImmediate, clearImmediate} from "node:timers"
          ╵                                     ~~~~~~~~~~~~~~
```

## Why

- `clearImmediate` is imported from `node:timers` by opennextjs
- `postgres.js` define the `clearImmediate` function it the cloudflare polyfill.

From https://github.com/opennextjs/opennextjs-cloudflare/blame/721bff023068c93bba830fe897de8314e71b3a5b/packages/cloudflare/src/cli/build/bundle-server.ts#L155

```ts
banner: {
  // We need to import them here, assigning them to `globalThis` does not work because node:timers use `globalThis` and thus create an infinite loop
  // See https://github.com/cloudflare/workerd/blob/d6a764c/src/node/internal/internal_timers.ts#L56-L70
  js: `import {setInterval, clearInterval, setTimeout, clearTimeout, setImmediate, clearImmediate} from "node:timers"`,
},
platform: "node",
```

`postgres.js` define the `clearImmediate` function it the polyfill.

https://github.com/porsager/postgres/blob/master/cf/polyfills.js#L231-L233

```js
function clearImmediate(id) {
  tasks.delete(id)
}
```