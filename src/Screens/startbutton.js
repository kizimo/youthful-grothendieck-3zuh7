import * as PIXI from "pixi.js";
import FancyText from "../utils/fancytext";

export default function StartButton(app) {
  this.container = new PIXI.Container();
  this.container.position = new PIXI.Point(
    (app.screen.width - 250) / 2,
    (app.screen.height - 100) / 2
  );

  const newtext = new FancyText("START", 0, 0, 100);
  this.container.addChild(newtext);

  newtext.interactive = true;
  newtext.buttonMode = true;

  newtext.click = () => {
    this.container.removeChild(newtext);
    app.bg.engage(() => {
      app.goToGame();
    });
  };

  return this.container;
}
