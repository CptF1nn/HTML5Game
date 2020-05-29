import {loadAllImages, loadMap, getTileFromColor} from './images.js';
import * as mathUtil from "./mathUtil.js";
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
        gradually load-bar
     */
    await loadAllImages();
    loadMap();
}

function render() {
    //Clear context
    ctx.clearRect(0,0, actualSize[0], actualSize[1]);

    //Render background
    for (let x = 0; x < imgMap["map"].width; x++) {
        for (let y = 0; y < imgMap["map"].height; y++) {
            let imgStr = getTileFromColor(tileMap[x][y]);
            let imgVar = imgMap[imgStr];
            ctx.drawImage(imgVar,
                mathUtil.pixelPerfect(pixelPos(x) - cameraOffset[0]),
                mathUtil.pixelPerfect(pixelPos(y) - cameraOffset[1]),
                pixelSize(), pixelSize());
        }
    }
    //Render player
    ctx.drawImage(imgMap["ninja"], mathUtil.pixelPerfect((actualSize[0]/2)-(pixelSize()/2)), mathUtil.pixelPerfect((actualSize[1]/2)-(pixelSize()/2)), pixelSize(), pixelSize());
}

function moveCamera(vec) {
    cameraOffset[0]+=vec[0] * characterVars.movementSpeed;
    cameraOffset[1]+=vec[1] * characterVars.movementSpeed;
}

function checkInput(){
    let inputVector = [0,0];
    const input = {};
    for (const key in currentKeys) {
        if (!currentKeys.hasOwnProperty(key) || !currentKeys[key]) {
            continue;
        }
        const control = controls[key];
        if (control) {
            input[control] = true;
        }
    }
    if (input["left"])
        inputVector[0] -= 1;
    if (input["right"])
        inputVector[0] += 1;
    if (input["up"])
        inputVector[1] -= 1;
    if (input["down"])
        inputVector[1] += 1;
    inputVector = mathUtil.normalize(inputVector);
    moveCamera(inputVector);

    if (input["reloadPage"])
        window.location.reload(true);

    if (inputVector[0] !== 0 || inputVector[1] !== 0)
        render();
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
        //Do this every frame
        checkInput()

        await sleep(1000/fps);
    }
}