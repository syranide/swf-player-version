## SWFVersion ![](https://img.shields.io/github/release/syranide/swf-version.svg)

Shockwave Flash Player version utility. GCC `ADVANCED` optimizations compatible.

```js
// Test if SWF Player version is supported and output the actual version.
if (SWFVersion.isSupported('10.0')) {
  alert('SWF Player ' + SWFVersion.get() + ' is installed');
}
```

## API

```
get()
  returns {?string} 'X.Y.Z' or null.

  Get available SWF Player version. Result is cached.
```
```
isSupported(requiredString)
  requiredString {string} 'X.Y.Z', 'X.Y' or 'X'.
  returns {boolean} true if supported.

  Determine if available SWF Player meets version requirement.
```
