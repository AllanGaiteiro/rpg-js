export class Tileset {
  constructor(imageSrc, tileWidth, tileHeight) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tiles = [];
  }

  async load(mapData) {
    mapData.forEach((row, y) => {
      row.forEach((x) => {
        this.addTile(x, y);
      });
    });

    await this.image.onload;
  }

  addTile(tileX, tileY) {
    this.tiles.push({
      x: tileX * this.tileWidth,
      y: tileY * this.tileHeight,
    });
  }

  getTile(tileIndex) {
    return this.tiles[tileIndex];
  }

  render(ctx, mapData) {
    for (let y = 0; y < mapData.length; y++) {
      for (let x = 0; x < mapData[y].length; x++) {
        const tileIndex = mapData[y][x];
        const tile = this.getTile(tileIndex);
        if (tile) {
          ctx.drawImage(
            this.image,
            tile.x,
            tile.y,
            this.tileWidth,
            this.tileHeight,
            x * this.tileWidth,
            y * this.tileHeight,
            this.tileWidth,
            this.tileHeight
          );
        }
      }
    }
  }
}
