This is a journey to better my coding skills. I will be reading books like JavaScript for Kids by Kyle Morgan, the You Don't Know JavaScript Series by Kyle Simpson, Eloquent JavaScript by Marijn Haverbeke and more. I will also be completing coding challenges through W3 Schools, FreeCodeCamp, and others. This is primarily a repository made for me, but since it is public, maybe it will inspire someone else too!	
class Time {
  constructor() {
    let now = new Date()
    let hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours() 
    let mins = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    let secs = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()    
    this.time = `${hours}:${mins}:${secs}`
    } 
}
class Log {
  constructor() {
    this.clockedIn = false
    this.logIn = []
    this.logOut = []
  }
  clockIn() {
    if (this.clockedIn === false) {
      this.clockedIn = true
      this.logIn.push(new Time().time)
      return `Clocked in at ${this.logIn[this.logIn.length - 1]}`
  } else return 'Already clocked in at ' + this.logIn[this.logIn.length - 1]
  }
   clockOut() {
    if (this.clockedIn === true) {
      this.clockedIn = false
      this.logOut.push(new Time().time)
      return `Clocked in at ${this.logOut[this.logOut.length - 1]}`
  } else return 'Already clocked out at ' + this.logOut[this.logOut.length - 1]
  }
}

let log = new Log()
log.clockIn()
console.log(log.clockIn())
log.clockOut()
console.log(log.clockOut())
console.log(log.clockIn())
console.log(log.clockOut())
