/* My first library */
(function(global){
    global.qS = selector => document.querySelector(selector) // shortcut for using query Selector
    global.qSA = selector => document.querySelector(selector) // shortcut for using query Selector All
    // Sets up some private variables to store logs, greetings, and supported languages
    let logMessages = { 
        en: `Logged In`,
        es: `Inicio Sesion`
    };
    let greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    let formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };
    let supportedLangs = ['en', 'es'];
    // A base prototype object of Init is created to house the functions inner variables
    class Init{
        constructor(firstName, lastName, language){
            this.firstName = firstName || '';
            this.lastName = lastName || '';
            this.language = language || '';
            this.validate(); // makes sure a language was set.
        }
        fullName() {
            return `${this.firstName} ${this.lastName}`;
        }
    }
    // Another prototype which takes in the variables above to return methods that rely on them
    class Greetr extends Init{
        constructor(firstName, lastName, language, logMessages, greetings, formalGreetings) {
            super(firstName, lastName, language)
        }
        validate() {
            if (!supportedLangs.includes(this.language)) throw `Error: Invalid Language`; 
        }
        greeting() {
            return` ${greetings[this.language]} ${this.firstName}!`
        }
        formalGreeting() {
            return `${formalGreetings[this.language]} ${this.firstName}`;
        }
        greet(formal) {
            let msg; formal ? msg = this.formalGreeting() : msg = this.greeting();
            if (console) console.log(msg); return this
        }
        log() {
            if (console) console.log(`${logMessages[this.language]} : ${this.fullName()}`);
            return this
        }
        setName(name){
            console.log('test')
            name === undefined || name === '' ? name : this.firstName = name
            return this
        }
        setLang(lang) {
            this.language = lang;
            this.validate();
            return this;
        }
        updateHTML(selector,formal){
            try{
            let msg; formal ? msg = this.formalGreeting() : msg = this.greeting();
            document.getElementById(selector).innerHTML = msg;
            return this
            }
            catch(err){console.error('Please choose a selector or install jQuery - Throwing',err)};
        }      
    }
    Greetr.init = (x,y,z) => new Greetr(x,y,z)
    global.Greetr = global.G$ = Greetr.init;
})(window)