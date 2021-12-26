export default class Background {
  constructor(src) {
    this.image = new Image();
    this.isLoaded = false;
    this.image.addEventListener('load', () => {
      this.isLoaded = true;
    });
    this.image.src = src;
  }

  draw(config) {
    if (this.isLoaded) {
      const [x] = config.camera.position;
      if (x <= 400) {
        config.ctx.drawImage(this.image, 0, 0, 3000, 1500, 0, 0, 1600, 500);
        config.ctx.drawImage(this.image, 0, 0, 3000, 1500, 1600, 0, 1600, 500);
        config.ctx.drawImage(this.image, 0, 0, 3000, 1500, 3200, 0, 1600, 500);
      } else {
        config.ctx.drawImage(this.image, 0, 0, 3000, 1500, 400 - x, 0, 1600, 500);
        config.ctx.drawImage(this.image, 0, 0, 3000, 1500, 1600 + 400 - x, 0, 1600, 500);
        config.ctx.drawImage(this.image, 0, 0, 3000, 1500, 3200 + 400 - x, 0, 1600, 500);
      }
    }
  }
}
