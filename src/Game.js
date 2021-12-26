import KeyboardInput from './KeyboardInput';
import Character from './Character';
import Background from './Background';

import backgroundImage from '../image/background.png';
import santaImage from '../image/santa-left.png';
import rudolphLeftImage from '../image/rudolph.png';
import rudolphRightImage from '../image/rudolph-reverse.png';

export default class Game {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmootingEnabled = false;
    this.map = null;
  }

  init() {
    this.keyboardInput = new KeyboardInput();
    this.keyboardInput.init();

    this.player = new Character({
      isPlayer: true,
      x: 500,
      y: 400,
      width: 41,
      height: 50,
      src1: rudolphLeftImage,
      src2: rudolphRightImage,
      leftAnimations: {
        run: [
          [2, 448],
          [45, 448],
          [90, 448],
        ],
        idle: [
          [0, 9],
          [45, 9],
          [91, 9],
          [135, 9],
          [178, 9],
        ],
        jump: [[132, 191]],
      },
      rightAnimations: {
        run: [
          [468, 448],
          [423, 448],
          [381, 448],
        ],
        idle: [
          [467, 9],
          [422, 9],
          [376, 9],
          [332, 9],
          [289, 9],
        ],
        jump: [[337, 191]],
      },
    });

    this.santa = new Character({
      x: 2000,
      y: 360,
      width: 70,
      height: 90,
      zIndex: 1,
      direction: 'left',
      src1: santaImage,
      leftAnimations: {
        run: [
          [2, 448],
          [45, 448],
          [90, 448],
        ],
        idle: [
          [63, 5],
          [214, 5],
          [365, 6],
          [516, 6],
          [666, 6],
          [817, 6],
          [968, 6],
          [1118, 6],
        ],
      },
      rightAnimations: {
        run: [
          [468, 448],
          [423, 448],
          [381, 448],
        ],
        idle: [
          [63, 5],
          [214, 5],
          [366, 6],
          [518, 6],
          [668, 6],
          [819, 6],
          [969, 6],
          [1120, 6],
        ],
      },
    });

    this.background = new Background(backgroundImage);
    this.startGame();
  }

  render() {
    const loop = () => {
      this.ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      this.background.draw({ ctx: this.ctx, camera: this.player });
      this.santa.sprite.draw({ ctx: this.ctx, camera: this.player });

      this.player.sprite.draw({ ctx: this.ctx, camera: this.player });
      this.player.update({
        direction: this.keyboardInput.direction,
      });
      requestAnimationFrame(loop);
    };
    loop();
  }

  startGame() {
    this.render();
  }
}
