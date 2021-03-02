import * as PIXI from "pixi.js";

export default function Loading(app) {
  this.container = new PIXI.Container();

  const tex = PIXI.Texture.from(
    "https://pixijs.io/examples/examples/assets/bunny.png"
  );

  const bunny = (this.bunny = new PIXI.Sprite(tex));
  bunny.anchor.set(0.5);

  // Move the sprite to the center of the screen
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  bunny.scale.set(5);

  this.container.addChild(bunny);

  // Listen for animate update
  app.ticker.add((delta) => {
    // Rotate mr rabbit clockwise
    bunny.rotation += 0.01 * delta;
  });

  return this.container;
}
