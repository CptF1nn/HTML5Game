export let tiles = {} //Image map obj
export async function loadAllImages()
{
    let promises = [];
    for (const [key, value] of Object.entries(srcMap)){
        promises.push(loadImage(value).then(img => pushToMap(img, key)));
    }

    await Promise.allSettled(promises);
}

function pushToMap(img, id){
    tiles[id] = img;
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

//Config

let srcMap = {
    "tile": "img/tile.png"

}