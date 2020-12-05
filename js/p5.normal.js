const gallery = require("../classes/gallery");
const observer = require("../classes/observer");

const s = p => {
  let x = 100;
  let y = 100;
  let width;
  let height;
  let factor = 0.40;
  p.preload = function () {

    //Subscriptions
    observer.subscribe(gallery.emits.PRELOAD_IMAGES, (images) => {
      images.forEach(element => {
        gallery.p5preloadImagesArray.push(p.loadImage(element.path))
      });
    });
  }

  p.setup = function () {
    width = window.innerWidth * factor;
    height = window.innerHeight
    let canvas = p.createCanvas(width, height);
    canvas.parent(document.getElementById('canvasContainer'));
  };

  p.draw = function () {
    try {
      p.background(000);

      if (gallery.p5preloadImagesArray.length !== 0) {
        // Placing image on screen and keeping in proportion
        let image = gallery.p5preloadImagesArray[gallery.currentIndexPreload];
        if (image !== undefined && image !== null) {
          let scale = (image.width / image.height);
          p.imageMode(p.CENTER);
          p.image(image, 0.5 * width, 0.5 * height, scale * width, scale * image.height * width / image.width); // to fit width
        }
      }
    } catch (error) {
      gallery.next();
    }
  };

  p.windowResized = function () {
    width = p.windowWidth * factor;
    height = p.windowHeight;
    p.resizeCanvas(width, height);
  }
};


module.exports = s;