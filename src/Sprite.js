export default class Sprite {
  constructor(config) {
    this.info = config.info;

    this.image1 = new Image();
    this.image1.src = config.src1;
    this.image1Loaded = false;
    this.image1.onload = () => {
      this.image1Loaded = true;
    };
    this.leftAnimations = config.leftAnimations;

    if (config.src2) {
      this.image2 = new Image();
      this.image2.src = config.src2;
      this.image2Loaded = false;
      this.image2.onload = () => {
        this.image2Loaded = true;
      };
    }

    this.rightAnimations = config.rightAnimations;
    this.currentImage = this.image1;

    this.animationFrameLimit = 7;
    this.frameProgress = this.animationFrameLimit;

    this.currentAnimation = this.info.currentAnimation || 'idle';
    this.currentAnimationFrame = 0;
  }

  get frame() {
    if (this.info.lastDirection == 'right') {
      return this.rightAnimations[this.currentAnimation][this.currentAnimationFrame];
    } else {
      return this.leftAnimations[this.currentAnimation][this.currentAnimationFrame];
    }
  }

  setCurrentImage(direction) {
    if (direction == 'right') {
      this.currentImage = this.image2;
    } else {
      this.currentImage = this.image1;
    }
  }

  updateAnimationFrame() {
    if (this.frameProgress > 0) {
      this.frameProgress -= 1;
      return;
    }

    this.frameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame == undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  updateCurrentAnimation(currentAnimation) {
    if (this.currentAnimation !== currentAnimation) {
      this.currentAnimation = currentAnimation;
      this.currentAnimationFrame = 0;
      this.frameProgress = this.animationFrameLimit;
    }
  }

  draw({ ctx, camera }) {
    if (this.image1Loaded || this.image2Loaded) {
      const [x, y] = this.frame;
      if (this.info.x <= 400) {
        ctx.drawImage(
          this.currentImage,
          x,
          y,
          this.info.width,
          this.info.height,
          this.info.x,
          this.info.y,
          this.info.width,
          this.info.height,
        );
      } else {
        ctx.drawImage(
          this.currentImage,
          x,
          y,
          this.info.width,
          this.info.height,
          400 + this.info.x - camera.x * this.info.zIndex,
          this.info.y,
          this.info.width,
          this.info.height,
        );
      }
      this.updateAnimationFrame();
    }
  }
}
