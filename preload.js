// All of the Node.js APIs are available in the preload process.
const gallery = require("./classes/gallery");
const galleryTimer = require("./classes/timer");
const sketchP5 = require("./js/p5.normal");
const sketchP5Posterize = require("./js/p5.posterize");
const MainVue = require("./js/vue.main");

// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {

  galleryTimer.setTimer(new Timer());
  MainVue(window.Vue);


  // let canvasNormal = null;
  // let canvasPosterize = null;

    
  //   if( canvasNormal === null)
  //   {
  //     canvasNormal =  new p5(sketchP5);
  //     canvasPosterize =  new p5(sketchP5Posterize);
  //   }

  // window.document.getElementById('pathFolder').addEventListener('change', e => {
    
  //   gallery.loadImages(Array.from(e.target.files));
  
    
  //   gallery.start();
  //   galleryTimer.start(10);

  // });

  /**
   * Timers Buttons Events
   */
  // const previousImage = document.getElementById('previousImage');
  // const pauseImage = document.getElementById('pauseImage');
  // const nextImage = document.getElementById('nextImage');

  // previousImage.addEventListener('click', event => {
  //   gallery.previous();
  // });
  // pauseImage.addEventListener('click', event => {
  //   galleryTimer.pause();
  // });
  // nextImage.addEventListener('click', event => {
  //   gallery.next();
  // });


  // const posterize = document.getElementById('posterize');
  // const gray = document.getElementById('gray');
  // const levels = document.getElementById('levels');
  // const blur = document.getElementById('blur');
  

  // posterize.addEventListener('change', val => {
  //   if(posterize.checked){
  //     document.getElementById('canvasContainerPosterize').style.display = 'flex';
  //   }else{
  //     document.getElementById('canvasContainerPosterize').style.display = 'none';
  //   }
  //   gallery.config.posterize = posterize.checked;
  // });
  // gray.addEventListener('change', val => {
  //   gallery.config.gray = gray.checked;
  // });
  // blur.addEventListener('change', val => {
  //   gallery.config.blur = blur.checked;
  // });
  // levels.addEventListener('change', val => {
  //   gallery.config.levels = levels.value >= 2 ? levels.value : 2;
  // });
  
});

