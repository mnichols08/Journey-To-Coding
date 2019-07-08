(function(global){
const keys = document.querySelectorAll('.key');
class DrumKit {
    makeNoise(audio,key){
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
    }
    removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
    }
}
const drumKit = new DrumKit();
class Sound extends DrumKit{
    constructor(){
        super()
    }
    keyNoise(keypress) {
    const audio = document.querySelector(`audio[data-key="${keypress.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keypress.keyCode}"`);
    drumKit.makeNoise(audio,key)
    }
    clickNoise(click) {    
    click = click.path[1].dataset.key;
    const audio = document.querySelector(`audio[data-key="${click}"]`);
    const key = document.querySelector(`button.key[data-key="${click}"]`);
    drumKit.makeNoise(audio,key);
}
}
const sound = new Sound();
global.addEventListener('keydown', sound.keyNoise);
keys.forEach(function(key) {
    key.addEventListener('click',sound.clickNoise);
    key.addEventListener('contextmenu',function(e){
      e.preventDefault();
    });
    key.addEventListener('transitionend',drumKit.removeTransition);
});
})(window)