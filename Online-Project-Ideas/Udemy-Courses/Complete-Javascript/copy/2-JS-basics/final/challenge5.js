/*
const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
const arrSum = arr => arr.reduce((a,b) => a + b, 0);
function getPrompt(val,valu) {
var getValu = prompt(val,valu);
return getValu;
}
*/
var john = {
    fullName: getPrompt("What is your name?","John Smith"),
    bills: [], //[124, 48, 268, 180, 42],
    getBill: function() {
      var getBillsQty = getPrompt("How many bills do you have, " + this.fullName + "?", "5");
          getBillsQty = parseInt(getBillsQty);
          if (getBillsQty >= 0) {
            for (let i = 1; i <= getBillsQty; i++) {
              var getBill = getPrompt("How much was bill number " + i + "?","124");
              this.bills.push(getBill);
            }
          }
        this.tips = [];
        this.finalValues = [];


            // Determine tipping rules in order to determine percentage
            var inc1 = getPrompt("What is the highest percentage you would pay for a tip?","20"),
                lowAmt1 = getPrompt("What would the lowest amount be you would willing to pay that tip to?"),
                hiAmt1 = getPrompt("What would the highest amount you would be willing to pay that tip to?", "50"),
                inc2 = getPrompt("What is the highest percentage you would pay for a tip?","15"),
                lowAmt2 = getPrompt("What would the lowest amount be you would willing to pay that tip to?","50"),
                hiAmt2 = getPrompt("What would the highest amount you would be willing to pay that tip to?", "200"),
                inc3 = getPrompt("What is the next lowest percentage you would pay for a tip?","10"),
                lowAmt3 = getPrompt("What would the lowest amount be you would willing to pay that tip to?","200"),
                hiAmt3 = getPrompt("What would the highest amount you would be willing to pay that tip to?");
                inc1 = parseInt(inc1);
                inc2 = parseInt(inc2);
                inc3 = parseInt(inc3);
                lowAmt1 = parseInt(lowAmt1);
                lowAmt2 = parseInt(lowAmt2);
                lowAmt3 = parseInt(lowAmt3);
                hiAmt1 = parseInt(hiAmt1);
                hiAmt2 = parseInt(hiAmt2);
                hiAmt3 = parseInt(hiAmt3);
        for (var i = 0; i < this.bills.length; i++) {
            var bill = this.bills[i];
            if (bill < lowAmt1) {
                percentage = inc1 / 100;
            } else if (bill >= lowAmt2 && bill < hiAmt2) {
                percentage = inc2 / 100;
            } else {
                percentage = inc3 / 100;
            }

            // Add results to the corresponing arrays
            this.tips[i] = bill * percentage;
            this.finalValues[i] = bill + bill * percentage;
        }
    }
}

var mark = {
    fullName: getPrompt("What is your friend's name?","Mark Miller"), //'Mark Miller',
    bills: [], // [77, 475, 110, 45],
    getBill: function() {
      var getBillsQty = getPrompt("How many bills does he/she have, " + this.fullName + "?", "4");
          getBillsQty = parseInt(getBillsQty);
          if (getBillsQty >= 0) {
            for (let i = 1; i <= getBillsQty; i++) {
              var getBill = getPrompt("How much was bill number " + i + "?","77");
              this.bills.push(getBill);
            }
          }
        this.tips = [];
        this.finalValues = [];


            // Determine percentage based on tipping rules
            var inc1 = getPrompt("What is the highest percentage he/she would pay for a tip?","25"),
                lowAmt1 = getPrompt("What would the lowest amount be he/she would willing to pay that tip to?", "300"),
                hiAmt1 = getPrompt("What would the highest amount he/she would be willing to pay that tip to?"),
                inc2 = getPrompt("What is the next highest percentage he/she would pay for a tip?","20"),
                lowAmt2 = getPrompt("What would the lowest amount be he/she would willing to pay that tip to?","50"),
                hiAmt2 = getPrompt("What would the highest amount he/she would be willing to pay that tip to?", "200"),
                inc3 = getPrompt("What is the next lowest percentage he/she would pay for a tip?","10"),
                lowAmt3 = getPrompt("What would the lowest amount be he/she would willing to pay that tip to?","200"),
                hiAmt3 = getPrompt("What would the highest amount he/she would be willing to pay that tip to?");
                inc1 = parseInt(inc1);
                inc2 = parseInt(inc2);
                inc3 = parseInt(inc3);
                lowAmt1 = parseInt(lowAmt1);
                lowAmt2 = parseInt(lowAmt2);
                lowAmt3 = parseInt(lowAmt3);
                hiAmt1 = parseInt(hiAmt1);
                hiAmt2 = parseInt(hiAmt2);
                hiAmt3 = parseInt(hiAmt3);
        for (var i = 0; i < this.bills.length; i++) {
            var bill = this.bills[i];
            if (bill >= lowAmt1 && bill <= hiAmt1 || bill >= lowAmt1 && hiAmt2 === 0 || bill <= hiAmt1 && lowAmt1 === 0) {
                percentage = inc1 / 100;
            } else if (bill >= lowAmt2 && bill <= hiAmt2) {
                percentage = inc2 / 100;
            } else {
                percentage = inc3 / 100;
            }

            // Add results to the corresponing arrays
            this.tips[i] = bill * percentage;
            this.finalValues[i] = bill + bill * percentage;
        }
    }
}

// Do the calculations
john.getBill();
mark.getBill();

john.average = arrAvg(john.tips);
mark.average = arrAvg(mark.tips);

if (john.average > mark.average) {
    console.log(john.fullName + '\'s family pays higher tips, with an average of $' + john.average);
} else if (mark.average > john.average) {
    console.log(mark.fullName + '\'s family pays higher tips, with an average of $' + mark.average);
}
