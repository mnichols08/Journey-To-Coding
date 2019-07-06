class Collection{
    constructor(){
        this.collection = [];
    };
}
class Movie extends Collection{
    constructor(title,hasWatched,rating){
        super()
        this.title = title;
        this.hasWatched = hasWatched;
        this.rating = rating;
        delete this.collection;
    }
}
const collection = new Collection().collection
const newMovie = (title,hasWatched,rating) => new Movie(title,hasWatched,rating);
const halfBaked = newMovie('half baked',true,5);
const fightClub = newMovie('Fight Club',true,4);
const promptForMovie = () => {
    let title = prompt('Enter the name of a movie.');
    let hasWatched = prompt('Have you ever seen that one?');
    let rating = prompt('What would you rate this movie?');
    let thisMovie = newMovie(title,hasWatched == false || hasWatched[0] == 'n' ? false : true, rating);
    collection.push(thisMovie);
    console.log(collection)
}
collection.push(fightClub,halfBaked)

console.log(collection);





const updateBody = () => {
    const random360 = () => Math.floor(Math.random()*360);
    const randomColor = () => `hsl(${random360()},50%,50%)`;
    document.body.style.background = `linear-gradient(${random360()}deg, ${randomColor()}, ${randomColor()})`;
    document.querySelector('h2').innerHTML = document.body.style.background;
    }
document.querySelector('h1').addEventListener('click', updateBody);

















const literalMovies = [
    {title: 'fight Club',
     hasWatched: true,
     rating: 4},
     {title: 'half baked', 
     hasWatched: true, 
     rating: 5}
]
console.log(literalMovies)