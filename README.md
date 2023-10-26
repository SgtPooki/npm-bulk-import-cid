# Introduction

A very basic wrapper around Kubo that can bulk import CIDs (with optional names) from a file.

## How to use

Run with:

```sh
$ npx @sgtpooki/bulk-import-cid <filename> <optionalTimeoutMs>
```

## Structure of your file

The file can be a list of only CIDs, or CIDs and names. The following are all valid formats:

```txt
bafkreibm6jg3ux5qumhcn2b3flc3tyu6dmlb4xa7u5bf44yegnrjhc4yeq
QmawceGscqN4o8Y8Fv26UUmB454kn2bnkXV5tEQYc4jBd6 barrel.png
QmbvrHYWXAU1BuxMPNRtfeF4DS2oPmo5hat7ocqAkNPr74 pi equals.png
```

You can also see [example.txt](./example.txt) for a simple example of basic formatting that I tested against while developing.

## Development

Famous last words: Files organization should be somewhat obvious.

If you pull down the source directly, you  can test that things work by running

```sh
node index.js example.txt 1000 # times out before starting daemon
node index.js example.txt # no timeout
```


### Publishing

done manually via CLI just to unblock https://github.com/ipfs/ipfs-desktop/issues/2680
