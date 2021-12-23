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
      x: 100,
      y: 100,
      src: "./rudolph.png",
    })

    this.startGame();
  }

  render(){
    const loop = () =>{
      this.ctx.clearRect(0,0,canvas.clientWidth, canvas.clientHeight);
      this.player.update({
        direction:this.keyboardInput.direction
      })
      this.player.sprite.draw(this.ctx);
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