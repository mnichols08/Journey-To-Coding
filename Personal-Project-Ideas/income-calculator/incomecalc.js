(function(global){

    // Goal: Create a tool to gather the current date and time which allows the user to clock in and out, but it updates the amount earned in real time based upon a wage that is configurable with a settings button.

    class Time {
        constructor() {
            this.now = new Date();
            this.date = `${this.now.getFullYear()} - ${this.now.getMonth() + 1} - ${this.now.getDate()}`;
            this.time = `${this.now.getHours()} : ${this.now.getMinutes()} : ${this.now.getSeconds()}`;
        }

        setTime() {
            document.querySelector('.time').innerHTML = this.time;
        }

        storeTime() {
            this.clockedInAt = this.time
        }
    }
    
    class Data {
        constructor() {
            this.data = [];
            this.wage = 12.50;
        }
    }

    class Calculator extends Data {
        constructor(dt,ci,co) {
            super()
            this.date = dt;
            this.clockin = ci;
            this.clockout = co;
        }


    }

    const timeIn = g => new Time().time
    const clockOut = () => alert('Clock Out')

    const collectTimes = async function () {
        let testPromise = new Promise(() => prompt('?'))
        console.log(testPromise)
    }

    collectTimes()
    document.querySelector('#out').addEventListener('click', collectTimes)
    // document.querySelector('#in').addEventListener('click', clockOut)
    

    // const setTime = () => new Time().setTime()
    // setInterval(setTime, 1000)

    // let loggedTime = data()


    // console.log(loggedTime)

})()
