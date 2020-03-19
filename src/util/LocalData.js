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

  // get last saved code
  static getLastCode () {
    return localStorage.getItem('reacto-code') || codeJsx;
  }

  // auto save last code
  static saveLastCode (value) {
    localStorage.setItem('reacto-code', value);
  }

  // save new code into localStorage
  static createNewCode () {
    let lastCode = this.getLastCode();

    let oldSavedCodes = this.getSavedCodes();
    oldSavedCodes.push({ code: lastCode, date: new Date().toISOString() });

    localStorage.setItem('reacto-files', JSON.stringify(oldSavedCodes));

    //localStorage.clear('reacto-code');
  }

  // get all saved codes from localStorage
  static getSavedCodes () {
    let oldSavedCodes = localStorage.getItem('reacto-files');
    return oldSavedCodes ? JSON.parse(oldSavedCodes).reverse() : [];
  }

  static removeOneSavedCode (fileDate) {
    let oldSavedCodes = this.getSavedCodes();
    let newSavedCodes = oldSavedCodes.filter(file => file.date !== fileDate);
    localStorage.setItem('reacto-files', JSON.stringify(newSavedCodes));
    return newSavedCodes;
  }

}