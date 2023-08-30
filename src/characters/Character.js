import { Animation } from "../mechanics/animations/Animation.js";
import { Sprite } from "../mechanics/sprites/Sprite.js";

export class Character {
  constructor(x, y, speed, spriteUrl) {
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.speed = speed;
    this.sprite = new Sprite(spriteUrl);
    this.animation = new Animation(this.sprite.image);
    this.width = this.sprite.frameWidth;
    this.height = this.sprite.frameHeight;
  }

  move() {
    // Implemente a lógica de movimento do NPC aqui
    // Isso pode ser diferente do movimento do jogador
  }

  draw(ctx) {
    const frame = this.animation.getCurrentFrame();
    ctx.drawImage(
      this.sprite.image,
      frame.x,
      frame.y,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  checkCollisionWithWall(wall) {
    if (
      this.x < wall.x + wall.width &&
      this.x + this.width > wall.x &&
      this.y < wall.y + wall.height &&
      this.y + this.height > wall.y
    ) {
      // Colisão detectada
      return true;
    }
    return false;
  }

  checkCollisionWithCharacter(otherCharacter) {
    const thisX = this.x - this.sprite.frameWidth / 2;
    const thisY = this.y - this.sprite.frameHeight / 2;
    const otherX = otherCharacter.x - otherCharacter.sprite.frameWidth / 2;
    const otherY = otherCharacter.y - otherCharacter.sprite.frameHeight / 2;
    if (
      thisX + this.width / 2 > otherX &&
      thisX < otherX + otherCharacter.width / 2 &&
      thisY + this.height / 2 > otherY &&
      thisY < otherY + otherCharacter.height / 2
    ) {
      // Colisão detectada com o personagem 'otherCharacter'
      return true;
    }
    return false;
  }
}
