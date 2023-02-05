---
hide_table_of_contents: true
---

# GSAP 3 Random Draw

```js playground
import * as PIXI from 'pixi.js';

const app = new PIXI.Application<HTMLCanvasElement>({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);

// We stop Pixi ticker using stop() function because autoStart = false does NOT stop the shared ticker:
// doc: http://pixijs.download/release/docs/PIXI.Application.html
app.ticker.stop();

// Global
let drawing = false;
let graphic = null;
let count = 0;

let xIni;
let yIni;

// Now, we use 'tick' from gsap
gsap.ticker.add(() => {
    draw();
    app.ticker.update();
});

function draw() {
    count += 5.0;
    if (!drawing) {
        drawing = true;
        graphic = new PIXI.Graphics();
        graphic.lineStyle(8, `0x${Math.floor(Math.random() * 16777215).toString(16)}`, 1);
        app.stage.addChild(graphic);
        xIni = Math.random() * 800;
        yIni = Math.random() * 600;
    } else if (count > 50) {
        count = 0;
        drawing = false;
    } else {
        graphic.moveTo(xIni, yIni);
        graphic.lineTo(xIni + Math.cos(count) * 20, yIni + Math.sin(count) * 20);
    }
}
```