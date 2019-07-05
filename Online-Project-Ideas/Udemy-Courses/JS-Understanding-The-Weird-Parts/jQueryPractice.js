class Photograph {
    constructor(src, desc) {
        this.src = src;
        this.alt = desc;
    }
    renderPhoto(target) {
        let img = document.createElement('img');
            img.src = this.src;
            img.alt = this.desc;
        target.append(img)
    }
}
let image1 = new Photograph('img/logo.png', 'My logo page')
image1.renderPhoto(document.body);