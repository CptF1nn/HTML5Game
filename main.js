let canvas, ctx;
let actualSize = [1280, 768], gameSize; //2D int array
let ppu = 16, pixelScale = 4; //Ints
let tiles = []; //Image array

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function pixelSize(){
    return ppu*pixelScale;
}
function pixelPos(pos){
    return pos*pixelSize();
}

function loadGame(){
    return new Promise(resolve => {
       loadImage("img/tile.png")
           .then(img =>
               tiles.push(img)
           ).then(resolve)});
}

function loadImage(url){
    return new Promise(img => {
        const image = new Image();
        image.addEventListener('load', () =>{
            img(image);
        });
        image.src = url;
    });
}

function render(){
    for (let x = 0; x < gameSize[0]; x++){
        for (let y = 0; y < gameSize[1]; y++){
            ctx.drawImage(tiles[0], pixelPos(x), pixelPos(y), pixelSize(), pixelSize());
        }
    }
}

async function run(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    gameSize = [actualSize[0] / ppu / pixelScale, actualSize[1] / ppu / pixelScale];
    ctx.imageSmoothingEnabled = false;
    loadGame().then(render);
    let i = 0;
    let fps = 60;
    while (1){
        i++;
        if (i >= fps) i = 0;
        await sleep(1000/fps);
    }
}