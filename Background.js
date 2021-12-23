class Background{
  constructor(src){
    this.image = new Image;
    this.image.src = src;
    this.image.onload = () =>{
      this.isLoaded = true;
    }
  }

  draw(ctx){
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.image, 0,0,2400,1500,0,0,800,500)
  }
}