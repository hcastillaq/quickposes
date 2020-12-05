const observer = require("./observer");

let _instance = null;

class Gallery {

    emits = {
        CHANGE_IMAGE: 'CHANGE_IMAGE',
        PRELOAD_IMAGES: 'PRELOAD_IMAGES',
        FINISH_SESSION: 'FINISH_SESSION'
    }
    
    maxPreload = 9;
    reloadPreload = 4;
    preloadCounter = 0;
    validTypes = ['jpg', 'png', 'jpeg'];
    currentImage = null;
    currentIndexPreload = 0;

    originalImages = [];
    images = [];

    preloadImagesArray = [];
    p5preloadImagesArray = [];
    
    maxImages = 0;

    config = {
        session: false,
        seconds: 10,
        posterize: false,
        gray: false,
        status: 'inactive',
        levels:2,
        blur: false
    }

    constructor(){
        if(_instance === null) _instance = this;
        return _instance; 
    }

    get currentIndexPreload(){
        return this.currentIndexPreload;
    }

    get originalImages()
    {
        return this.originalImages;
    }

    get images()
    {
        return this.images;
    }

    get currentImage(){
        return this.currentImage;
    }

    set currentImage(image){
        this.currentImage = image;
    }

     /**
     * @param { Array} Array - Array of Files {name:'name', path:'path'}
     */
    loadImages(ArrayFiles)
    {
        this.images = ArrayFiles.filter( e => this.validateImagesTypes(e));
        this.originalImages = this.images;
        this.maxImages = this.images.length -1;
    }

    
    /**
     * @param {Object} File - {name:'name', path:'path'}
     * @return {Boolean}
     */
    validateImagesTypes(File){
        let valid = false;
        for (const type of this.validTypes) {
            if(String(File.path).toLocaleLowerCase().includes(type)) valid = true; break;
        }
        return valid;
    }
    
    calculateMaxPreload(){
        if(this.maxImages < this.maxPreload){
            this.maxPreload = this.maxImages;
        }
    }

    preloadImages(){
        const auxArray = [];
        for(let i = 0; i <= this.maxPreload; i++){
            const index = Math.floor(Math.random() * (this.images.length - 1));
            auxArray.push(this.images[index]);
        }
        this.preloadImagesArray.concat(auxArray);
        observer.notify(this.emits.PRELOAD_IMAGES, auxArray);
    }

    start(){
        this.calculateMaxPreload();
        this.preloadImages();
        this.currentIndexPreload = 0;
        this.currentImage = this.preloadImagesArray[this.currentIndexPreload];
        this.config.session = true;
    }


   
    next(){
        if(this.currentIndexPreload !== this.maxImages){
            if(this.preloadCounter === this.reloadPreload){
                this.preloadImages();
                this.preloadCounter = 0;  
            }else{
                this.preloadCounter += 1;
            }
            this.currentIndexPreload += 1;
                this.currentImage = this.preloadImagesArray[this.currentIndexPreload];
                observer.notify(this.emits.CHANGE_IMAGE);
        }else{
            this.finishSession();
        }
    }
    
    previous(){
        if(this.currentIndexPreload >= 0){
            if(this.currentIndexPreload !==0) this.currentIndexPreload -= 1;
            this.preloadCounter -= 1;
            this.currentImage = this.preloadImagesArray[this.currentIndexPreload];
        }
        observer.notify(this.emits.CHANGE_IMAGE);
    }


    finishSession()
    {
        this.config.session = false;
        this.currentIndexPreload = 0;
        this.preloadCounter = 0;
        this.reloadImagesArray = [];
        this.p5preloadImagesArray = [];
        this.currentImage = [];
        this.config =  {
            session: false,
            seconds: 10,
            posterize: false,
            gray: false,
            status: 'inactive',
            levels:2,
            blur: false
        }
        observer.notify(this.emits.FINISH_SESSION);
    }
}

module.exports = new Gallery();