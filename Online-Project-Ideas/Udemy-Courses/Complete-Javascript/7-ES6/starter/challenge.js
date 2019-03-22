/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Element {
  constructor(name, yearBuilt) {
    this.name = name;
    this.yearBuilt = yearBuilt;
  }
}

class Park extends Element {
  constructor(name, yearBuilt, area, numTrees) {
    super(name, yearBuilt);
    this.area = area;
    this.numTrees = numTrees;
    this.treeDensity = numTrees / area;
  }

  logDensity() {
    console.log(`${this.name} has a tree density of ${this.treeDensity} trees per square mi.`);
  }
}

class Street extends Element {
  constructor(name, yearBuilt, length, size = 3) {
    super(name, yearBuilt);
    this.length = length;
    this.size = size;
  }

  classifyStreet() {
    const classification = new Map();
    classification.set(1, 'tiny');
    classification.set(2, 'small');
    classification.set(3, 'normal');
    classification.set(4, 'big');
    classification.set(5, 'huge');
    console.log(`${this.name} was built in ${this.yearBuilt} and is a ${classification.get(this.size)} street.`);
  }
}

const allParks = [new Park('Deep Creek Lake State Park', 1923, 0.2, 215),
  new Park('Big Run State Park', 1972, 2.9, 3541),
  new Park('Swallow Falls State Park', 1952, 0.4, 949)
];

const allStreets = [new Street('Deep Creek Drive', 1933, 2, 2),
  new Street('North Glade Rd', 1942, 2, 2),
  new Street('Toothpick Rd', 1954, 1, 1),
  new Street('Glendale Bridge', 1932, 5, 5)
];

function calc(arr) {

  const sum = arr.reduce((prev, cur, index) => prev + cur, 0);

  return [sum, sum / arr.length];

}

function reportParks(p) {

  console.log('-----PARKS REPORT-----');

  // Density
  p.forEach(el => el.logDensity());

  // Average Age
  const ages = p.map(el => new Date().getFullYear() - el.yearBuilt);
  const [totalAge, avgAge] = calc(ages);
  console.log(`Our ${p.length} parks have an average of ${avgAge} years.`);

  // Which Park has more than 1000 trees
  const i = p.map(el => el.numTrees).findIndex(el => el >= 1000);
  console.log(`${p[i].name} has more than 1000 trees.`);

}

function reportStreets(s) {

  console.log('-----STREETS REPORT-----');

  // Total and average length of the town's streets
  const [totalLength, avgLength] = calc(s.map(el => el.length));
  console.log(`Our ${s.length} streets have a total length of ${totalLength} mi, with an average of ${avgLength} mi.`);

  // Classigy Sizes
  s.forEach(el => el.classifyStreet());
}
(function(){
reportParks(allParks);
reportStreets(allStreets);
})();
