# jazzon-import

> Plugin for jazzon to import other files

## Usage

The plugin requires option `from` to know where to look for files.

```javascript
let jazzon = require('jazzon');
let importer = require('jazzon-import');
let json = { foo: '${ import(foo.json) }'};

jazzon
  .use(importer({ from: __dirname }))
  .compile(json)
  .then((result) => {
    console.log(result); // => { "foo": <CONTENT_OF_FOO.JSON> }
  });
```

## TODO
- [ ] Support importing JavaScript files
- [ ] Explore using relative paths
