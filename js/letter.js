const size = 32;
const speed = 4.25

export default class Letter {
  constructor(letter, col){
    this.letter = letter;
    this.col = col;
    this.y = -32;
    this.x = col*32;
    this.active = false;
  }
  draw(ctx, colors, fonts){
    ctx.save();
    ctx.fillStyle = colors[3];
    ctx.strokeStyle = colors[4];
    ctx.fillRect(this.x, this.y, 32, 32);
    ctx.strokeRect(this.x, this.y, 32, 32);
    ctx.textAlign = "center";
    ctx.font = "32px " + fonts[0];

    ctx.fillStyle = colors[6];
    ctx.fillText(this.letter,this.x+16, this.y+32)
    ctx.restore();
  }
  move(){
    if(this.active){
      this.y += speed
    }
    if(this.y > 512){
      this.y = -32;
      // this.active = false;
    }
  }
}
