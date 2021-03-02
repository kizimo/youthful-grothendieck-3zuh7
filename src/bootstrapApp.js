// Adapted from: https://www.pixiplayground.com/

import * as PIXI from "pixi.js";

export function bootstrapApp() {
  /**
   * This is the default playground.
   * You should see a bunny spinning in the right preview pane.
   * Feel free to use this as a starting point for you own playground!
   */

  // Create our application instance
  var app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x2c3e50
  });
  document.body.appendChild(app.view);

  return app;
}
