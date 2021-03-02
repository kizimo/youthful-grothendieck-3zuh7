import * as PIXI from "pixi.js";
import FancyText from "../utils/fancytext";

export default function Loading(app) {
  this.container = new PIXI.Container();
  this.container.position = new PIXI.Point(
    (app.screen.width - 100) / 2,
    (app.screen.height - 100) / 2
  );
  const size = 100;
  const ballAmount = 7;
  const balls = [];
  for (let i = 0; i < ballAmount; i++) {
    const ball = PIXI.Sprite.from(
      "https://pixijs.io/examples/examples/assets/circle.png"
    );
    ball.anchor.set(0.5);
    this.container.addChild(ball);
    ball.position.set(
      size / 2 + (Math.cos((i / ballAmount) * Math.PI * 2) * size) / 3,
      size / 2 + (Math.sin((i / ballAmount) * Math.PI * 2) * size) / 3
    );
    balls.push(ball);
  }

  const newtext = new FancyText("loading", -20, 100);
  this.container.addChild(newtext);

  let phase = 0;

  // Listen for animate update
  app.ticker.add((delta) => {
    // Update phase
    phase += delta / 60;
    phase %= Math.PI * 2;

    // Update ball scales
    balls.forEach((b, i) => {
      const sin = Math.sin((i / ballAmount) * Math.PI - phase);
      // Multiply sin with itself to get more steeper edge.
      b.scale.set(Math.abs(sin * sin * sin * 0.5) + 0.5);
    });
  });

  return this.container;
}
