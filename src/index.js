import * as PIXI from "pixi.js";
import App from "./utils/App";
import Game from "./Screens/game";
import Loading from "./Screens/loading";
import StartButton from "./Screens/startbutton";
import BackGround from "./Screens/background";

//import Box from "./objects/box";

// Create our application instance
const app = new App();
const loading = new Loading(app);

app.goTo(loading);
app.loader
  //.add("bunny", "https://pixijs.io/examples/examples/assets/bunny.png")
  .add(
    "circle",
    "https://uploads.codesandbox.io/uploads/user/4de3665d-280a-4823-9c5e-c274e2967540/96JS-circle.png"
  )
  .add("spritesheet", "/src/assets/mc.json")
  .add(
    "starTexture",
    "https://uploads.codesandbox.io/uploads/user/4de3665d-280a-4823-9c5e-c274e2967540/fBOW-star.png"
  )
  .add(
    "sphere",
    "https://uploads.codesandbox.io/uploads/user/4de3665d-280a-4823-9c5e-c274e2967540/rtQD-whitesphere.jpeg"
  )
  .add(
    "bgmusic",
    "https://uploads.codesandbox.io/uploads/user/4de3665d-280a-4823-9c5e-c274e2967540/O9rO-mole.mp3"
  )
  //.add("crash", "./assets/crash-01.wav")
  .load(startup);

app.loader.onProgress.add((p, l, r) => {
  //console.log("progress", p, l, r);
  loading.setText(`${Math.floor(p.progress)}%`);
}); // called once per loaded/errored file

app.loader.onError.add((e, l, r) => {
  //console.log("error", e, l, r);
  loading.setText(e);
}); // called once per errored file
/*
loader.onLoad.add(() => {}); // called once per loaded file
loader.onComplete.add(() => {}); // called once when the queued resources all load.
*/

function startup() {
  const start = new StartButton(app);

  const mainGame = new Game(app);
  //app.bg = new BackGround(app);

  //app.stage.addChild(app.bg);
  //console.log(app.loader.resources);
  //app.loader.resources.bgmusic.data.loop = true;
  //app.loader.resources.bgmusic.data.singleInstance = true;
  //app.loader.resources.bgmusic.data.play();
  app.setGame(mainGame);

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
    app.goTo(mainGame);
    //app.goTo(start);
  }, 3000);

  app.ticker.add((delta) => {});
}
