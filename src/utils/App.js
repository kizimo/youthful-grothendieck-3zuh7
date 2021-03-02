// Adapted from: https://www.pixiplayground.com/

import * as PIXI from "pixi.js";
//import ClockTimer from "@gamestdio/timer";

export default function App() {
  this.app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight
  });
  //this.clock = new ClockTimer();

  this.app.onResize = () => {
    // resize renderer
    this.app.renderer.resize(window.innerWidth, window.innerHeight);

    // resize canvas
    this.app.view.width = window.innerWidth;
    this.app.view.height = window.innerHeight;
  };

  this.app.goTo = function (scene) {
    if (this.currentScene) {
      this.stage.removeChild(this.currentScene);
    }

    this.currentScene =
      scene instanceof PIXI.DisplayObject ? scene : new scene();

    this.stage.addChild(this.currentScene);
    //this.stage.addChildAt(this.currentScene, 1);
  };

  this.app.setGame = function (g) {
    this.mainGame = g;
  };

  this.app.goToGame = function () {
    this.goTo(this.mainGame);
  };

  document.body.appendChild(this.app.view);
  window.addEventListener("resize", this.app.onResize);
  this.app.onResize();

  //this.app.ticker.shared.add(() => this.clock.tick());

  return this.app;
}
