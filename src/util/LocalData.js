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
    let tab = { name: 'Main.js', code: codeJsx };
    let local = localStorage.getItem('tabs');
    return local ? JSON.parse(localStorage.getItem('tabs')) : [tab];
  }

  static getLastTabIndex () {
    return this.getTabs().length - 1;
  }

  static getLastTabName () {
    return this.getTabs().pop().name.replace(/\D/g, '');
  }

  static getFirstTabData () {
    return this.getTabs()[0] ? this.getTabs()[0].code : codeJsx;
  }

  static getCurrTabData() {
    let local = localStorage.getItem('reacto-curr-tab-value');
    return local ? JSON.parse(local) : this.getFirstTabData();
  }
}