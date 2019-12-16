import Letter from "./letter.js";

const keycodes = {
  A: 65,
  O: 83,
  E: 68,
  U: 70
}

const fingers = {
  A: 0,
  O: 1,
  E: 2,
  U: 3
}

let level0 = ["A", "O", "E", "U"];

export default class Level{
  constructor(){
    this.cleared = 0;
    this.perfect = 0;
    this.good = 0;
    this.fine = 0;
    this.time = 0;
    this.interval = 0;
    this.counter = 0;
    this.letters = [];
    while(this.letters.length < 30){
      let l = level0[Math.floor(Math.random()*level0.length)]
      this.letters.push(new Letter(l, fingers[l], keycodes[l]))
    }
    this.letters[0].activate()
  }
  draw(ctx, colors, fonts){
    let activeLetters = this.letters.filter((l) =>{ return l.active})
    for(let i=0;i<activeLetters.length;i++){
      activeLetters[i].draw(ctx, colors, fonts)
    }
  }
  update(delta,input){
    this.time += delta;
    this.interval += delta;
    if(this.interval >= 2000){
      this.interval = 0;
      this.counter++
      this.letters[this.counter].activate();

    }
    this.moveLetters();
    this.clearLetters(input);
  }
  clearLetters(input){
    let activeLetters = this.letters.filter((l) =>{ return l.active})
    console.log(activeLetters)
    for(let i=0;i<activeLetters.length;i++){
      if(input[activeLetters[i].keycode] && activeLetters[i].y > 600 && activeLetters[i].y < 800 ){
        activeLetters[i].active = false;
        activeLetters[i].cleared = true;
        this.cleared ++
      }
    }
  }
  moveLetters(){
    for(let i=0;i<this.letters.length;i++){
      this.letters[i].move();
    }
  }
}
