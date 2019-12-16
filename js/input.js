import {GAMESTATE} from "/js/game.js";

export default class InputHandler {
  constructor(game){
    this.inputStates = {}
    document.addEventListener("keydown", event => {
      switch(event.keyCode){
        case 27:
          game.togglePause();
          break;
        case 13:
          if(game.gamestate == GAMESTATE.MENU){
            game.start();
          } else if(game.gamestate == GAMESTATE.RUNNING){
            game.stop();
          }
          break;
      }
      this.inputStates[event.keyCode] = true;
    });
    document.addEventListener("keyup", event => {
      // switch(event.keyCode){
      //
      // }
      this.inputStates[event.keyCode] = false;
    });
  }
};
