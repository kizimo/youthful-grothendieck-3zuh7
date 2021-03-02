import * as PIXI from "pixi.js";

export default function Square(mass = 3, tint = "0xFF0000", x = 100, y = 100) {
  this.s = new PIXI.Sprite(PIXI.Texture.WHITE);
  this.s.position.set(x, y);
  this.s.width = 100;
  this.s.height = 100;
  this.s.tint = tint;
  this.s.acceleration = new PIXI.Point(0);
  this.s.mass = mass;

  this.s.mouseOnScreen = function (app, mouseCoords) {
    return (
      app.width > mouseCoords.x ||
      mouseCoords.x > 0 ||
      app.height > mouseCoords.y ||
      mouseCoords.y > 0
    );
  };

  this.s.mouseIsOver = function (m) {
    return (
      m.x > this.x &&
      m.x < this.x + this.width &&
      m.y > this.y &&
      m.y < this.y + this.height
    );
  };

  this.s.init = function (app, delta, mouseCoords, physics) {
    // Applied deacceleration for both squares, done by reducing the
    // acceleration by 0.01% of the acceleration every loop
    this.acceleration.set(
      this.acceleration.x * 0.99,
      this.acceleration.y * 0.99
    );
    // Check whether the green square ever moves off the screen
    // If so, reverse acceleration in that direction
    if (this.x < 0 || this.x > app.width - 100) {
      this.acceleration.x = -this.acceleration.x;
    }

    if (this.y < 0 || this.y > app.height - 100) {
      this.acceleration.y = -this.acceleration.y;
    }

    // If the mouse is off screen, then don't update any further
    if (this.mouseOnScreen(app, mouseCoords) && this.mouseIsOver(mouseCoords)) {
      // Get the red square's center point
      const thisSquareCenterPosition = new PIXI.Point(
        this.x + this.width * 0.5,
        this.y + this.height * 0.5
      );

      // Calculate the direction vector between the mouse pointer and
      // the red square
      const toMouseDirection = new PIXI.Point(
        mouseCoords.x - thisSquareCenterPosition.x,
        mouseCoords.y - thisSquareCenterPosition.y
      );

      // Use the above to figure out the angle that direction has
      const angleToMouse = Math.atan2(toMouseDirection.y, toMouseDirection.x);

      // Figure out the speed the square should be travelling by, as a
      // function of how far away from the mouse pointer the red square is

      const distMouseSquare = physics.distanceBetweenTwoPoints(
        mouseCoords,
        thisSquareCenterPosition
      );
      const redSpeed = distMouseSquare * physics.movementSpeed;

      // Calculate the acceleration of the red square
      this.acceleration.set(
        Math.cos(angleToMouse) * redSpeed,
        Math.sin(angleToMouse) * redSpeed
      );
    } else {
      // If the green square pops out of the coridor, it pops back into the
      // middle
      if (
        this.x < -30 ||
        this.x > app.width + 30 ||
        this.y < -30 ||
        this.y > app.height + 30
      ) {
        this.position.set((app.width - 100) / 2, (app.height - 100) / 2);
      }
    }

    this.x += this.acceleration.x * delta;
    this.y += this.acceleration.y * delta;
  };

  return this.s;
}
