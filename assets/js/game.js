const canvas = document.getElementById("canvas");
const canvasContenido = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animacion");
const fantasmasFrames = document.getElementById("fantasmas");

let createRect = (x, y, width, height, color) => {
    canvasContenido.fillStyle = color;
    canvasContenido.fillRect(x, y, width, height);
};

let fps = 30;
let pacman;
let Bloques = 20;
let EspacioMuros = Bloques / 1.5;
let SinMuros = (Bloques-EspacioMuros)/2;
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
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
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
    dibujar();
};

let update = () => {
    pacman.movimiento();
}

let dibujar = () => {
    createRect(0, 0, canvas.width, canvas.height, "black");
    DiseMuros();
    pacman.dibujar();
}

let gameInterval = setInterval(gameloop, 1000 / fps);

let DiseMuros = () => {
    for (let i = 0; i < mapa.length; i++) {
        for (let j = 0; j < mapa[0].length; j++) {
            if (mapa[i][j] == 1) {
                createRect(
                    j * Bloques,
                    i * Bloques,
                    Bloques,
                    Bloques,
                    "#342DCA"
                );
                if (j > 0 && mapa[i][j - 1] == 1) {
                    createRect(
                        j * Bloques,
                        i * Bloques + SinMuros,
                        EspacioMuros + SinMuros,
                        EspacioMuros,
                        MurodeColor
                    );
                }

                if (j < mapa[0].length - 1 && mapa[i][j + 1] == 1) {
                    createRect(
                        j * Bloques + SinMuros,
                        i * Bloques + SinMuros,
                        EspacioMuros + SinMuros,
                        EspacioMuros,
                        MurodeColor
                    );
                }

                if (i < mapa.length - 1 && mapa[i + 1][j] == 1) {
                    createRect(
                        j * Bloques + SinMuros,
                        i * Bloques + SinMuros,
                        EspacioMuros,
                        EspacioMuros + SinMuros,
                        MurodeColor
                    );
                }

                if (i > 0 && mapa[i - 1][j] == 1) {
                    createRect(
                        j * Bloques + SinMuros,
                        i * Bloques,
                        EspacioMuros,
                        EspacioMuros + SinMuros,
                        MurodeColor
                    );
                }
            }
        }
    }
};

let NuevoPacman = () => {
    pacman = new Pacman(
        Bloques, 
        Bloques, 
        Bloques, 
        Bloques, 
        Bloques / 5
    );
};

NuevoPacman();

gameloop();

window.addEventListener("keydown", (event) => {
    let k = event.keyCode;
    setTimeout(() => {
        if (k == 37 || k == 65) {
            pacman.NuevaDireccion = direccion_izquierda;
        } else if (k == 38 || k == 87) {
            pacman.NuevaDireccion = direccion_arriba;
        } else if (k == 39 || k == 68) {
            pacman.NuevaDireccion = direccion_derecha;
        } else if (k == 40 || k == 83) {
            pacman.NuevaDireccion = direccion_abajo;
        }
    }, 1);
});