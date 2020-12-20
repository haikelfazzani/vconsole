let defVal = `const { useState, useEffect, useRef } = React;

const Title = styled.h1\`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
\`;

function Button({ onClick }) {
  return <button onClick={onClick}>click</button>;
}

function App() {
  const [count, setCount] = useState(0);
  const onCount = () => setCount(count + 1);

  return (
    <div>
      <Title>Hello World!</Title>
      {count} <Button onClick={onCount} />
    </div>
  );
}

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('preview') // dont change the selector name
);`;

let defaultTabs = [
  { index: 0, title: 'App.js', value: defVal }
];

export default class LocalData {

  static setTabs(tabs) {
    localStorage.setItem('reacto-tabs', JSON.stringify(tabs));
  }

  static getTabs () {
    try {
      let localTabs = localStorage.getItem('reacto-tabs');
      return localTabs ? JSON.parse(localTabs) : defaultTabs;
    } catch (error) {
      return defaultTabs;
    }
  }

  static getFirstTabValue() {
    return this.getTabs()[0].value;
  }

}