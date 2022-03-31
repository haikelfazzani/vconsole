export default class Tabs {
  static addOne() {
    let tabs = this.getAll();
    tabs = [...tabs, { title: 'tab ' + tabs.length, content: '' }];
    localStorage.setItem('tabs', JSON.stringify(tabs))
  }

  static updateOne(tabIndex, value) {
    let tabs = this.getAll();
    tabs[tabIndex].content = value;
    localStorage.setItem('tabs', JSON.stringify(tabs))
  }

  static updateTabTitle(tabIndex, title) {
    let tabs = this.getAll();
    tabs[tabIndex].title = title;
    localStorage.setItem('tabs', JSON.stringify(tabs))
  }

  static remove(index) {
    let tabs = this.getAll().filter((t, i) => i !== index)
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }

  static getOne(index) {
    return this.getAll()[index];
  }

  static getContent() {
    return this.getAll().map(t => t.content).reverse().join('\n');    
  }

  static getAll() {
    try {
      return JSON.parse(localStorage.getItem('tabs'));
    } catch (error) {
      return [{ title: 'Main', content: 'console.log("Welcome To VConsole")' }]
    }
  }
}