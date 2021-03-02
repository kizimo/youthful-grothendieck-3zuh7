import * as PIXI from "pixi.js";
import { bootstrapApp } from "./bootstrapApp";
import Explosion from "./objects/explosion";
//import Box from "./objects/box";
import Square from "./objects/square";
import FancyText from "./utils/fancytext";
import Physics from "./utils/physics";

// Create our application instance
var app = bootstrapApp();
//app.stop();
// Load the bunny texture
//app.loader.baseUrl = "./objects";
app.loader
  .add("bunny", "https://pixijs.io/examples/examples/assets/bunny.png")
  .add(
    "spritesheet",
    "https://pixijs.io/examples/examples/assets/spritesheet/mc.json"
  )
  .load(startup);

function startup() {
  /*
  var bunny = new PIXI.Sprite(app.loader.resources.bunny.texture);

  // Center the sprite's anchor point
  bunny.anchor.set(0.5);

  // Move the sprite to the center of the screen
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  app.stage.addChild(bunny);

  // Listen for animate update
  app.ticker.add(function (delta) {
    // Rotate mr rabbit clockwise
    bunny.rotation += 0.1 * delta;
  });
  */

  // Lol
  //const box = new Box();
  //app.stage.addChild(box);
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
  app.stage.addChild(newtext);

  // Listen for animate update

  app.ticker.add((delta) => {
    const mouseCoords = app.renderer.plugins.interaction.mouse.global;

    squareArray.forEach((s) => {
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
          app.stage.addChild(explode);
          app.stage.removeChild(s);
          app.stage.removeChild(sa);

          setTimeout(function () {
            app.stage.removeChild(explode);
          }, 1500);
        }
      });
    });
  });

  // Add to stage
  squareArray.forEach((s) => {
    app.stage.addChild(s);
  });

  //app.stage.addChild(redSquare, greenSquare);
}
