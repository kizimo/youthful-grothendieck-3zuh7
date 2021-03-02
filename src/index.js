//import * as PIXI from "pixi.js";
import App from "./utils/App";
import Game from "./Screens/game";
import Loading from "./Screens/loading";
import StartButton from "./Screens/startbutton";
import BackGround from "./Screens/background";

//import Box from "./objects/box";

// Create our application instance
const app = new App();
const loading = new Loading(app);
const start = new StartButton(app);
const mainGame = new Game(app);
app.bg = new BackGround(app);
app.stage.addChild(app.bg);
app.setGame(mainGame);

//app.stop();
// Load the bunny texture
//app.loader.baseUrl = "./objects";
app.goTo(loading);
app.loader
  .add("bunny", "https://pixijs.io/examples/examples/assets/bunny.png")
  .add("circle", "https://pixijs.io/examples/examples/assets/circle.png")
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
  setTimeout(() => {
    app.goTo(start);
  }, 3000);

  app.ticker.add((delta) => {});
}
