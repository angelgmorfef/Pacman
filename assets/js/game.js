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
let score = 0;
let fantasmas = [];
let contadorFantasma = 4;
let vidas = 3;
let contadordeComida = 0;

const direccion_derecha = 4;
const direccion_arriba = 3;
const direccion_izquierda = 2;
const direccion_abajo = 1;

let UbicacionFantasmas = [
    { x: 0, y: 0 },
    { x: 176, y: 0 },
    { x: 0, y: 121 },
    { x: 176, y: 121 },
]

let mapa = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1],
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



let objetivosRandom = [
    { x: 1 * Bloques, y: 1 * Bloques },
    { x: 1 * Bloques, y: (mapa.length - 2) * Bloques },
    { x: (mapa[0].length - 2) * Bloques, y: 1 * Bloques },
    {
        x: (mapa[0].length - 2) * Bloques,
        y: (mapa.length - 2) * Bloques,
    },
];

let gameloop = () => {
    dibujar();
    update();
};

let update = () => {
    pacman.movimiento();
    pacman.comer();
    updateGhosts();
    if (pacman.colosionfantasmas(fantasmas)) {
        reiniciarpartida();
    }
}


let reiniciarpartida = () => {
    NuevoPacman();
    Fantasmas();
    vidas--;
    if (vidas == 0) {
        FindelJuego();
    }
}

let LasVidas = () => {
    canvasContenido.font = "20px Emulogic";
    canvasContenido.fillStyle = "white";
    canvasContenido.fillText("Lives:", 290, 500, Bloques * (mapa.length + 1));

    for (let i = 0; i < vidas; i++) {
        canvasContenido.drawImage(
            pacmanFrames,
            2 * Bloques,
            0,
            Bloques,
            Bloques,
            350 + i * Bloques,
            Bloques * mapa.length + 2,
            Bloques,
            Bloques
        );
    }
};

let FindelJuego = () => {
    gameover();
    clearInterval(gameInterval);
}

let gameover = () => {
    canvasContenido.font = "80px Emulogic";
    canvasContenido.fillStyle = "white";
    canvasContenido.fillText("Fin del Juego", 0, 250);
};

let comida = () => {
    for (let i = 0; i < mapa.length; i++) {
        for (let j = 0; j < mapa[0].length; j++) {
            if (mapa[i][j] == 2) {
                createRect(
                    j * Bloques + Bloques / 3,
                    i * Bloques + Bloques / 3,
                    Bloques / 3,
                    Bloques / 3,
                    "#FEB897"
                );
            }
        }
    }
}

let Record = () => {
    canvasContenido.font = "20px Emulogic";
    canvasContenido.fillStyle = "white";
    canvasContenido.fillText(
        "Score: " + score,
        10, 500,
        Bloques * (mapa.length + 1) + 10
    );
}

let dibujarFantasmas = () => {
    for (let i = 0; i < fantasmas.length; i++) {
    fantasmas[i].dibujar();
    }
}

let dibujar = () => {
    canvasContenido.clearRect(0, 0, canvas.width, canvas.height);
    createRect(0, 0, canvas.width, canvas.height, "black");
    DiseMuros();
    comida();
    Record();
    pacman.dibujar();
    dibujarFantasmas();
    LasVidas();
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

let Fantasmas = () => {
    fantasmas = [];
    for (let i = 0; i < contadorFantasma; i++) {
        let newFantasma = new Fantasma(
            9 * Bloques + (i % 2 == 0 ? 0 : 1) * Bloques,
            10 * Bloques + (i % 2 == 0 ? 0 : 1) * Bloques,
            Bloques,
            Bloques,
            pacman.velocidad / 2,
            UbicacionFantasmas[i % 4].x,
            UbicacionFantasmas[i % 4].y,
            124,
            116,
            6 + i
        );
        fantasmas.push(newFantasma);
    }
};

NuevoPacman();
Fantasmas();
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