export default class GameObject {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  update() {}

  get position() {
    return [this.x, this.y];
  }
}
