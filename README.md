# Example

```shell
$ npm install gen-map --save
```

```javascript
const GP = require('gen-map');

const gen = GP([3,4,5,6])
    .map(x => x * x)
    .map(x => x + 3)
    .apply()

console.log(gen.get(2)) //[12, 19]
console.log(gen.all()) // [28, 39]

```
