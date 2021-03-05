import * as PIXI from "pixi.js";

const starAmount = 1000;
const fov = 20;
const baseSpeed = 0.025;
const stars = [];
const starStretch = 5;
const starBaseSize = 0.05;

export default function BackGround(app) {
  this.container = new PIXI.Container();
  this.container.position = new PIXI.Point(0, 0);
  this.cameraZ = 0;
  this.speed = 0;
  let warpSpeed = 0;

  this.randomizeStar = function (star, initial) {
    star.z = initial
      ? Math.random() * 2000
      : this.cameraZ + Math.random() * 1000 + 2000;
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;
    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
  };

  this.container.engage = function (cb) {
    warpSpeed = 1;
    setTimeout(() => {
      warpSpeed = 0;
      cb();
    }, 5000);
  };
  for (let i = 0; i < starAmount; i++) {
    const star = {
      sprite: new PIXI.Sprite(app.loader.resources.starTexture.texture),
      z: 0,
      x: 0,
      y: 0
    };
    star.sprite.anchor.x = 0.5;
    star.sprite.anchor.y = 0.7;
    this.randomizeStar(star, true);
    this.container.addChild(star.sprite);
    stars.push(star);
  }

  app.ticker.add((delta) => {
    // Simple easing. This should be changed to proper easing function when used for real.
    this.speed += (warpSpeed - this.speed) / 20;
    this.cameraZ += delta * 10 * (this.speed + baseSpeed);
    for (let i = 0; i < starAmount; i++) {
      const star = stars[i];
      if (star.z < this.cameraZ) this.randomizeStar(star);

      // Map star 3d position to 2d with really simple projection
      const z = star.z - this.cameraZ;
      star.sprite.x =
        star.x * (fov / z) * app.renderer.screen.width +
        app.renderer.screen.width / 2;
      star.sprite.y =
        star.y * (fov / z) * app.renderer.screen.width +
        app.renderer.screen.height / 2;

      // Calculate star scale & rotation.
      const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
      const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
      const distanceCenter = Math.sqrt(
        dxCenter * dxCenter + dyCenter * dyCenter
      );
      const distanceScale = Math.max(0, (2000 - z) / 2000);
      star.sprite.scale.x = distanceScale * starBaseSize;
      // Star is looking towards center so that y axis is towards center.
      // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
      star.sprite.scale.y =
        distanceScale * starBaseSize +
        (distanceScale * this.speed * starStretch * distanceCenter) /
          app.renderer.screen.width;
      star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    }
  });

  return this.container;
}
