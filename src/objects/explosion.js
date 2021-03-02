import * as PIXI from "pixi.js";

export default function Explosion() {
  // create an array to store the textures
  const explosionTextures = [];
  let i;

  for (i = 0; i < 26; i++) {
    const texture = PIXI.Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
    explosionTextures.push(texture);
  }

  // create an explosion AnimatedSprite
  this.explosion = new PIXI.AnimatedSprite(explosionTextures);
  this.explosion.x = 0;
  this.explosion.y = 0;
  this.explosion.anchor.set(0.5);
  this.explosion.rotation = Math.random() * Math.PI;
  this.explosion.scale.set(0.75 + Math.random() * 0.5);
  this.explosion.gotoAndPlay(Math.random() * 27);

  this.explosion.setCoords = function (x, y) {
    this.x = x;
    this.y = y;
  };

  return this.explosion;
}
