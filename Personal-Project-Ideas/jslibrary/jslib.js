/* This library should be able to create a html website with functions */
(function(global){
    const settings = {
        file: {
            author: 'Mikey Nichols'
        }        
    }

    class Build{
        constructor(element,_class,id){
            this.element = document.createElement(element);
            this.element.classList = _class
            this.element.innerHTML = id;
            return this;
        }
        append(anchor){
            anchor === undefined ? document.body.prepend(this.element) : anchor.append(this.element);
            return this;
        }
    }

    class Gallery extends Build {
        constructor(element, _class, id){
            super(element,_class,id);
            this.parentNode = document.createElement('div');
            this.parentNode.className = _class;
            document.body.append(this.parentNode);
            return this
        }
        addPhoto(src,alt) {
            this.element = document.createElement('img');
            this.parentNode.prepend(this.element);
            this.element.src = src;
            this.element.alt = alt;
            return this
        }
        
    }

    Build.init = (element,_class,id) => new Gallery(element,_class,id)
    global.mN = global.BuildHTML = Gallery.init;
})(window)