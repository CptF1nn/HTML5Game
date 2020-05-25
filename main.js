import {tiles, loadAllImages} from './images.js';
let canvas, ctx;
let actualSize , gameSize; //2D int array
let ppu = 16, pixelScale = 4; //Ints

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function pixelSize(){
    return ppu*pixelScale;
}
function pixelPos(pos){
    return pos*pixelSize();
}

async function loadGame(){
    /*TODO:
        Go through all images in img
        Load images to dictionary
        gradually load-bar
     */
    await loadAllImages();
}

function render(){
    for (let x = 0; x < gameSize[0]; x++){
        for (let y = 0; y < gameSize[1]; y++){
            ctx.drawImage(tiles["tile"], pixelPos(x), pixelPos(y), pixelSize(), pixelSize());
        }
    }
}

export default async function run(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    actualSize = [canvas.offsetWidth, canvas.offsetHeight];
    gameSize = [actualSize[0] / ppu / pixelScale, actualSize[1] / ppu / pixelScale];
    ctx.imageSmoothingEnabled = false;
    await loadGame();
    render();
    let i = 0;
    let fps = 60;
    while (1){
        i++;
        if (i >= fps) i = 0;
        await sleep(1000/fps);
    }
}