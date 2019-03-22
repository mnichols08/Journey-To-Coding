import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 *- Search Object
 *- Current Recipe Object
 *- Shopping List Object
 *- Liked Recipes
*/
const state = {};

const controlSearch = async () => {
    // 1. Get Query from view
    const query = searchView.getInput();
    console.log(query);
    if (query) {
      // 2. New search object and add to state
      state.search = new Search(query);

      // 3. Prepare UI for Results
      searchView.clearInput();
      searchView.clearResults();
      renderLoader(elements.searchRes);

      // 4. Search for Recipes
      await state.search.getResults();

      // 5. Render Results on UI
      clearLoader();
      searchView.renderResults(state.search.results);
    }
  }

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
})