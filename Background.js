class Background{
  constructor(src){
    this.image = new Image;
    this.image.src = src;
    this.image.onload = () =>{
      this.isLoaded = true;
    }
  }

  draw(config){
    const [x] = config.camera.position;
    if(x<=400){
      config.ctx.drawImage(this.image, 0,0,3000,1500,0,0,1600,500)
      config.ctx.drawImage(this.image, 0,0,3000,1500,1600,0,1600,500)
      config.ctx.drawImage(this.image, 0,0,3000,1500,3200,0,1600,500)
    }
    else{
      config.ctx.drawImage(this.image, 0,0,3000,1500,400-x,0,1600,500)
      config.ctx.drawImage(this.image, 0,0,3000,1500,1600+400-x,0,1600,500)
      config.ctx.drawImage(this.image, 0,0,3000,1500,3200+400-x,0,1600,500)
    }
  }
}