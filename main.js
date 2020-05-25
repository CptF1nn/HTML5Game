import loadAllImages from './images.js';

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

function render() {
    for (let x = 0; x < gameSize[0]; x++) {
        for (let y = 0; y < gameSize[1]; y++) {
            ctx.drawImage(tiles["tile"],
                pixelPos(x) + cameraOffset[0],
                pixelPos(y) + cameraOffset[1],
                pixelSize(), pixelSize());
        }
    }
}

function moveCamera(vec) {
    cameraOffset[0]+=vec[0];
    cameraOffset[1]+=vec[1];
}

function checkInput(){
    let inputVector = [0,0];
    const input = {};
    for (const key in currentKeys) {
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
    moveCamera(inputVector);

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