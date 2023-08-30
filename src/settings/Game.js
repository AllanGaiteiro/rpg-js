export class Game {
  constructor(canvasName, width, height, scene) {
    this.canvas = document.getElementById(canvasName);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    this.scene = scene;
  }

  load() {
    return this.scene.load();
  }

  initGame() {
    this.gameLoop();
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.scene.update();
    this.scene.render(this.ctx);
    requestAnimationFrame(() => this.gameLoop());
  }

  setScene(scene) {
    this.scene = scene;
  }
}
