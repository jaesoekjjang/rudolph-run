class Player{
  constructor(config){
    this.x = config.x;
    this.y = config.y;
    this.acc = 0.5;
    this.speed = 3.2;

    this.direction = config.direction || 'right';
    this.currentAnimation = 'idle'
    this.sprite = new Sprite({
      playerInfo:this,
      src1: config.src1,
      src2: config.src2,
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
      this.sprite.setCurrentImage('left')
      this.x -= this.speed;
    }else{
      this.sprite.setCurrentImage('right')
      this.x += this.speed;
    }
  }

  get position(){
    return [this.x, this.y];
  }

}