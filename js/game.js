import InputHandler from "./input.js";
import Player from "./player.js";
import Sprite from "./sprite.js"
import TileMap from "./tile.js"
import Level from "./level.js"

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
    this.input = new InputHandler(this);
    this.letters = [];
    this.line = [];
    this.level = new Level();
  }

  start(){
    if(this.gamestate !== GAMESTATE.MENU) return;
    this.gameObjects = [this.player];
    this.gamestate = GAMESTATE.RUNNING;

    this.music.play()
  }
  update(deltaTime){
    if(
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    ) return;
    this.level.update(deltaTime, this.input.inputStates);
  }
  draw(ctx, colorScheme, fonts){

    // ctx.save();
    // for(let i = 0; i < this.letters.length; i++){
    //   this.letters[i].draw(ctx, colorScheme, fonts)
    // }
    ctx.font = "36px " + fonts[0];
    ctx.fillStyle = colorScheme[2];
    for(var i=0; i<10; i++){
      ctx.fillText("_", 50+(50*i), this.gameHeight-100);
    }
    this.level.draw(ctx, colorScheme, fonts);
    // ctx.restore();

    if(this.gamestate === GAMESTATE.PAUSED){
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "3em " + fonts[0];
      ctx.fillStyle = colorScheme[3];
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
