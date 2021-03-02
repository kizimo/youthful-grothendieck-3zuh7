import * as PIXI from "pixi.js";
import Explosion from "../objects/explosion";
import Square from "../objects/square";
import FancyText from "../utils/fancytext";
import Physics from "../utils/physics";

export default function Game(app) {
  this.container = new PIXI.Container();

  const squareArray = [
    new Square(
      5,
      "0x00FF00",
      (app.screen.width - 100) / 2,
      (app.screen.height - 100) / 2
    ),
    new Square(1, "0xFF0000")
  ];

  const physics = new Physics();
  const explode = new Explosion();

  const newtext = new FancyText("Hello World");
  this.container.addChild(newtext);

  squareArray.forEach((s) => {
    this.container.addChild(s);
  });

  // Listen for animate update

  app.ticker.add((delta) => {
    const mouseCoords = app.renderer.plugins.interaction.mouse.global;

    squareArray.forEach((s) => {
      const container = this.container;
      s.init(app.screen, delta, mouseCoords, physics);
      squareArray.forEach((sa) => {
        if (sa !== s && physics.testForAABB(s, sa)) {
          // Calculate the changes in acceleration that should be made between
          // each square as a result of the collision
          const collisionPush = physics.collisionResponse(s, sa);
          // Set the changes in acceleration for both squares
          sa.acceleration.set(
            collisionPush.x * s.mass,
            collisionPush.y * s.mass
          );
          s.acceleration.set(
            -(collisionPush.x * sa.mass),
            -(collisionPush.y * sa.mass)
          );

          explode.setCoords(sa.x + sa.width * 0.5, sa.y + sa.height * 0.5);
          container.addChild(explode);
          container.removeChild(s);
          container.removeChild(sa);

          setTimeout(function () {
            container.removeChild(explode);
          }, 1500);
        }
      });
    });
  });

  return this.container;
}
