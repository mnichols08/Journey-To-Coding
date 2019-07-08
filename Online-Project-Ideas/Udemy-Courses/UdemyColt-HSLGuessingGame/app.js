(function(){
    let squares = document.querySelectorAll(`.game div`);
    let pickedColor;
    let colorDisplay = document.getElementById(`colorDisplay`);
    const messageDisplay = document.getElementById(`message`);
    const resetBtn = document.getElementById(`reset`);
    const easyBtn = document.getElementById(`easyBtn`); 
    const hardBtn = document.getElementById(`hardBtn`);
        class Game{
            constructor(){
                this.winner;
                this.winningColor;
                this.colors = [];
                }
                initialize(y = 6){
                Mode.prototype.newGame();
                this.winner = false;
                this.colors = this.generateRandomColors(y);
                resetBtn.textContent = `New Colors`;		
                pickedColor = this.pickColor();
                colorDisplay.textContent = pickedColor;
                squares.forEach((square, i) => {
                    if (this.colors[i]){
                        square.style.background = this.colors[i];	
                    } else {
                        square.style.display = `none`;
                    }
                })
            }
            pickColor() {
                let random = Math.floor(Math.random() * this.colors.length);
                this.winningColor = random;
                return this.colors[random];
            }
            randomColor() {
                    let deg = Math.floor(Math.random() * 361);
                    let hue = Math.floor(Math.random() * 361);
                    let sat = Math.floor(Math.random() * 101);
                    let light = Math.floor(Math.random() * (55 - 45 + 1) + 45);
                    let hue2 = Math.floor(Math.random() * 361);
                    let sat2 = Math.floor(Math.random() * 101);
                    let lite = Math.floor(Math.random() * (55 - 45 + 1) + 45);
                    return `Linear-Gradient(${deg}deg, HSL(${hue}, ${sat}%, ${light}%),HSL(${hue2}, ${sat2}%, ${lite}%))`
                }
            generateRandomColors(num) {
                var arr = [];
                for(let i = 0; i < num; i++) {
                    arr.push(this.randomColor());
                }	
                return arr;
                }
            changeColor(color) {
                squares.forEach(function(square){	
                 square.style.background = color;
                })
            }
        }
        const game = new Game();
        class Mode extends Game{
            constructor(){
                super();
            }
            newGame(){
                    squares.forEach(function(square, i,){
                        square.style.background = game.colors[i];
                        square.style.boxShadow = `0 0 2rem ${game.colors[i]}`
                        square.addEventListener(`click`, function() { 
                            let clickedColor = this.style.background;
                            if(this.dataset.color == game.winningColor) {
                                game.changeColor(clickedColor);
                                game.winner = true;
                                messageDisplay.textContent = `Correct!`;
                                resetBtn.textContent = `Play Again`
                                document.querySelector(`h1`).style = `display: inline-block; background: ${clickedColor};-webkit-background-clip: text;`
                                square.style.boxShadow = `0 0 2rem ${clickedColor}`
                            } else if (game.winner === false){
                                this.style.background = `transparent`;
                                messageDisplay.textContent = `Try Again`;
                            }
                        }
                )});
            }
            easy() {
                easyBtn.classList.add(`selected`);
                if(hardBtn.classList.contains(`selected`)){
                    game.initialize(3);
                }
                hardBtn.classList.remove(`selected`);
            }
            hard() {
                hardBtn.classList.add(`selected`);
                if(easyBtn.classList.contains(`selected`)) game.initialize(6);
                squares.forEach(square => square.style.display = `block`);
                easyBtn.classList.remove(`selected`);	
            }
        }
        const mode = new Mode();
    
        game.initialize()
        resetBtn.addEventListener(`click`, () => game.initialize(easyBtn.classList.contains(`selected`) ? 3 : 6));
        easyBtn.addEventListener(`click`, () => mode.easy());
        hardBtn.addEventListener(`click`, () => mode.hard());
    }())   