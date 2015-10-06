## SWFPlayerVersion ![](https://img.shields.io/github/release/syranide/swf-player-version.svg) ![](https://img.shields.io/badge/npm-swf--player--version-blue.svg) ![](https://img.shields.io/badge/bower-swf--player--version-blue.svg)

Shockwave Flash Player version utility. GCC `ADVANCED` optimizations compatible.

```js
// Test if SWF Player version is supported and output the actual version.
if (SWFPlayerVersion.isSupported('10.0')) {
  alert('SWF Player ' + SWFPlayerVersion.get() + ' is installed');
}
```

## API

```
get()
  returns {?string} '#.#.#' or null.

  Get available SWF Player version. Result is cached.
```
```
isSupported(requiredString)
  requiredString {string} '#.#.#', '#.#', '#' or ''.
  returns {boolean} true if supported.

  Determine if available SWF Player meets version requirement.
```
