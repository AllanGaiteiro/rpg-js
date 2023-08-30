export class CharacterManager {
  constructor(player) {
    this.characters = []; // Uma matriz para armazenar todos os personagens
    this.player = player;
  }

  addCharacter(character) {
    this.characters.push(character);
  }

  removeCharacter(character) {
    const index = this.characters.indexOf(character);
    if (index !== -1) {
      this.characters.splice(index, 1); // Remover um personagem da lista
    }
  }

  updateAll() {
    // Atualizar todos os personagens
    this.player.move();
    for (const character of this.characters) {
      character.movement.move();
      if (this.player.Keyboard.isInteractKeyPressed()) {
        character.interact(this.player);
      }

      if (this.player.checkCollisionWithCharacter(character)) {
        // Mova o NPC de volta para o waypoint anterior, se possível
        character.movement.moveBackToPreviousWaypoint();
        // Pare o jogador se ele estiver bloqueando o NPC
        this.player.x = this.player.lastX;
        this.player.y = this.player.lastY;
      }
    }
  }

  drawAll(ctx) {
    const draw = [...this.characters, this.player].sort((a, b) => a.y - b.y);
    for (const character of draw) {
      character.draw(ctx);
    }
  }
}
