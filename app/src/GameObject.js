import Sprite from './Sprite';

export default class GameObject {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;

    this.frameX = config.frameX;
    this.frameY = config.frameY;
    this.frameWidth = config.frameWidth;
    this.frameHeight = config.frameHeight;

    this.zIndex = config.zIndex || 1;
    this.direction = config.direction || 'right';

    this.imageLoaded = false;
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.imageLoaded = true;
    };
  }

  draw({ ctx, camera }) {
    if (this.imageLoaded) {
      if (camera.x < 400) {
        ctx.drawImage(
          this.image,
          this.frameX,
          this.frameY,
          this.frameWidth,
          this.frameHeight,
          this.x,
          this.y,
          this.width,
          this.height,
        );
      } else {
        ctx.drawImage(
          this.image,
          this.frameX,
          this.frameY,
          this.frameWidth,
          this.frameHeight,
          400 + this.x - camera.x * this.zIndex,
          this.y,
          this.width,
          this.height,
        );
      }
    }
  }

  update() {}

  get position() {
    return [this.x, this.y];
  }
}
