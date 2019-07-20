(function(global){
    const keys = document.querySelectorAll('.key');
    class DrumKit {
        constructor() {
            this.memory = [];
        }
        makeNoise(audio,key){
        if(!audio) return;
        this.memory.push(audio);
        audio.currentTime = 0;
        audio.play();
        key.classList.add('playing');
        }
        removeTransition(e) {
        if (e.propertyName !== 'transform') return;
        this.classList.remove('playing');
        }
        playBack(){
            const audio = this.memory; 
            let i = 0;
                setInterval(() => {
                    if (i < audio.length ){    
                        audio[i].play();
                        document.querySelector(`.key[data-key='${audio[i].dataset.key}']`).classList.add('playing'); // Adds playing class to the key being played back
                        i++;
                    };
                }, 375) // Replays audio from memory every 375ms 
                document.getElementById('replay').classList.add('playing');
            }  
    }
    const drumKit = new DrumKit();
    class Sound extends DrumKit{
        constructor(){
            super()
        }
        keyNoise(keypress) {
        if (keypress.keyCode === 13) {drumKit.playBack()};
        const audio = document.querySelector(`audio[data-key="${keypress.keyCode}"]`);
        const key = document.querySelector(`.key[data-key="${keypress.keyCode}"`);
        drumKit.makeNoise(audio,key)
        }
        clickNoise(click) {    
        click = click.path[1].dataset.key;
        const audio = document.querySelector(`audio[data-key="${click}"]`);
        const key = document.querySelector(`button.key[data-key="${click}"`);
        drumKit.makeNoise(audio,key);
    }
    }
    const sound = new Sound()
    
    global.addEventListener('keydown', sound.keyNoise);
    keys.forEach(function(key) {
        key.addEventListener('click',sound.clickNoise);
        key.addEventListener('contextmenu',function(e){
          e.preventDefault();
        });
        key.addEventListener('transitionend',drumKit.removeTransition);
    });
    document.querySelector('#replay').addEventListener('click', sound.playBack)
    })(window)