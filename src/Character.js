import GameObject from './GameObject';
import Sprite from './Sprite';

export default class Character extends GameObject {
  constructor(config) {
    super(config.x, config.y, config.width, config.height);
    this.isPlayer = config.isPlayer || false;
    this.acc = 0.3;
    this.v = 0;
    this.jumpingTime = 0;
    this.maxSpeed = 15;
    this.direction = config.direction || 'right';
    this.zIndex = config.zIndex || 1;

    this.currentAnimation = 'idle';
    this.sprite = new Sprite({
      playerInfo: this,
      src1: config.src1,
      src2: config.src2 || null,
      leftAnimations: config.leftAnimations,
      rightAnimations: config.rightAnimations,
    });
  }

  update(config) {
    this.direction = config.direction;
    if (this.direction == 'left' || this.direction == 'right') {
      this.lastDirection = this.direction;
      this.sprite.updateCurrentAnimation('run');
    } else if (this.direction == 'up') {
      this.sprite.updateCurrentAnimation('jump');
    } else {
      this.sprite.updateCurrentAnimation('idle');
    }
    this.updatePosition();
  }

  updatePosition() {
    if (this.sprite.currentAnimation == 'idle' && Math.abs(this.v) > 0) {
      this.v /= 1.05;
    }

    if (this.direction == 'left') {
      this.sprite.setCurrentImage('left');
      if (this.v > -this.maxSpeed) this.v -= this.acc;
    } else if (this.direction == 'right') {
      this.sprite.setCurrentImage('right');
      if (this.v < this.maxSpeed) this.v += this.acc;
    }
    this.x += this.v;
  }
}
