class Game{
  constructor(){
    this.canvas = document.querySelector('#canvas');
    this.ctx = canvas.getContext('2d');
    this.map = null;
  }

  init(){
    this.keyboardInput = new KeyboardInput();
    this.keyboardInput.init();

    this.player = new Player({
      x: 1100,
      y: 400,
      src1: "./rudolph.png",
      src2:"./rudolph-reverse.png"
    })

    this.background = new Background("./BACKGROUND1.png")
    this.startGame();
  }
  
  render(){
    const loop = () =>{
      this.ctx.clearRect(0,0,canvas.clientWidth, canvas.clientHeight);
      this.background.draw({ctx:this.ctx, camera:this.player});
      this.player.sprite.draw({ctx:this.ctx, camera:this.player});
      this.player.update({
        direction:this.keyboardInput.direction,
      })
      requestAnimationFrame(loop)
    }
    loop()
  }

  startGame(){
    this.render()
  }
}

const game = new Game();
game.init();