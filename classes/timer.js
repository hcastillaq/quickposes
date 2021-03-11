const gallery = require("./gallery");
const observer = require("./observer");

class GalleryTimer {
  timer = null;
  config = {};
  seconds = 10;

  constructor() {
    if (GalleryTimer.instance) return GalleryTimer.instance;
    GalleryTimer.instance = this;
    return this;
  }

  setTimer(timer) {
    this.timer = timer;

    observer.subscribe(gallery.emits.CHANGE_IMAGE, () => {
      if (this.timer.isRunning()) {
        document.getElementById("counterTimer").innerText = this.seconds;
        this.start(this.seconds);
      }
    });

    observer.subscribe(gallery.emits.FINISH_SESSION, () => {
      this.timer.stop();
      this.finish = true;
    });
    this.timer.addEventListener("secondsUpdated", function (e) {
      console.log(timer.getTimeValues().toString());
    });
    this.timer.addEventListener("targetAchieved", () => {
      setTimeout(() => {
        document.getElementById("counterTimer").innerText = this.seconds;
        gallery.next();
        this.start(this.seconds);
      }, 1000);
    });
  }

  start(seconds = this.seconds) {
    if (gallery.config.session) {
      this.seconds = seconds;
      if (this.timer.isRunning()) {
        this.timer.stop();
      }
      this.timer.start({
        precision: "seconds",
        startValues: { seconds: 0 },
        target: { seconds: parseInt(this.seconds) },
        callback: (e) => {
          document.getElementById("counterTimer").innerText =
            seconds - this.timer.getTotalTimeValues().seconds;
        },
      });
    }
  }

  pause() {
    if (this.timer.isRunning()) {
      this.timer.pause();
      document.getElementById("pauseImage").value = "resume";
    } else {
      this.resume();
    }
  }

  resume() {
    this.timer.start();
    document.getElementById("pauseImage").value = "pause";
  }
}

module.exports = new GalleryTimer();
