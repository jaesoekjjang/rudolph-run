import GameObject from './GameObject';
import Sprite from './Sprite';

export default class Character extends GameObject {
  constructor(config) {
    super(config);
    this.isPlayer = config.isPlayer || false;
    this.acc = config.acc || 0;
    this.vx = 0;
    this.vy = 0;
    this.isJumping = false;
    this.maxSpeed = config.maxSpeed || 7;
    this.currentAnimation = 'idle';

    this.sprite = new Sprite({
      info: this,
      src1: config.src1,
      src2: config.src2 || null,
      direction: config.direction,
      leftAnimations: config.leftAnimations,
      rightAnimations: config.rightAnimations,
    });
  }

  draw(config) {
    this.sprite.draw(config);
  }
}
