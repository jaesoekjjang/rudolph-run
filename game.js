const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width =800;
canvas.height = 500;

class Background{
  constructor(){
    this.points = []
    this.setPoints()
    
  }
  
  setPoints(){
    for(let i=0; i<=1800; i++){
      this.points.push(400 + Math.sin(i*Math.PI/180)*10)
    }
  }

  draw(n){
    ctx.save()
    ctx.fillStyle = '#3887B1'
    ctx.fillRect(0,0,canvas.width, canvas.height)
    ctx.restore()

    ctx.save()
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.moveTo(0,canvas.height)
    let height = 0;
    for(let i=0; i<=1080; i++){
      height = this.points[i+n]
      if(!height){
        this.extend()
      }
      ctx.lineTo(i, height)
    }
    ctx.lineTo(canvas.width, canvas.height)
    ctx.fill()
    ctx.restore()
  }

  extend(){
    for(let i=0; i<=1800; i++){
      this.points.push(400+Math.sin(i*Math.PI/180)*10)
    }
  }

  getY(pos){
    return this.points[pos+400]
  }
}

class Player{
  constructor(){
    this.width = 35;
    this.height = 45;
    this.x = (canvas.width -this.width)/2
    this.y = 100
    this.image = document.getElementById('rudolph')
    
  }

  draw(backgroundPos){
    const y = background.getY(backgroundPos)
    if(backgroundPos%3 == 1){
      ctx.drawImage(this.image, 171, 450, 35, 45, 400, y-this.height, this.width, this.height )
    }else if(backgroundPos%3 == 2){
      ctx.drawImage(this.image, 214, 449, 35, 45, 400, y-this.height, this.width, this.height )
    }else{
      ctx.drawImage(this.image,131, 448, 35, 45, 400, y-this.height, this.width, this.height )
    }
  }
}

const background = new Background()
const player = new Player()

let backgroundPos =0;
function animate(){
  background.draw(backgroundPos)
  player.draw(backgroundPos)
  backgroundPos += 10

  requestAnimationFrame(animate)
}

animate()