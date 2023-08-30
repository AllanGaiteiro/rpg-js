import * as RPG from "../src/rpg.js";

document.addEventListener("DOMContentLoaded", async () => {
  const mapData = [
    [0, 1, 2, 1, 0],
    [3, 4, 5, 4, 3],
    [0, 1, 2, 1, 0],
    [3, 4, 5, 4, 3],
  ];

  const player = new RPG.Player(50, 50, 4, "actor.png");
  const person1 = new RPG.NPC(
    150,
    50,
    2,
    "actor.png",
    [],
    [
      { x: 150, y: 100 },
      { x: 250, y: 100 },
      { x: 250, y: 200 },
      { x: 150, y: 200 },
    ]
  );
  const person2 = new RPG.NPC(100, 100, 2, "actor.png", [
    "Olá, viajante!",
    "Como posso ajudá-lo hoje?",
    "Tenha cuidado com os monstros por aqui.",
  ]);
  const scene = new RPG.Scene(player, "tileset.png", 32, mapData);
  scene.characterManager.addCharacter(person1);
  scene.characterManager.addCharacter(person2);

  const game = new RPG.Game("gameCanvas", 800, 600, scene);
  await game.load();
  game.initGame();
});
