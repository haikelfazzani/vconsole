# Vconsole: advanced console

- [x] Typescript
- [x] Coffeescript
- [x] LiveScript
- [x] Babel
- [x] HTML

### Embed
```js
// Params: theme - evalue - language - fontSize - minimap - tabSize
const evalue = encodeURIComponent(btoa("console.log('hello')"));

const fontSize = 16;
const tabSize = 3;
const minimap = true;
const language = 'livescript'; 
const theme = 'vs-dark'; // or 'vs-light'

// -> https://vconsole.ml?language=language&evalue=evalue&theme=theme&minimap=minimap
```

### Captures
![vconsole](https://i.ibb.co/YtHdRWq/vconsole.png)

# License
MIT
