export function magnitude(xy) {
    return Math.sqrt(xy[0] * xy[0] + xy[1] * xy[1]);
}

export function normalize(xy){
    let mag = magnitude(xy);
    if (mag > 0) {
        xy[0] /= mag;
        xy[1] /= mag;
    }
    return xy;
}

export function pixelPerfect(a){
    let b = a%pixelScale;
    return a-b;
}

export function createArray(length) {
    let arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        let args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}