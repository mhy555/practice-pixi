import 'pixi.js'

const BG_COLOR = 0xC0C0C0
var catPic = require('../images/cat.png');
//Create the renderer
var renderer = PIXI.autoDetectRenderer(256, 256);

renderer.backgroundColor = BG_COLOR;
renderer.view.style.border = "1px dashed black";
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();

//Tell the `renderer` to `render` the `stage`
renderer.render(stage);

//Use Pixi's built-in `loader` object to load an image
PIXI.loader
  .add("catImage", catPic)
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler() {
  console.log('loading');
}

//This `setup` function will run when the image has loaded
function setup() {

  //Create the `cat` sprite from the texture
  var cat = new PIXI.Sprite(
    PIXI.loader.resources.catImage.texture
  );

  //Add the cat to the stage
  stage.addChild(cat);

  //Render the stage
  renderer.render(stage);
}
