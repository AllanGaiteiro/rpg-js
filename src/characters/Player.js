import { Keyboard } from "../mechanics/keyboards/Keyboard.js";
import { Movement } from "../mechanics/movements/Movement.js";
import { Character } from "./Character.js";

export class Player extends Character {
  constructor(x, y, speed, spriteUrl) {
    super(x, y, speed, spriteUrl);
    this.Keyboard = new Keyboard();
    this.movement = new Movement(this);
  }

  move() {
    let direction = this.animation.currentAnimationName.split("_")[1];
    let {
      dx,
      dy,
      direction: directionController,
    } = this.Keyboard.movimentKeyboard(this.speed);
    this.movement.moveWithInput([dx, dy, directionController || direction]);
  }

  async load() {
    this.Keyboard.initializeListeners();
    await this.sprite.load();
  }
}
