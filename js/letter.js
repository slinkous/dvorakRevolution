

const size = 32;
const speed = 4.25

export default class Letter {
  constructor(letter, col, keycode){
    this.letter = letter;
    this.col = col;
    this.keycode = keycode;
    this.y = -32;
    this.x = 50 + col*50;
    this.active = false;
    this.cleared = false;
  }
  draw(ctx, colors, fonts){
    if(!this.active)return;
    ctx.save();
    // ctx.fillStyle = colors[3];
    // ctx.strokeStyle = colors[4];
    // ctx.fillRect(this.x, this.y, 32, 32);
    // ctx.strokeRect(this.x, this.y, 32, 32);
    ctx.textAlign = "center";
    ctx.font = "48px " + fonts[0];

    ctx.fillStyle = colors[6];
    ctx.fillText(this.letter,this.x+16, this.y+32)
    ctx.restore();
  }
  move(){
    if(this.active){
      this.y += speed
    }
    if(this.y > 800){
      this.y = -50;
      // this.active = false;
    }
  }
  activate(){
    this.active = true;
  }
  // clear(input){
  //   if(input[this.keycode]){
  //     this.active = false;
  //     this.cleared = true;
  //     Letter.addCleared()
  //     return
  //   }
  // }

}
