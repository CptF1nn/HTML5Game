let canvas, ctx;
let actualSize , gameSize, cameraOffset = [0,0]; //2D int array
let ppu = 16, pixelScale = 4; //Ints
let currentKeys = {}; //Keys pressed down
let tiles = {}; //Image map obj

let controls = {
    "w": "up",
    "s": "down",
    "a": "left",
    "d": "right",
    " ": "interact"
}