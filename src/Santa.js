import Character from './Character';
import emojiImage from '../image/exclamation.png';

export default class Santa extends Character {
  constructor(config) {
    super({
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height,
      src1: config.src1,
      leftAnimations: config.leftAnimations,
      rightAnimations: config.rightAnimations,
    });
    this.emojCounter = 35;
    this.emojiLoaded = false;
  }

  cutScene(ctx) {
    ctx.fillRect(this.x - 300, 100, 100, 100);
    let emoji = new Image();
    emoji.onload = () => {
      this.emojiLoaded = true;
    };
    emoji.src = emojiImage;
    if (this.emojCounter) {
      this.emojiLoaded && ctx.drawImage(emoji, 50, 30, 210, 210, 730, 330, 32, 32);
      this.emojCounter -= 1;
    } else {
      this.sprite.updateCurrentAnimation('jump');
    }
  }
}
