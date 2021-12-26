export default class Sprite {
  constructor(config) {
    this.playerInfo = config.playerInfo;

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

    this.currentAnimation = this.playerInfo.currentAnimation || 'idle';
    this.currentAnimationFrame = 0;
  }

  get frame() {
    if (this.playerInfo.lastDirection == 'right') {
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
      if (this.playerInfo.x <= 400) {
        ctx.drawImage(
          this.currentImage,
          x,
          y,
          this.playerInfo.width,
          this.playerInfo.height,
          this.playerInfo.x,
          this.playerInfo.y,
          this.playerInfo.width,
          this.playerInfo.height,
        );
      } else {
        ctx.drawImage(
          this.currentImage,
          x,
          y,
          this.playerInfo.width,
          this.playerInfo.height,
          400 + this.playerInfo.x - camera.x * this.playerInfo.zIndex,
          this.playerInfo.y,
          this.playerInfo.width,
          this.playerInfo.height,
        );
      }
      this.updateAnimationFrame();
    }
  }
}
