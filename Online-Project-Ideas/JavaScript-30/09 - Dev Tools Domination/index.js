const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];
    function makeGreen() {
      const p = document.querySelector('p');
      p.style.color = '#BADA55';
      p.style.fontSize = '50px';
    }
    // Regular
console.log('hello');
    // Interpolated
console.log('Hello I am a %s string!', 'poop')
    // Styled
console.log('%c I am some great text', 'font-size:50px; background:red; text-shadow: 0px 0px 20px black')
    // warning!
console.warn('oh nooo');
    // Error :|
console.error('oh shit!');
    // Info
console.info('Crocodiles eat 3-4 people every year');
    // Testing
const p = document.querySelector('p');
console.assert(p.classlist.contains('ouch'), 'That is wrong!');
    // clearing
console.clear();
    // Viewing DOM Elements
console.log('p');
console.dir('p');
console.clear();
    // Grouping together
dogs.forEach(dog => {
console.groupCollapsed(`${dog.name}`);
	console.log(`This is ${dog.name}`);
	console.log(`{$dog.name} is ${dog.age * 7} dog years old`);
	console.groupEnd(`${dog.name}`);
})
console.clear();
    // counting
console.count('div');
    // timing

console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
.then(data => data.json())
.then(data => {
	console.timeEnd('fetching data');
	console.log(data);
})

console.table(dogs)