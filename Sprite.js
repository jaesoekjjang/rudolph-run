class Sprite{
  constructor(config){
    this.playerInfo = config.playerInfo
    this.image1 = new Image();
    this.image1.src = config.src1;
    this.image1.onload =()=>{
      this.image1Loaded = true;
    }

    this.image2 = new Image();
    this.image2.src = config.src2;
    this.image2.onload =()=>{
      this.image2Loaded = true;
    }
    this.currentImage = this.image1;

    this.animationFrameLimit = 8;
    this.frameProgress = this.animationFrameLimit;

    this.leftAnimations = {
      'run': [[2,448],[45,448], [90, 448], ],
      'idle': [[0,9], [45,9], [91,9], [135,9],[178,9]]
    }

    this.rightAnimations = {
      'run': [[468,448],[423,448], [381, 448], ],
      'idle': [[467,9], [422,9], [376,9], [332,9],[289,9]]
    }

    this.currentAnimation = this.playerInfo.currentAnimation || 'idle';
    this.currentAnimationFrame = 0;
  }

  get frame(){
    if(this.playerInfo.lastDirection == 'right'){
      return this.rightAnimations[this.currentAnimation][this.currentAnimationFrame]
    }else{
      return this.leftAnimations[this.currentAnimation][this.currentAnimationFrame]
    }
  }

  setCurrentImage(direction){
    if(direction == 'right'){
      this.currentImage = this.image2
    }else{
      this.currentImage = this.image1
    }
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

  draw({ctx, camera}){
    const [x,y] = this.frame;
    if(this.image1Loaded && this.image2Loaded){
      if(this.playerInfo.x <= 400){
        ctx.drawImage(this.currentImage, x,y, 40, 50, this.playerInfo.x, this.playerInfo.y, 40, 50)
      }else if(this.playerInfo.x >=1200){
        ctx.drawImage(this.currentImage, x,y, 40, 50, 400+this.playerInfo.x-1200, this.playerInfo.y, 40, 50)
      }
      else{
        ctx.drawImage(this.currentImage, x,y, 40, 50, 400+this.playerInfo.x-camera.x, this.playerInfo.y, 40, 50)
      }
    }
    this.updateAnimationFrame();
  }
}