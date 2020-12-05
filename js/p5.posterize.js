const gallery = require("../classes/gallery");
const observer = require("../classes/observer");

const s = p => {
  let x = 100;
  let y = 100;
  let width;
  let height;
  let factor = 0.40;

  p.preload = function () {}

  p.setup = function () {
    width = window.innerWidth * factor;
    height = window.innerHeight
    let canvas = p.createCanvas(width, height);
    canvas.parent(document.getElementById('canvasContainerPosterize'));
  };

  p.draw = function () {
    p.background(000);


    try {
      if (gallery.p5preloadImagesArray.length !== 0 && gallery.config.posterize) {
        // Placing image on screen and keeping in proportion
        let image = gallery.p5preloadImagesArray[gallery.currentIndexPreload];
        if (image !== undefined && image !== null) {

          // Placing image on screen and keeping in proportion
          var scale = image.width / image.height;
          p.tint(255, 255);
          p.imageMode(p.CENTER);
          p.image(image, 0.5 * width, 0.5 * height, scale * width, scale * image.height * width / image.width); // to fit width
          if (gallery.config.gray) {
            p.filter(p.GRAY);
          }
          p.filter(p.POSTERIZE, gallery.config.levels);
          p.tint(255, 50);
          p.imageMode(p.CENTER);
          p.image(image, 0.5 * width, 0.5 * height, scale * width, scale * image.height * width / image.width); // to fit width
          if (gallery.config.blur) {
            p.filter(p.BLUR, 1.5);
          }
        }
      }
    } catch (error) {

    }

  };

  p.windowResized = function () {
    width = p.windowWidth * factor;
    height = p.windowHeight;
    p.resizeCanvas(width, height);
  }
};


module.exports = s;