import InputHandler from "/js/input.js";
import Player from "/js/player.js";
import Sprite from "/js/sprite.js"
import TileMap from "/js/tile.js"
import Letter from "/js/letter.js"

export const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
}

export class Game {
  constructor(gameWidth, gameHeight){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.music = document.querySelector("#gameMusic");
    this.music.loop = true;
    this.gameObjects = [];
    new InputHandler(this);
    this.letters = [];
    this.line = [];
    for(let i=0; i<16; i++){
      let k = new Letter("-", i)
      k.y =  448;
      this.line.push(k)
    }
    let l = new Letter("A", 1)
    l.y = 0;
    l.active = true;
    this.letters.push(l)
  }

  start(){
    if(this.gamestate !== GAMESTATE.MENU) return;
    this.gameObjects = [this.player];
    this.gamestate = GAMESTATE.RUNNING;

    // this.music.play()
  }
  update(deltaTime){
    if(
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    ) return;
    this.letters[0].move();
  }
  draw(ctx, colorScheme, fonts){

    // ctx.save();
    for(let i = 0; i < this.letters.length; i++){
      this.letters[i].draw(ctx, colorScheme, fonts)
    }
    for(let i = 0; i < this.line.length; i++){
      this.line[i].draw(ctx, colorScheme, fonts)
      console.log(this.line[i])
    }
    // ctx.restore();

    if(this.gamestate === GAMESTATE.PAUSED){
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "3em " + fonts[0];
      ctx.fillStyle = colorScheme[4];
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
    }
    if(this.gamestate === GAMESTATE.MENU){
      ctx.fillStyle = colorScheme[3];
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

      ctx.font = "3em " + fonts[0];
      ctx.fillStyle = colorScheme[6];
      ctx.textAlign = "center";
      ctx.fillText("Dvorak........", this.gameWidth/2, this.gameHeight/3);
      ctx.fillText("..Revolution", this.gameWidth/2, this.gameHeight/2);
    }
    if(this.gamestate === GAMESTATE.GAMEOVER){
      ctx.fillStyle = colorScheme[4];
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

      ctx.font = "3em " + fonts[0];
      ctx.fillStyle = colorScheme[5];
      ctx.textAlign = "center";
      ctx.fillText("Game Over", this.gameWidth/2, this.gameHeight/2);
    }
  }
  togglePause(){
    if(this.gamestate == GAMESTATE.PAUSED){
      this.gamestate = GAMESTATE.RUNNING;
      this.music.play();
    } else {
      this.gamestate = GAMESTATE.PAUSED;
      this.music.pause();
    }
  }
  stop(){
    this.music.pause();
    this.gamestate = GAMESTATE.GAMEOVER;
  }
}
