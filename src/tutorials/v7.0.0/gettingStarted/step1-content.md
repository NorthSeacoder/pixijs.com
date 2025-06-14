# Getting Started

Welcome to the PixiJS tutorial!

Please go through the tutorial steps at your own pace and challenge yourself using the editor on the right hand side. Here PixiJS has already been included as guided under the [Getting Started](/7.x/guides/basics/getting-started) section. Let's start with the creation of a PixiJS canvas application and add its view to the DOM.

```javascript
// Create a PixiJS application of type canvas with specify background color and make it resize to the iframe window
const app = new PIXI.Application({
  background: '#1099bb',
  resizeTo: window,
});

// Adding the application's view to the DOM
document.body.appendChild(app.view);
```

When you are ready, proceed to the next exercise using the _Next >_ button below, or feel free to skip to any exercise using the drop-down menu on the top right hand corner of the card.
