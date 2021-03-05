import * as PIXI from "pixi.js";

export default function App() {
  this.app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight
  });

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
  };

  this.app.setGame = function (g) {
    this.mainGame = g;
  };

  this.app.goToGame = function () {
    this.goTo(this.mainGame);
  };

  // remove any canvases if they exist, this is fix for parcel hot realoding module
  if (document.getElementById("app").firstChild) {
    document
      .getElementById("app")
      .removeChild(document.getElementById("app").firstChild);
  }

  document.getElementById("app").appendChild(this.app.view);

  //document.body.appendChild(this.app.view);
  window.addEventListener("resize", this.app.onResize);
  this.app.onResize();

  return this.app;
}
