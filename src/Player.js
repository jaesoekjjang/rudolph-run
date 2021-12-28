import Character from './Character';

export default class Player extends Character {
  constructor(config) {
    super(config);
  }

  update(config) {
    this.direction = config.direction;
    if (this.isPlayer) {
      {
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
    if (this.x < 0) {
      this.x = 0;
      this.vx = 0;
    }
  }

  cry() {
    this.sprite.updateCurrentAnimation('cry');
  }

  stopBehavior() {
    this.isPlayer = false;
    this.vx = 0;
    this.vy = 0;
    this.y = 400;
  }
}
