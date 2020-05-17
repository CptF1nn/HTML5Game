let canvas;
let actualSize = [1280, 720];
let gameSize = [20, 11.25];

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run(){
    canvas = document.getElementById("canvas");
    let i = 0;
    let fps = 60;
    while (1){
        i++;
        console.log(i.toString());
        if (i >= fps) i = 0;
        await sleep(1000/fps);
    }
}