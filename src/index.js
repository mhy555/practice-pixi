import 'pixi.js'

const BG_COLOR = 0xC0C0C0
var catPic = require('./images/cat.png');
var fishPic = require('./images/fishes.png');
var mapPic = require('./images/map.png');
var wavesPic = require('./images/waves.png');
var pixiSprite = require('./images/pixiSprite.png');
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
  .add("fishImage", fishPic)
  .add("map", mapPic)
  .add("wave", wavesPic)
  .add("pixiSprite", pixiSprite)
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {
  //If you gave your files names as the first argument
  //of the `add` method, you can access them like this
  console.log("loading: " + resource.name);

  //Display the file `url` currently being loaded
  // console.log("loading: " + resource.url);

  //Display the precentage of files currently loaded
  console.log("progress: " + loader.progress + "%");
}



//This `setup` function will run when the image has loaded
function setup() {
  var catX = 0;
  var catY = 0;
  console.log("All files loaded");

  //Create the `cat` sprite from the texture
  var cat = new PIXI.Sprite(
    PIXI.loader.resources.catImage.texture
  );
  cat.position.set(catX, catY);
  // setInterval(() => {
  //   console.log('add position', catPosition)
  //   catPosition++;
  //   cat.x = catPosition;
  //   cat.y = catPosition;
  // }, 1000)
  document.addEventListener('keydown', hlKeyEvent)

  //Change the sprite's size
  // cat.width = 80;
  // cat.height = 120;

  //Add the cat to the stage
  stage.addChild(cat);

  //Render the stage
  renderer.render(stage);

  // var TextureCache = PIXI.utils.TextureCache
  // //Create the `tileset` sprite from the texture
  // var texture = TextureCache[pixiSprite];
  //
  // //Create a rectangle object that defines the position and
  // //size of the sub-image you want to extract from the texture
  // var rectangle = new PIXI.Rectangle(96, 64, 32, 32);
  //
  // //Tell the texture to use that rectangular section
  // texture.frame = rectangle;
  //
  // //Create the sprite from the texture
  // var rocket = new PIXI.Sprite(texture);
  //
  // //Position the rocket sprite on the canvas
  // rocket.x = 32;
  // rocket.y = 32;
  //
  // //Add the rocket to the stage
  // stage.addChild(rocket);
  //
  // //Render the stage
  // renderer.render(stage);
  function hlKeyEvent(e) {
    console.log('key down');
    e=window.event||e;
    e.preventDefault();
     switch(e.keyCode){
      case 37: //左键
        cat.x -= 1;
        break;
      case 38: //向上键
        cat.y -= 1;
        break;
      case 39: //右键
        cat.x += 1;
        break;
      case 40: //向下键
        cat.y += 1;
        break;
      default:
        break;
     }
     console.log('x, y', cat.x, cat.y);
     renderer.render(stage);
  }
}
