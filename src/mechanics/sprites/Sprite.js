export class Sprite {
  constructor(spriteUrl) {
    this.image = new Image();
    this.image.src = spriteUrl;
    this.columns = SETTINGS.SPRITE_COLUMNS;
    this.rows = SETTINGS.SPRITE_ROWS;
    this.frameWidth = this.image.width / this.columns;
    this.frameHeight = this.image.height / this.rows;
  }

  async load() {
    return new Promise((resolve, reject) => {
      this.image.onload = resolve;
      this.image.onerror = reject;
    });
  }

  getFrame(frameX, frameY) {
    return {
      x: frameX * this.frameWidth,
      y: frameY * this.frameHeight,
      width: this.frameWidth,
      height: this.frameHeight,
    };
  }
}
