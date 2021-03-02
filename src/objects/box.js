import * as PIXI from "pixi.js";

export default function Box() {
  this.box = new PIXI.Graphics();
  this.box.beginFill(0xffffff).drawRect(100, 100, 100, 100).endFill();
  this.box.interactive = true;
  this.box.on("mouseover", () => {
    this.box.clear();
    this.box.beginFill(0xffffff).drawRect(100, 100, 100, 100).endFill();
  });
  this.box.on("mouseout", () => {
    this.box.clear();
    this.box.beginFill(0xff0000).drawRect(100, 100, 100, 100).endFill();
  });
  this.box.on("mousemove", () => {
    this.box.clear();
    this.box
      .beginFill(Math.round(Math.random() * 0xffffff))
      .drawRect(100, 100, 100, 100)
      .endFill();
  });
  return this.box;
}
