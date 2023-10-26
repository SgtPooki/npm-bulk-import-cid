This was originally going to be pushe to a gist, but to separate everything out and make more "official" I decided to publish to npm.

This could easily be updated to be a gist with some scripts similar to the following. You would obviously need to change the gist id and url.

```json
{
    "update-gist": "run-s 'update-gist-file -- index.js -f index.js' 'update-gist-file -- package.json -f package.json'",
    "update-gist-file": "gh gist edit 54d48f495e32387d38ab21863281d0dc",
    "test": "npx -y https://gist.github.com/SgtPooki/54d48f495e32387d38ab21863281d0dc"
}
```

