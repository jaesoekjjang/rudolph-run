import Character from './Character';
import emojiImage from '../image/exclamation.png';
import speechBubbleImage from '../image/panel_06.png';

export default class Santa extends Character {
  constructor(config) {
    super(config);
    this.emojCounter = 35;
    this.emojiLoaded = false;
    this.emoji = new Image();
    this.emoji.onload = () => {
      this.emojiLoaded = true;
    };
    this.emoji.src = emojiImage;

    this.speechBubbleLoaded = false;
    this.speechBubble = new Image();
    this.speechBubble.onload = () => {
      this.speechBubbleLoaded = true;
    };
    this.speechBubble.src = speechBubbleImage;
    this.jumpCounter = 70;
  }

  cutScene(ctx) {
    if (this.emojCounter) {
      this.emojiLoaded && ctx.drawImage(this.emoji, 50, 30, 210, 210, 730, 330, 32, 32);
      this.emojCounter -= 1;
    } else if (this.jumpCounter) {
      this.sprite.updateCurrentAnimation('jump');
      this.jumpCounter -= 1;
    } else {
      this.sprite.updateCurrentAnimation('idle');
      this.speechBubbleLoaded && ctx.drawImage(this.speechBubble, 0, 0, 226, 90, 560, 300, 180, 65);
      ctx.font = '12px roboto';
      ctx.fillText('할 일이 잔뜩 쌓여있는데 어딜', 570, 320);
      ctx.fillText('놀러 다닌거야!!', 570, 335);
      ctx.fillText('어서 선물 싣고 떠날 준비해라!', 570, 350);
    }
  }
}
