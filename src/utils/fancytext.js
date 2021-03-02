import * as PIXI from "pixi.js";

export default function FancyText(text = "", x = 0, y = 0) {
  this.style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fontStyle: "italic",
    fontWeight: "bold",
    fill: ["#ffffff", "#00ff99"], // gradient
    stroke: "#4a1850",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: "round"
  });

  this.richText = new PIXI.Text(text, this.style);
  this.richText.x = 50;
  this.richText.y = 220;
  return this.richText;
}
