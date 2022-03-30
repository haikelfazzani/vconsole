# Vconsole: advanced console

- [x] Typescript
- [x] Coffeescript
- [x] LiveScript
- [x] Babel
- [x] HTML

### Embed
```js
// Params: theme - code - language - fontSize - minimap
const code = encodeURIComponent(btoa("console.log('hello')"));

const fontSize = 16;
const minimap = true;
const language = 'livescript'; 
const theme = 'vs-dark'; // or 'vs-light'

// -> https://vconsole.vercel.app?language=language&code=code&theme=theme&minimap=minimap
```

### Captures
![vconsole](https://i.ibb.co/YtHdRWq/vconsole.png)

# License
MIT
