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
    const speed = config.camera.speed;
    if(x<=400){
      config.ctx.drawImage(this.image, 0,0,3000,1500,0,0,1600,500)
    }else if(x >=1200){
      config.ctx.drawImage(this.image, 0,0,3000,1500,-800,0,1600,500)
    }
    else{
      config.ctx.drawImage(this.image, 0,0,3000,1500,400-x,0,1600,500)
    }
  }
}