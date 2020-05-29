let canvas, ctx;
let actualSize , gameSize, cameraOffset = [0,0], tileMap; //2D int array
let ppu = 16, pixelScale = 4; //Ints
let currentKeys = {}; //Keys pressed down
let imgMap = {}; //Image map obj

let controls = {
    "w": "up",
    "s": "down",
    "a": "left",
    "d": "right",
    " ": "interact",
    "f5": "reloadPage"
};

const characterVars = {
    movementSpeed: 2
};

let colorMap = {
    "tile": [56, 183, 100, 255],
    "wall": [86, 108, 134, 255]
};