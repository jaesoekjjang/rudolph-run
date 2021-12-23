class Sprite{
  constructor(config){
    this.playerInfo = config.playerInfo

    this.image = new Image();
    this.image.src = config.src;
    this.image.onload =()=>{
      this.imageLoaded = true;
    }

    this.animationFrameLimit = 8;
    this.frameProgress = this.animationFrameLimit;

    this.animations = {
      'run': [[2,448],[45,448], [90, 448], ],
      'idle': [[0,9], [45,9], [91,9], [135,9],[178,9]]
    }

    this.currentAnimation = this.playerInfo.currentAnimation || 'idle';
    this.currentAnimationFrame = 0;
  }

  get frame(){
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  updateAnimationFrame(){
    if(this.frameProgress > 0){
      this.frameProgress -= 1;
    return
    }

    this.frameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;
    
    if(this.frame == undefined){
      this.currentAnimationFrame = 0;
    }
  }

  updateCurrentAnimation(currentAnimation){
    if(this.currentAnimation !== currentAnimation){
      this.currentAnimation = currentAnimation;
      this.currentAnimationFrame = 0;
      this.frameProgress = this.animationFrameLimit;
    }
  }

  //!원래 x좌표의 2배 + 너비만큼 이동, translate 후엔 transform 복구
  drawflippedImage(x,y,ctx){
    ctx.translate(2*this.playerInfo.x+40,0)
    ctx.scale(-1,1);
    ctx.drawImage(this.image, x,y, 40, 50, this.playerInfo.x, this.playerInfo.y, 40, 50)
    ctx.setTransform(1,0,0,1,0,0)
  }

  draw(ctx){
    const [x,y] = this.frame;
    if(this.imageLoaded)
    if(this.playerInfo.lastDirection == 'right'){
      this.drawflippedImage(x,y,ctx)
    }else{
      ctx.drawImage(this.image, x,y, 40, 50, this.playerInfo.x, this.playerInfo.y, 40, 50)
    }
    this.updateAnimationFrame();
  }
}