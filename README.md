# Vconsole: advanced console

- [x] Typescript
- [x] Coffeescript
- [x] LiveScript

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

### Todo
- [ ] PWA
- [ ] Samples

# License
MIT