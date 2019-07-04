function a() {
    console.log('a(): ',this);
    this.newVariable = 'hello';
}

var b = function() {
    console.log('b()',this);   
}

a();

console.log('newVariable',newVariable); //puts newVariable in global scope

b();

var c = {
    name: 'The c object',
    log: function() {
        var self = this;
        name: 'The c object',
        self.name = 'Updated c object';
        console.log('c()',self);
        const setname = (newname) => self.name = newname;
        setname('Updated again! The c object');  
    }
}

var d = {
    name: 'The d object',
    log: () => {
        this.name = 'Updated d object';
        
        console.log('d()',this);
    }
}


c.log();
d.log();