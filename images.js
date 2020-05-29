import {createArray} from "./mathUtil.js";

export async function loadAllImages()
{
    let promises = [];
    for (const [key, value] of Object.entries(srcMap)){
        promises.push(loadImage(value).then(img => pushToMap(img, key)));
    }

    await Promise.allSettled(promises);
}

function pushToMap(img, id){
    imgMap[id] = img;
}

function loadImage(url){
    return new Promise(resolver => {
        const image = new Image();
        image.addEventListener('load', () =>{
            resolver(image);
        });
        image.src = url;
    });
}

export function getTileFromColor(colorData){
    let toReturn = "";
    Object.keys(colorMap).forEach(function(key){
        if (colorData[0] === colorMap[key][0] && colorData[1] === colorMap[key][1] && colorData[2] === colorMap[key][2]){
            toReturn = key;
        }
    });
    return toReturn;
}

export function loadMap(){
    let mapCanvas = document.createElement('canvas');
    mapCanvas.width = imgMap["map"].width;
    mapCanvas.height = imgMap["map"].height;
    let mapCtx = mapCanvas.getContext('2d');
    mapCtx.drawImage(imgMap["map"], 0,0);
    tileMap = createArray(imgMap["map"].width, imgMap["map"].height);
    for (let x = 0; x < imgMap["map"].width; x++) {
        for (let y = 0; y < imgMap["map"].height; y++) {
            tileMap[x][y] = mapCtx.getImageData(x, y, 1, 1).data;
        }
    }
}

//Config

let srcMap = {
    "tile": "img/tile.png",
    "ninja": "img/ninja.png",
    "wall": "img/wall.png",
    "map": "img/map.png"
}

