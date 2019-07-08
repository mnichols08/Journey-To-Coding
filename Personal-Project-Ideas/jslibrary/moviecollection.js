(function(global){
    class Collection{
    constructor(){
        this.collection = []; // Creates an array on the parent object to store values created.
    };
}
class Color extends Collection{
    constructor(degree,r,g,b,hue,sat,light){ // We are creating a linear gradient with Hue, Saturation, and Light
        super()
        this.direction = degree; // linear-gradient() degree variable
        this.hue = r; // hue variable
        this.saturation = g; // saturation variable
        this.light = b; // light variable
        this.hue2 = hue; // 2nd hue variable
        this.sat = sat; // 2nd saturation variable
        this.lite = light; // 2nd light variable
        delete this.collection; // removes the array from this object - do not need it.
    }
    updateBody(style) {
        document.body.style.background = style; // sets the body background to the generated hsl()
        document.querySelector('h2').innerText = style; // passes the value into the h2 element so user can see it.
    }
}
const collection = new Collection().collection // assigns the collection variable from parent object to store colors
const newColor = (deg,r,g,b,hue,sat,light) => new Color(deg,r,g,b,hue,sat,light); // sets up the Color Constructor

const initColor = () => { 

    const randomRange = (min,max) => Math.floor(Math.random()*(max-min+1)+min); // Generates a random interval between two numbers
    const randomNum = (num) => Math.floor(Math.random()*num); // Generates a random number between 0 and single number passed in
    const happyMedium = [45,55]; // Range to be passed into randomRange - Keeps the colors from getting to dark or too bright (they define saturation and brightness)
    const randomDeg = randomNum(360), randomHue = randomNum(360), randomSat = randomRange(...happyMedium),randomLgt = randomRange(...happyMedium); // put numbers into
    const                             randomH_e = randomNum(360), randomS_t = randomRange(...happyMedium),randomL_t = randomRange(...happyMedium); // memory for now

    let thisColor = newColor(randomDeg,randomHue,randomSat,randomLgt,randomH_e,randomS_t,randomL_t); // finally creates the object using all the random numbers just set
    collection.push(thisColor); // pushes the values we created into storage on the parent to recall them later.

    const style = `linear-gradient(${randomDeg}deg, hsl(${randomHue}, ${randomSat}%, ${randomLgt}%),hsl(${randomH_e},${randomS_t}%,${randomL_t}%))` // writes style str
    thisColor.updateBody(style); // passes style string to the updateBody method on this newly created object.
}
global.collection = collection; // passes the collection array to the global scope

document.getElementById('change').addEventListener('click', initColor); // listens for keypress on the button to update DOM on request.
})(window)