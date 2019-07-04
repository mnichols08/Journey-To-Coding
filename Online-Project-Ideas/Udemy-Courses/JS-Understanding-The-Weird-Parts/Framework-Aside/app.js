const person = new Object();

person['firstName'] = 'Michael';
person['lastName'] = 'Nichols';

let firstNameProperty = "firstName";

person.firstName = 'Michael';
person.middleName = 'David';



person.address = new Object();

person.address.street = "9169 George Washington Highway";
person.address.city = "Gormania";
person.address.state = "West Virginia";

console.log(person);

const newPerson = {
    firstName: 'Michael', 
    lastName: 'Nichols',
    middleName: 'David',
    address: {
        street: '9169 George Washington Hwy',
        city: 'Gormania',
        state: 'West Virginia',
        zip: 26720
    }};

    console.log(newPerson);

    function greet(person) {
        console.log(`Hi ${person.firstName}`)
    };
    greet(newPerson);
    greet({
        firstName:'Mikey',
        lastName: "Nichols"
    });

    newPerson.address.street2 = 'PO Box 7';

    console.log(newPerson.address);

const english = {
    greet: 'Hello!'
}
const spanish = {
    greet: 'Hola!'
}