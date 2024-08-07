export const defaultLanguages = [
  { name: 'javascript', icon: '349419/javascript.svg', extensions: ['js'] },
  { name: 'typescript', icon: '349540/typescript.svg', extensions: ['ts'] },
  { name: 'react', icon: '452092/react.svg', extensions: ['jsx', 'tsx'] },
  { name: 'html', icon: '452228/html-5.svg', extensions: ['html'] },
  { name: 'css', icon: '373535/css.svg', extensions: ['css'] }
];

const defaultTab = [{
  index: 0,
  name: 'main.html',
  code: '<div id="root"></div>',
  language: 'html',
  icon: defaultLanguages[3].icon
},
{
  index: 1,
  name: 'App.tsx',
  code: `function App() {
const [state, setState] = useState('hello')
return (
<div>
<button onClick={() => { setState('World')}}>Click</button>
{state}
</div>
);
}

ReactDOM
.createRoot(document.getElementById('root'))
.render(<App />)`,
  language: 'javascript',
  icon: defaultLanguages[2].icon
},
{
  index: 2,
  name: 'App.css',
  code: `body { background:black; color:white; }`,
  language: 'css',
  icon: defaultLanguages[4].icon
},
{
  index: 3,
  name: 'Console.ts',
  code: `let name: string = "Alice";
let age: number = 30;
let isStudent: boolean = true;

let hobbies: string[] = ["reading", "coding", "hiking"];

let person: { name: string; age: number; hobbies: string[] } = {
  name: "Bob",
  age: 25,
  hobbies: ["gaming", "music"],
};

console.log(age, isStudent, hobbies, person)`,
  language: 'typescript',
  icon: defaultLanguages[1].icon
}];

export function getTabs() {
  try {
    return localStorage.getItem('editor-file-explorer')
      ? JSON.parse(localStorage.getItem('editor-file-explorer'))
      : defaultTab
  } catch (error) {
    return defaultTab
  }
}

export const configFile = {
  fontSize: 14,
  tabSize: 2,
  theme: 'vs-dark'
}