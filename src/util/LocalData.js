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
    let tab = { name: 'Main.js', code: codeJsx, index: 0 };
    let local = localStorage.getItem('tabs');
    return local ? JSON.parse(localStorage.getItem('tabs')) : [tab];
  }

  static getLastTabIndex() {
    let local = this.getTabs();  
    return local ? local.pop().index : 0;
  }


  static getFirstTabData() {
    let local = this.getTabs();  
    return local[0];
  }

}