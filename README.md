# unzippo

One-liner approach to safely read streams from zip files.

This is a thin wrapper around `node-stream-zip` that does all the actual job. The only thing `unzip-stream` provides is a procedudal API for atomic operations (as opposed to the original callback oriented OO API). 

"Atomic" means the zip file is opened, its central directory is read and then the resources are disposed for each separate call. In most cases, this cause no significant overhead but allows to write simpler, cleaner and easier to maintain code. 

## Installation

```
npm install unzippo
```

## Basic usage

```
const zip = require ('unzippo')

let entries = await zip.list ('/some/archive.zip')

(await zip.open ('/some/archive.zip', 'logs/access.log')).pipe (process.stdout)

let txt   = await zip.read ('/some/archive.zip', 'README.txt')
let wenzi = await zip.read ('/some/archive.zip', 'README.txt.zh', 'ucs2')

let buf   = await zip.get  ('/some/archive.zip', 'images/0.gif')
```

## Listing the archive content

```
await zip.list (zipFileName)
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

```
await zip.open (zipFileName, entryPath)
```

returns the binary readable stream corresponding to `entryPath` inside `zipFileName`.

This is the preferred, recommended way to read files from zip archives as it causes no memory related risk.

## Reading a whole file

For a small file, it may be acceptable to read it at once, in form of `Buffer`:

```
await zip.get (zipFileName, entryPath)
```

In most cases, such files have text content, so it's handier to have it as a `String`:

```
await zip.read (zipFileName, entryPath)
await zip.read (zipFileName, entryPath, encoding)
```