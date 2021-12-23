class Player{
  constructor(config){
    this.x = config.x;
    this.y = config.y;
    this.speed = config.speed || 3;
    this.acc = 0.5;

    this.direction = config.direction || 'right';
    this.currentAnimation = 'idle'
    this.sprite = new Sprite({
      playerInfo:this,
      src: config.src,
    });
  }

  update(config){
    this.direction = config.direction;
    if(this.direction){
      this.lastDirection = this.direction;
      this.sprite.updateCurrentAnimation('run')
      this.updatePosition(this.direction)
    }else{
      this.sprite.updateCurrentAnimation('idle')
    }
  }

  updatePosition(direction){
    if(direction == 'left'){
      this.x -= this.speed;
    }else{
      this.x += this.speed;
    }
  }
}