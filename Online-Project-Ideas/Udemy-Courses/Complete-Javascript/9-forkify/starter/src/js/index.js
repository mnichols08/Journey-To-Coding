import Search from './models/Search';

/** Global state of the app
 *- Search Object
 *- Current Recipe Object
 *- Shopping List Object
 *- Liked Recipes
*/
const state = {};

const controlSearch = async () => {
    // 1. Get Query from view
    const query = document.querySelector('input.search__field').value //TODO
    if (query) {
      // 2. New search object and add to state
      state.search = new Search(query);

      // 3. Prepare UI for Results

      // 4. Search for Recipes
      await state.search.getResults();

      // 5. Render Results on UI
      console.log(state.search.results)
    }
  }

document.querySelector('.search').addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
})
