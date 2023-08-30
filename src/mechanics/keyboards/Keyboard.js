export class Keyboard {
  constructor() {
    this.keys = {};
    this.initializeListeners();
  }

  initializeListeners() {
    document.addEventListener("keydown", (event) => {
      this.keys[event.key] = true;
    });

    document.addEventListener("keyup", (event) => {
      this.keys[event.key] = false;
    });
  }

  isMoveUp() {
    return (
      this.isKeyPressed("ArrowUp") ||
      this.isKeyPressed("W") ||
      this.isKeyPressed("w")
    );
  }

  isMoveDown() {
    return (
      this.isKeyPressed("ArrowDown") ||
      this.isKeyPressed("S") ||
      this.isKeyPressed("s")
    );
  }

  isMoveLeft() {
    return (
      this.isKeyPressed("ArrowLeft") ||
      this.isKeyPressed("A") ||
      this.isKeyPressed("a")
    );
  }

  isMoveRight() {
    return (
      this.isKeyPressed("ArrowRight") ||
      this.isKeyPressed("D") ||
      this.isKeyPressed("d")
    );
  }

  isInteractKeyPressed() {
    return this.isKeyPressed("E") || this.isKeyPressed("e");
  }

  isKeyPressed(key) {
    return !!this.keys[key];
  }

  movimentKeyboard(speed) {
    let dx = 0;
    let dy = 0;
    let direction = "";
    if (this.isMoveUp()) {
      direction = "up";
      dy = -speed;
    }
    if (this.isMoveDown()) {
      direction = "down";
      dy = speed;
    }
    if (this.isMoveLeft()) {
      direction = "left";
      dx = -speed;
    }
    if (this.isMoveRight()) {
      direction = "right";
      dx = speed;
    }

    return { dx, dy, direction };
  }
}
