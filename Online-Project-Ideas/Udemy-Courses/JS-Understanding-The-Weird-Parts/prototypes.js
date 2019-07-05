class ID{
    constructor(firstName,lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

class Car extends ID{
    setCar(year,make,model) {
        this.year = year;
        this.make = make;
        this.model = model;
    }
    
    breakDown(){
        return `${this.firstName}'s ${this.make} ${this.model} has broken down`
    }

    leakOil() {
        return `${this.firstName}'s ${this.make} ${this.model} is leaking oil!`
    }

    blowTurbo(turbo,boost) {
    return `${this.firstName}'s ${turbo} has blown at ${boost} pounds of boost!`
    }

    spoolTurbo(turbo,boost) {
        return `${this.firstName}'s ${turbo} is spooling loud at ${boost} pounds of boost!`
    }
}

class Driver extends Car {
    about(){
        return `${this.getFullName()} is driving a ${this.year} ${this.make} ${this.model}`
    }

    sayHello() {
        return `Hello, my name is ${this.getFullName()}`
    }

    forfeit() {
        return `${this.firstName} has forfeit the race =(`       
    }

}

const mikey = new Driver('Mikey','Nichols');

const display = (content) => console.log(content);
display(mikey);
display(mikey.sayHello());
mikey.setCar(1990,"Eagle","Talon TSI");
display(mikey.about());
display(mikey.spoolTurbo('EVO 16G', 40));
display(mikey.leakOil());
console.error(mikey.blowTurbo('EVO 16G', 23));
display(mikey.forfeit())

let joe = {
    firstName: 'Joe',
    lastName: 'Schmoe'
}

let person = new Driver('Jane','Doe')

// DO NOT DO THIS - FOR DEMO PURPOSE ONLY
joe.__proto__ = person; 
console.log(joe.getFullName());
console.log(joe.firstName);

let jane = {
    firstName: 'Jane' // Jane is found, but not lastName so defaults to 'Nichols'
}

jane.__proto__ = person;
console.log(jane.getFullName()); // Haha, I wasn't expecting that


for (let prop in joe) {
    if (joe.hasOwnProperty(prop)) {
        console.log(`${prop}: ${joe[prop]}`);
    }
}

    jane = {
    address: '111 Main St.',
    getFormalFullName: function() {
        return this.lastName + ', ' + this.firstName
    }
}

let jim = {
    getFirstName: function() {
        return this.firstName
    }
}



let a = {};
const b = function(){};
let c = [];
let d = "";
let e = 0;




function newCar(year, make, model) {

    this.year = year;
    this.make = make;
    this.model = model;

}
let honda = new newCar(1996,'Honda','Accord');
console.log(honda)

newCar.prototype.newTest = function() {
    return this.year + ' ' + this.make + ' ' + this.model;
}

newCar.prototype.reportIssue = function(x,y,z) {
    this.prop1 = x;
    this.prop2 = y;
    this.prop3 = z;
}
honda.newTest()
console.log(honda)
honda.reportIssue(1,2,3)
console.log(honda)



String.prototype.isLengthGreaterThan = function(limit) {
    return this.length > limit;
}

Number.prototype.isPositive = function () {
    return this > 0;
}

Array.prototype.myCustomFunction = 'cool!';
let arr = ['John','Mikey','Sandi']
for (let prop in arr) {
    console.log(`${prop}: ${arr[prop]}`);
} //for Arrays, avoid using a for in statement instead use a traditional method
function newArr (arr) {
    var result = [];
    for(var i = 0; i < arr.length; i++){result.push(arr[i])}
    return result
}
console.log(newArr(arr))
console.log(arr.map(i=>i))

if (!Object.create) {
    Object.create = function(o) {
        if(arguments.length > 1) {
            throw new Error('Object.create implementation' + ' only accepts the first parameter')
        }
        function F() {}
        F.prototype = o;
        return new F();
    }
} // A way to polyfill the Object.create in older browsers - likely unnecessary in 2019

let nextPerson = {
    firstName: 'Default',
    lastName: 'Nichols',
    greet: function() {
        return `Hi ` + this.firstName;
    }
}


var mikeyN = Object.create(nextPerson);
mikeyN.firstName = 'Mikey';
mikeyN.lastName = 'Nichols'
console.log(mikeyN);




var rickyN = Object.create(nextPerson);
rickyN.firstName ='Ricky';
console.log(rickyN);

console.clear()

let images = [];
let alts = [];

class Photograph {
    constructor(src, alt) {
        this.src = src;
        this.alt = alt;
        images.push(this.src);
        alts.push(this.alt);
    }
}
console.log(images,alts)
new Photograph('img/logo.png','This is an alt tag.')
new Photograph(...images, ...alts);
console.log(images,alts);


const runners = [{"id":1,"first_name":"Charmain","last_name":"Seiler","email":"cseiler0@wired.com","shirt_size":"2XL","company_name":"Divanoodle","donation":75},
{"id":2,"first_name":"Whitaker","last_name":"Ierland","shirt_size":"2XL","company_name":"Wordtune","donation":148},
{"id":3,"first_name":"Julieta","last_name":"McCloid","email":"jmccloid2@yahoo.com","shirt_size":"S","company_name":"Riffpedia","donation":171},
{"id":4,"first_name":"Martynne","last_name":"Paye","email":"mpaye3@sciencedaily.com","shirt_size":"XL","company_name":"Wordware","donation":288},
{"id":5,"first_name":"Gussy","last_name":"Raraty","shirt_size":"L","company_name":"Oozz","donation":291},
{"id":6,"first_name":"Yule","last_name":"Tommasetti","email":"ytommasetti5@state.gov","shirt_size":"S","company_name":"Yodo","donation":27},
{"id":7,"first_name":"Kathie","last_name":"Majury","email":"kmajury6@guardian.co.uk","shirt_size":"3XL","company_name":"Zoomcast","donation":261},
{"id":8,"first_name":"Tanner","last_name":"Branton","email":"tbranton7@tmall.com","shirt_size":"2XL","company_name":"Realmix","donation":28},
{"id":9,"first_name":"Sarina","last_name":"Lasham","email":"slasham8@toplist.cz","shirt_size":"XL","company_name":"Gigashots","donation":110},
{"id":10,"first_name":"Bertie","last_name":"Lonergan","email":"blonergan9@issuu.com","shirt_size":"3XL","company_name":"Skinte","donation":62}
];

let fullNames = runners.map(runner => runner.first_name + ' ' + runner.last_name)

class Runners{
    constructor(first){
        this.firstName = first;
    }
}
"use strict"


var z = function() { }
console.log(typeof z)
console.clear()

class Vehicle{
    constructor(year,make,model){
        this.year = year;
        this.make = make;
        this.model = model;
    }
    concatCar() {
        return `${this.make} ${this.model}`; // Brings the make and model together in a string
    }
    getYearsOld() {
        return new Date().getFullYear() - this.year; // Determines the age of a vehicle
    }
    getOwner() {
        return !this.owner ? `nobody` : this.owner; // Declares name to be name nobody if not set
    }
    getGender() {
        return !this.gender ? `their` : this.gender.includes(`f`) ? `her` : `his`; // Determines if gender has been set and returns their, her, or his
    }
    addMiles() {
        this.mileage += 20;
        return this.mileage;
    }
}

class Owner extends Vehicle {
    constructor(year,make,model,owner,gender,mileage){
        super(year, make, model); // super carries in the variable from the class which this one extends.
        this.owner = owner;
        this.gender = gender;
        this.mileage = mileage;
    }
    returnYearsOld() {
        return `${this.getOwner()}'s ${this.concatCar()} is ${this.getYearsOld()} years old` // Returns the name of the owner, the make and model of the car, and the age of the car
    }
    revEngine() {
        return `${this.getOwner()} is revving ${this.getGender()} engine.` // Returns that the owner of the car is revving his/her/their engine
    }
    setMileage(mileage){
        let newMileage = this.mileage === mileage && mileage !== undefined ? `Mileage did not change from ${mileage}` : this.mileage !== mileage && !Object.is(mileage,NaN) && mileage != undefined && this.mileage != undefined? `Mileage changed from ${this.mileage} to ${mileage}` : mileage !== undefined ? `Mileage set to ${mileage}`: `Mileage could not be set or changed. Please input parameters`;
        this.mileage = mileage; 
        return newMileage;
    }
}


let myVeh = new Vehicle(1990, 'Eagle', 'Talon');
myVeh.mileage = 20;
console.log(myVeh)
console.log(myVeh.concatCar());
console.log(myVeh.getYearsOld());
console.log(myVeh.getOwner());
console.log(myVeh.getGender());

// console.clear()

let pilot = new Owner(1990, 'Eagle', 'Talon','Mikey','male');

console.log(pilot)
console.log(pilot.returnYearsOld());
console.log(pilot.revEngine());
pilot.setMileage.call(myVeh, 20000); // allows the Vehicle class to set the mileage on it using a function.
myVeh.addMiles();
console.log(pilot.setMileage(1))
console.log(myVeh);
pilot.addMiles();
console.log(pilot)


console.clear()

// more prototype practice
const gallery = [];
class Gallery {
    constructor(name){
        this.name = name;
    }
}
class Picture extends Gallery{
    constructor(name, src, id){
        super(name);
        this.src = src;
        this.id = id;
        gallery.push(this)

    }
}

const nameArr = ['Joe','Bob','John','Mikey'];
const srcArr = ['images/logo.png','images/img2.png','images/img3.jpg','images/img4.png'];
const idArr = [0,1,2,3]

nameArr.forEach((photo,i) => new Picture(photo,srcArr[i], i));
console.log(gallery);

console.clear()

class newObject{
    constructor(){
    return this
    }
}

class nextObject extends newObject{
    constructor(val1,val2){
        super()
        this.value1 = val1;
        this.value2 = val2;
    }
}