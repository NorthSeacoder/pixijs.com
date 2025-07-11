import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });

document.body.appendChild(app.view);

// Css style for icons
const defaultIcon = "url('https://pixijs.com/assets/bunny.png'),auto";
const hoverIcon = "url('https://pixijs.com/assets/bunny_saturated.png'),auto";

// Add custom cursor styles
app.renderer.events.cursorStyles.default = defaultIcon;
app.renderer.events.cursorStyles.hover = hoverIcon;

// create a background...
const background = PIXI.Sprite.from('https://pixijs.com/assets/bg_button.jpg');

background.width = app.screen.width;
background.height = app.screen.height;
// add background to stage...
app.stage.addChild(background);

// create some textures from an image path
const textureButton = PIXI.Texture.from('https://pixijs.com/assets/button.png');
const textureButtonDown = PIXI.Texture.from('https://pixijs.com/assets/button_down.png');
const textureButtonOver = PIXI.Texture.from('https://pixijs.com/assets/button_over.png');

const buttons = [];

const buttonPositions = [175, 75, 655, 75, 410, 325, 150, 465, 685, 445];

for (let i = 0; i < 5; i++) {
  const button = new PIXI.Sprite(textureButton);

  button.cursor = 'hover';

  button.anchor.set(0.5);
  button.x = buttonPositions[i * 2];
  button.y = buttonPositions[i * 2 + 1];

  // make the button interactive...
  button.eventMode = 'static';

  button
    .on('pointerdown', onButtonDown)
    .on('pointerup', onButtonUp)
    .on('pointerupoutside', onButtonUp)
    .on('pointerover', onButtonOver)
    .on('pointerout', onButtonOut);

  // add it to the stage
  app.stage.addChild(button);

  // add button to array
  buttons.push(button);
}

// set some silly values...
buttons[0].scale.set(1.2);
buttons[2].rotation = Math.PI / 10;
buttons[3].scale.set(0.8);
buttons[4].scale.set(0.8, 1.2);
buttons[4].rotation = Math.PI;

function onButtonDown() {
  this.isdown = true;
  this.texture = textureButtonDown;
  this.alpha = 1;
}

function onButtonUp() {
  this.isdown = false;
  if (this.isOver) {
    this.texture = textureButtonOver;
  } else {
    this.texture = textureButton;
  }
}

function onButtonOver() {
  this.isOver = true;
  if (this.isdown) {
    return;
  }
  this.texture = textureButtonOver;
}

function onButtonOut() {
  this.isOver = false;
  if (this.isdown) {
    return;
  }
  this.texture = textureButton;
}
