export default class KeyboardInput {
  constructor() {
    this.keys = {
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowUp: 'up',
    };
    this.directions = [];
  }

  get direction() {
    return this.directions[this.directions.length - 1];
  }

  init() {
    document.addEventListener('keydown', (e) => {
      const key = this.keys[e.key];
      if (key && !this.directions.includes(key)) {
        this.directions.push(key);
      }
    });

    document.addEventListener('keyup', (e) => {
      const key = this.keys[e.key];
      const index = this.directions.indexOf(key);
      if (index > -1) {
        this.directions.splice(index, 1);
      }
    });
  }
}
