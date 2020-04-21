const codeJsx = `function Button({ onClick }) {
  return <button onClick={onClick}>click</button>
}

function App() {
  const [count, setCount] = React.useState(0);
  
  const onCount = () => setCount(count + 1);
  
  return <div>
    {count} <Button onClick={onCount} />
  </div>
}

render(<App />, document.getElementById('root'))`;

export default class LocalData {

  static getTabs () {
    let tab = { name: 'App.js', codeJsx };
    let local = localStorage.getItem('reacto-tabs');
    return local ? JSON.parse(local) : [tab];
  }
}