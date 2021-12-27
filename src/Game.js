import KeyboardInput from './KeyboardInput';
import Character from './Character';
<<<<<<< HEAD
import Santa from './Santa';
import Background from './Background';

import backgroundImage from '../image/background.png';
import santaImage from '../image/santa1.png';
=======
import Background from './Background';

import backgroundImage from '../image/background.png';
import santaImage from '../image/santa-left.png';
>>>>>>> 0437e07d2af407cf1fa2500febf48aa3aaea107b
import rudolphLeftImage from '../image/rudolph.png';
import rudolphRightImage from '../image/rudolph-reverse.png';

export default class Game {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    this.ctx = canvas.getContext('2d');
<<<<<<< HEAD
    this.ctx.imageSmoothingEnabled = false;
=======
    this.ctx.imageSmootingEnabled = false;
>>>>>>> 0437e07d2af407cf1fa2500febf48aa3aaea107b
    this.map = null;
  }

  init() {
    this.keyboardInput = new KeyboardInput();
    this.keyboardInput.init();

    this.player = new Character({
      isPlayer: true,
<<<<<<< HEAD
      x: 4050,
=======
      x: 500,
>>>>>>> 0437e07d2af407cf1fa2500febf48aa3aaea107b
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
          [465, 9],
          [420, 9],
          [374, 9],
          [330, 9],
          [287, 9],
        ],
        jump: [[337, 191]],
      },
    });

    this.santa = new Santa({
      x: 4400,
      y: 360,
      width: 77,
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
          [63, 4],
          [214, 4],
          [365, 4],
          [516, 4],
          [666, 4],
          [817, 4],
          [968, 4],
          [1118, 4],
        ],
        jump: [
          [57, 214],
          [204, 212],
          [354, 211],
          [504, 211],
          [654, 211],
          [804, 212],
          [956, 217],
          [1109, 215],
        ],
      },
      rightAnimations: {
        run: [
          [468, 448],
          [423, 448],
          [381, 448],
        ],
        idle: [
          [63, 4],
          [214, 4],
          [366, 4],
          [518, 3],
          [668, 3],
          [819, 3],
          [969, 3],
          [1120, 3],
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

      if (this.player.position[0] > 4080) {
        this.player.stopBehavior();
        this.santa.cutScene(this.ctx);
      }

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
