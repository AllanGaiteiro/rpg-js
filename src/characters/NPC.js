import { Movement } from "../mechanics/movements/Movement.js";
import { Character } from "./Character.js";

export class NPC extends Character {
  constructor(x, y, speed, spriteUrl, dialogues, waypoints = []) {
    super(x, y, speed, spriteUrl);
    this.haveInteraction = true;
    this.dialogues = dialogues;
    this.waypoints = waypoints;
    this.movement = new Movement(this);
    this.isInteracting = false;
  }

  interact(player) {
    const interactionDistance = player.width;
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < interactionDistance) {
      this.handleInteraction(player);
    } else {
      this.isInteracting = false;
    }
  }

  handleInteraction(player) {
    this.movement.lookAt(player);
    this.isInteracting = true;

    if (this.isInteracting) {
      this.movement.stop();
      this.performInteractionAction();
    }
  }

  performInteractionAction() {
    console.log(this.dialogues[0] || "Oi");
    this.isInteracting = true;
  }
}
