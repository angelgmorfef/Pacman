const canvas = document.getElementById("canvas");
const canvasContenido = canvas.getContext("2d");
const packmanFrames = document.getElementById("animacion");
const fantasmasFrames = document.getElementById("fantasmas");

let createRect = (x, y, width, height, color) => {
    canvasContenido.fillStyle = color;
    canvasContenido.fillRect(x, y, width, height);
};

let fps = 30;
let Bloques = 20;
let Muros = Bloques/1.6;
let SinMuros = (Bloques-Muros)/2;
let MurodeColor = "black";

const direccion_derecha = 4;
const direccion_arriba = 3;
const direccion_izquierda = 2;
const direccion_abajo = 1;

let mapa = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let gameloop = () =>{
    update();
    draw();
}

let update = () => {

}

let draw = () => {
    DiseMuros();
}

let gameinterval = setInterval(gameloop, 1000 / fps);

let DiseMuros = () => {
    for(let i=0; i<mapa.length; i++){
        for(let j=0; j<mapa[0].length; j++){
            if(mapa[i][j] == 1){
                createRect(j * Bloques, i * Bloques, Bloques, Bloques, "blue");
                if(j>0 && mapa[i][j-1] == 1){
                    createRect(j * Bloques, i * Bloques+SinMuros, Muros+SinMuros, Muros, MurodeColor);
                }
                if (j < mapa[0].length - 1 && mapa[i][j + 1] == 1) {
                    createRect(
                        j * Bloques + SinMuros,
                        i * Bloques + SinMuros,
                        Muros + SinMuros,
                        Muros,
                        MurodeColor
                    );
                }
                if (i < mapa.length - 1 && mapa[i + 1][j] == 1) {
                    createRect(
                        j * Bloques + SinMuros,
                        i * Bloques + SinMuros,
                        Muros,
                        Muros + SinMuros,
                        MurodeColor
                    );
                }
                if (i > 0 && mapa[i - 1][j] == 1) {
                    createRect(
                        j * Bloques + SinMuros,
                        i * Bloques,
                        Muros,
                        Muros + SinMuros,
                        MurodeColor
                    );
                }
            }
        }
    }
}


