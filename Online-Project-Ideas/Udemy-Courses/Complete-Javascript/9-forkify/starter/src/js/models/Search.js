import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const key = '32b1077d08330afd4ff589f236f9f338';
    try {
      const result = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.results = result.data.recipes;
    } catch (error) {
      alert(error);
    }
  }

}
