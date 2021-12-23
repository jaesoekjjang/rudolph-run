class Player{
  constructor(config){
    console.log(config.direction)
    this.x = config.x;
    this.y = config.y;

    this.direction = config.direction || 'right';
    this.currentAnimation = 'idle' //run-right
    this.sprite = new Sprite({
      playerInfo:this,
      src: config.src,
    });
  }

  update(config){
    this.direction = config.direction;
    if(this.direction){
      this.lastDirection = this.direction;
    }
  }
}