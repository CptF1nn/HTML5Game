import run from "./main.js";

document.addEventListener("keydown", (e) => {
    e.preventDefault();
    currentKeys[e.key.toLowerCase()] = true;
    return false;
});

document.addEventListener("keyup", (e) => {
    e.preventDefault();
    currentKeys[e.key.toLowerCase()] = false;
    return false;
});

run();