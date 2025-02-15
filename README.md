![workflow](https://github.com/do-/unzippo/actions/workflows/main.yml/badge.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)

`unzippo` is a thin wrapper around [`node-stream-zip`](https://www.npmjs.com/package/node-stream-zip) that does all the actual job. The only thing the present module provides is a procedural API for atomic operations. 

_Atomic_ here means a zip file is opened, its central directory is read and then the resources are disposed for each separate call. In most cases, this cause no significant overhead but allows to write simpler, cleaner code.

Since the [async API](https://www.npmjs.com/package/node-stream-zip#async-api) is implemented by the original `node-stream-zip`, there is little sense left to wrap it any more.

Still, one may prefer to use one liners instead of coping with the [mandatory](https://www.npmjs.com/package/node-stream-zip#async-api:~:text=//%20Do%20not%20forget%20to%20close%20the%20file%20once%20you%27re%20done%0Aawait%20zip.close()%3B) asynchronous `.close()`.

## Installation

```
npm install unzippo
```

## Basic usage

```js
const zip = require ('unzippo')

const entries = await zip.list ('/some/archive.zip')

(await zip.open ('/some/archive.zip', 'logs/access.log')).pipe (process.stdout)

const txt   = await zip.read ('/some/archive.zip', 'README.txt')
const wenzi = await zip.read ('/some/archive.zip', 'README.txt.zh', 'ucs2')

const buf   = await zip.get  ('/some/archive.zip', 'images/0.gif')
```

## Listing the archive content

```js
const entries = await zip.list (zipFileName)
```

returns exactly the same data structure as `node-stream-zip`'s `zip.entries()`: 

```
{
  '/path/to/someEntry': {
    name: '/path/to/someEntry', // same as the key
    size: 354354,               // uncompressed, bytes
    ...,                        // technical info
  },
  ...                           // other entries
}
```

## Extracting a file as a stream

```js
const in = await zip.open (zipFileName, entryPath) // .pipe (myXform)...
```

returns the binary readable stream corresponding to `entryPath` inside `zipFileName`.

This is the preferred, recommended way to read files from zip archives as it causes no memory related risk.

## Reading a whole file

For a small file, it may be acceptable to read it at once, in form of `Buffer`:

```js
const buf = await zip.get (zipFileName, entryPath)
```

In most cases, such files have text content, so it's handier to have it as a `String`:

```js
const txt = await zip.read (zipFileName, entryPath) // utf8
const txt = await zip.read (zipFileName, entryPath, encoding)
```
