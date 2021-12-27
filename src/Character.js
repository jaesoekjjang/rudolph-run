import GameObject from './GameObject';
import Sprite from './Sprite';

export default class Character extends GameObject {
  constructor(config) {
    super(config.x, config.y, config.width, config.height);
    this.isPlayer = config.isPlayer || false;
    this.acc = 0.15;
    this.vx = 0;
    this.vy = 0;
    this.isJumping = false;
    this.maxSpeed = 7;
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
    if (!this.isPlayer) {
      this.sprite.updateCurrentAnimation('idle');
    } else {
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
  }

  updatePosition() {
    if (this.sprite.currentAnimation == 'idle' && Math.abs(this.vx) > 0) {
      this.vx /= 1.05;
    }

    if (this.direction == 'up') {
      if (!this.isJumping) {
        this.vy -= 8;
        this.y += this.vy;
        this.isJumping = true;
      }
    }
    if (this.y < 400) {
      this.vy += 0.5;
      this.y += this.vy;
    } else {
      this.isJumping = false;
      this.y = 400;
    }

    if (this.direction == 'left') {
      this.sprite.setCurrentImage('left');
      if (this.vx > -this.maxSpeed) this.vx -= this.acc;
    } else if (this.direction == 'right') {
      this.sprite.setCurrentImage('right');
      if (this.vx < this.maxSpeed) this.vx += this.acc;
    }
    this.x += this.vx;
  }

  stopBehavior() {
    this.isPlayer = false;
    this.vx = 0;
    this.vy = 0;
    this.y = 400;
  }
}
