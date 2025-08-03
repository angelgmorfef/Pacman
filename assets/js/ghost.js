class Fantasma {
    constructor(x, y ,width, height, velocidad, imagenx, imageny, imgAncho, imgAlto, rango){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocidad = velocidad;
        this.direccion = direccion_derecha;
        this.imagenx = imagenx;
        this.imageny = imageny;
        this.imgAncho = imgAncho;
        this.imgAlto = imgAlto;
        this.rango = rango;
        this.objetivosRandomIndex = parseInt(Math.random() * 4);
        this.objetivo = objetivosRandom[this.objetivosRandomIndex];
        setInterval(() => {
        this.direccionRandom();
        }, 10000);
    }

    direccionRandom() {
        this.objetivosRandomIndex += 1;
        this.objetivosRandomIndex = this.objetivosRandomIndex % 4;
    }

    movimiento(){
        if (this.RangoconPacman()) {
            this.objetivo = pacman;
        }else{
            this.objetivo = objetivosRandom[this.objetivosRandomIndex];
        }
        this.cambiodireccion();
        this.adelante();
        if (this.colision()) {
            this.atras();
            return;
        }
    }

    adelante(){
        switch (this.direccion) {
        case direccion_derecha:
            this.x += this.velocidad;
            break;
        case direccion_arriba: 
            this.y -= this.velocidad;
            break;
        case direccion_izquierda: 
            this.x -= this.velocidad;
            break;
        case direccion_abajo: 
            this.y += this.velocidad;
            break;
        }
    }

    atras(){
        switch (this.direccion) {
        case direccion_derecha: 
            this.x -= this.velocidad;
            break;
        case direccion_arriba: 
            this.y += this.velocidad;
            break;
        case direccion_izquierda: 
            this.x += this.velocidad;
            break;
        case direccion_abajo: 
            this.y -= this.velocidad;
            break;
        }
    }

    colision(){
    let colisionado = false;
        if (
            mapa[parseInt(this.y / Bloques)]        [parseInt(this.x / Bloques)] == 1 ||
            mapa[parseInt(this.y / Bloques + 0.9999)][parseInt(this.x / Bloques)] == 1 ||
            mapa[parseInt(this.y / Bloques)][parseInt(this.x / Bloques + 0.9999)] == 1 ||
            mapa[parseInt(this.y / Bloques + 0.9999)][parseInt(this.x / Bloques + 0.9999)] == 1
        ) {
        colisionado = true;
        }
        return colisionado;
    }

    RangoconPacman(){
        let distanciaX = Math.abs(pacman.mapaaEjex() - this.mapaaEjex());
        let distanciaY = Math.abs(pacman.mapaaEjey() - this.mapaaEjey());
        if(Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY) <= this.rango)
            {
            return true;
            }
        return false;
    }

    cambiodireccion() {
        let direccionTemporal = this.direccion;
        this.direccion = this.NuevaDireccion(
            mapa,
            parseInt(this.objetivo.x / Bloques),
            parseInt(this.objetivo.y / Bloques)
        );
        if (typeof this.direccion == "undefined") {
            this.direccion = direccionTemporal;
            return;
        }
        if (
            this.mapaaEjey() != this.direccionmapaaEjey() &&
            (this.direccion == direccion_izquierda ||
                this.direccion == direccion_derecha)
        ) {
            this.direccion = direccion_arriba;
        }
        if (
            this.mapaaEjex() != this.direccionmapaaEjex() &&
            this.direccion == direccion_arriba
        ) {
            this.direccion = direccion_izquierda;
        }
        this.adelante();
        if (this.colision()) {
            this.atras();
            this.direccion = direccionTemporal;
        } else {
            this.atras();
        }
        console.log(this.direccion);
    }

    NuevaDireccion(mapa, objetivoX, objetivoY) {
        let mp = [];
        for (let i = 0; i < mapa.length; i++) {
            mp[i] = mapa[i].slice();
        }

        let vecinos = [
            {
                x: this.mapaaEjex(),
                y: this.mapaaEjey(),
                rightX: this.direccionmapaaEjex(),
                rightY: this.direccionmapaaEjey(),
                moves: [],
            },
        ];
        while (vecinos.length > 0) {
            let poped = vecinos.shift();
            if (poped.x == objetivoX && poped.y == objetivoY) {
                return poped.moves[0];
            } else {
                mp[poped.y][poped.x] = 1;
                let listadevecinos = this.AggregarVecinos(poped, mp);
                for (let i = 0; i < listadevecinos.length; i++) {
                    vecinos.push(listadevecinos[i]);
                }
            }
        }
        return 1; 
    }

    AggregarVecinos(poped, mp){
        let vecinos = [];
        let numeroFilas = mp.length;
        let numeroColumnas = mp[0].length;

        if (
            poped.x - 1 >= 0 &&
            poped.x - 1 < numeroFilas &&
            mp[poped.y][poped.x - 1] != 1
        ) {
            let direccionTemporal = poped.moves.slice();
            direccionTemporal.push(direccion_izquierda);
            vecinos.push({ x: poped.x - 1, y: poped.y, moves: direccionTemporal });
        }
        if (
            poped.x + 1 >= 0 &&
            poped.x + 1 < numeroFilas &&
            mp[poped.y][poped.x + 1] != 1
        ) {
            let direccionTemporal = poped.moves.slice();
            direccionTemporal.push(direccion_derecha);
            vecinos.push({ x: poped.x + 1, y: poped.y, moves: direccionTemporal });
        }
        if (
            poped.y - 1 >= 0 &&
            poped.y - 1 < numeroColumnas &&
            mp[poped.y - 1][poped.x] != 1
        ) {
            let direccionTemporal = poped.moves.slice();
            direccionTemporal.push(direccion_arriba);
            vecinos.push({ x: poped.x, y: poped.y - 1, moves: direccionTemporal });
        }
        if (
            poped.y + 1 >= 0 &&
            poped.y + 1 < numeroColumnas &&
            mp[poped.y + 1][poped.x] != 1
        ) {
            let direccionTemporal = poped.moves.slice();
            direccionTemporal.push(direccion_abajo);
            vecinos.push({ x: poped.x, y: poped.y + 1, moves: direccionTemporal });
        }
        return vecinos;
    }

    dibujar() {
        canvasContenido.save();
        canvasContenido.drawImage(
            fantasmasFrames, 
            this.imagenx,
            this.imageny,
            this.imgAncho,
            this.imgAlto,
            this.x,
            this.y,
            this.width,
            this.height
        );
        canvasContenido.restore();
        canvasContenido.beginPath();
        canvasContenido.strokeStyle = "red";
        canvasContenido.arc(this.x + Bloques / 2, this.y + Bloques / 2, this.rango * Bloques, 0, Math.PI * 2);
        //canvasContenido.stroke();
    }

    mapaaEjex(){
        let mapX = parseInt(this.x / Bloques);
        return mapX;
    }

    mapaaEjey(){
        let mapY = parseInt(this.y / Bloques);
        return mapY;
    }

    direccionmapaaEjex(){
        let mapX = parseInt((this.x + 0.99 * Bloques) / Bloques);
        return mapX;
    }

    direccionmapaaEjey(){
        let mapY = parseInt((this.y + 0.99 * Bloques) / Bloques);
        return mapY;
    }
}

let updateGhosts = () => {
    for (let i = 0; i < fantasmas.length; i++) {
        fantasmas[i].movimiento();
    }
};
