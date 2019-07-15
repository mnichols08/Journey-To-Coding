import React  from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchBox } from './components/search-box/search-box.component'
import { CardList } from './components/card-list/card-list.component'


// function filterByValue (array, string) {
//   return array.filter(o =>
//       Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
// }

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }
  }


  handleChange = e => {
    this.setState({ searchField: e.target.value })
  }

  componentDidMount() {
    fetch('https://codepen.io/mnichols08/pen/KjLzNd.js')
    .then(response => response.json())
    .then(users => this.setState({ monsters: users }))
  }

  render() {
    const { monsters, searchField } = this.state;
    // const filteredMonsters = monsters.filter(monster => monster.first_name.toLowerCase().includes(searchField.toLowerCase()));
    const filteredMonsters = monsters.filter(o => Object.keys(o).some(k => o[k].toString().toLowerCase().includes(searchField.toString().toLowerCase())));
    return (
      <div className="App">
        <h1>Runners Rolodex</h1>
        <SearchBox 
        placeholder='search monsters'
        handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
