import { CharacterManager } from "./../characters/CharacterManager.js";
import { Tileset } from "./Tileset.js";

export class Scene {
  constructor(player, tilesetImage, tilesetLarge, mapData) {
    this.player = player;
    this.mapData = mapData;
    this.tileset = new Tileset(tilesetImage, tilesetLarge, tilesetLarge);
    this.characterManager = new CharacterManager(player);
  }

  async load() {
    await this.player.load();
    await this.tileset.load(this.mapData);
  }

  update() {
    this.characterManager.updateAll();
  }

  render(ctx) {
    this.tileset.render(ctx, this.mapData);

    // Atualizar todos os personagens
    this.characterManager.updateAll();
    // Desenhar todos os personagens
    this.characterManager.drawAll(ctx);
  }
}
