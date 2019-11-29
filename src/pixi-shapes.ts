import { Application } from "pixi.js";

//Aliases
let graphics = PIXI.Graphics;
//Create a Pixi Application
let app = new PIXI.Application({ 
    width: 700, 
    height: 600,                       
    transparent: false, 
    resolution: 1
  }
);

document.body.appendChild(app.view);

const background = PIXI.Sprite.from("images/backgroundBlue.jpg");
background.width    = app.screen.width;
background.height   = app.screen.height;
app.stage.addChild(background);

app.stage.interactive = true;
app.stage.buttonMode = true;
app.stage.on('pointerdown', onClick);

var gravity= parseFloat((<HTMLInputElement>document.getElementById("gravity")).value);
var gravityElement = document.getElementById("gravity");
gravityElement.addEventListener('change', setGravity);

function setGravity(){
    gravity = parseFloat((<HTMLInputElement>document.getElementById("gravity")).value);
}

//Generate a random shape on mouse click
function onClick() {
    let randomShape = Math.floor((Math.random() * 3) + 1);
    createShape(randomShape);
}

function randomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Return a random color for shapes
function randomColor() {
      var letters = '0123456789ABCDEF';
      var color = '0x';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
}
//Create a random shape
function createShape(shapeType:number){
    let shape = new graphics();
    shape.beginFill(Number(randomColor()));

    switch (shapeType) {
        case 1:
            shape.drawRect(0, 0, 64, 64);
            break;
        case 2:
            shape.drawCircle(0, 0, 32);    
            break;
        case 3:
            shape.drawEllipse(0, 0, 50, 20);
            break;
        default:
            console.log("Error");
    }

    shape.endFill();
    let x = randomInt(0, background.width);
    shape.x = x;
    shape.y = 0;
    app.stage.addChild(shape);

    //Add animation for shapes to fall down
    app.ticker.add(() => {
        shape.y += Number(gravity);
    });
}
