# vendor-lucide

A trimmed, pinned copy of [lucide-icons/lucide](https://github.com/lucide-icons/lucide) (ISC), maintained by
[vendor-keeper](https://github.com/jbwashington/vendor-keeper) (private) for James Washington's apps. Apps
copy `src/` into `vendor/lucide/` instead of installing `lucide-react` from npm.

**Based on upstream `0.575.0`** (`10f6d5f8c`), reviewed through `0.575.0`.
See `UPSTREAM.json` for the exact files tracked.

## What we took

Only the icon component: upstream `Icon.ts`, `createLucideIcon.ts`, `defaultAttributes.ts` and five `@lucide/shared` utils, merged into one `src/Icon.tsx` with a `createIcon(displayName, classes, iconNode)` factory. Icon path data is NOT here: each consumer generates the icons it imports (`scripts/vendor-icons.ts`, from the sha512-pinned npm tarball). `test/render.test.ts` renders our component and upstream's under 13 prop combinations and requires identical markup.

## Layout

| Path | What | Who writes it |
|---|---|---|
| `upstream/` | the tracked upstream files, byte-for-byte at `UPSTREAM.json` `tag` | `vk prepare` only, and `vk` refuses to ship if it doesn't match upstream |
| `src/` | what apps copy in | ports, reviewed by tests and the `vk` guard |
| `test/` | `src/` vs `upstream/` checks | |
| `CHANGES.md` | every upstream range applied, skipped or auto-advanced, and why | `vk` |

`diff -ru upstream src` is the complete list of our changes from upstream.

## How it's kept current

A daily scan checks for new upstream releases (only ones at least 48h old, the same cooldown as package
installs) and OSV advisories for our pinned version. If no tracked file changed, the review marker moves
forward on its own. Otherwise an agent reads the upstream diff, ports only what's worth taking (security and
correctness fixes, not features), runs the tests, and ships through a gate. The gate refuses new imports, network,
eval, process/env access, encoded blobs or big diffs, and requires every app that uses this copy to build.

## License

Upstream's license applies to everything here; see `src/LICENSE`.
