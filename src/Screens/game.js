import * as PIXI from "pixi.js";
import Explosion from "../objects/explosion";
import Square from "../objects/square";
import FancyText from "../utils/fancytext";
import Physics from "../utils/physics";

export default function Game(app) {
  this.container = new PIXI.Container();
  this.timer = 0;
  this.score = 0;

  const colors = ["0x00FF00", "0xFFFF00", "0xFF0000", "0x0000FF", "0x00FFFF"];
  const mass = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const objCount = Math.floor(Math.random() * (10 - 2) + 2);
  const squareArray = [];

  this.createSquares = function (count) {
    for (let i = 0; i < count; i++) {
      const m = Math.floor(Math.random() * (mass.length - 1) + 1);
      const c = Math.floor(Math.random() * (colors.length - 1) + 1);
      const s = new Square(
        app.screen,
        app.loader.resources.sphere.texture,
        mass[m - 1],
        colors[c - 1]
      );
      squareArray.push(s);
      this.container.addChild(s);
    }
  };
  this.createSquares(2);

  const physics = new Physics();
  const explode = new Explosion();

  const newtext = new FancyText(0);
  this.container.addChild(newtext);
  this.container.activeChild = false;
  this.container.interactive = true;

  this.increaseScore = function (s) {
    newtext.set(this.score + s);
  };

  // Listen for animate update
  //console.log(" --> ", app.renderer.plugins.interaction);

  this.container.on("pointerdown", (e) => {
    //console.log("down!!", e);
    this.container.activeChild = squareArray
      .map((s) =>
        s.mouseIsOver(this.container.toLocal(e.data.global)) ? s : false
      )
      .filter((x) => !!x)[0];
    //console.log(" this.container.activeChild", this.container.activeChild);
  });

  this.container.on("pointermove", (e) => {
    //console.log("move!!", e);
    //console.log(" this.container.activeChild", this.container.activeChild);
    if (this.container.activeChild) {
      //console.log("move!!", e.data.global);
      //this.container.activeChild.position.set(e.data.global);
      this.container.activeChild.moveEvent(
        this.container.toLocal(e.data.global),
        physics
      );
    }
  });

  this.container.on("pointerup", (e) => {
    //console.log("up!!", e);
    if (this.container.activeChild) this.container.activeChild = false;
  });

  this.container.on("pointerupoutside", (e) => {
    //console.log("upoutside!!", e);
    if (this.container.activeChild) this.container.activeChild = false;
  });

  app.ticker.add((delta) => {
    this.timer++;
    if (this.timer === 500) {
      this.createSquares(1);
      this.timer = 0;
    }
    const mouseCoords = app.renderer.plugins.interaction.mouse.global;

    squareArray.forEach((s, i) => {
      const container = this.container;
      s.init(app.screen, delta, mouseCoords, physics);
      squareArray.forEach((sa, ii) => {
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

          if (s.tint !== sa.tint) {
            //explode.setCoords(sa.x + sa.width * 0.5, sa.y + sa.height * 0.5);
            //container.addChild(explode);
            container.removeChild(s);
            container.removeChild(sa);
            if (ii > i) {
              squareArray.splice(ii, 0);
              squareArray.splice(i, 0);
            } else {
              squareArray.splice(i, 0);
              squareArray.splice(ii, 0);
            }

            setTimeout(function () {
              //container.removeChild(explode);
            }, 1500);
            this.increaseScore(-100);
          } else {
            container.removeChild(sa);
            squareArray.splice(ii, 0);
            this.increaseScore(100);
          }
        }
      });
    });
  });

  return this.container;
}
