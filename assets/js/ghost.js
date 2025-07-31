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

        setInterval(() => {
        this.direccionRandom();
        }, 100);
    }

    direccionRandom() {
    let addition = 1;
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

    comer(){
        for (let i = 0; i < mapa.length; i++) {
            for (let j = 0; j < mapa[0].length; j++) {
                if (
                    mapa[i][j] == 2 &&
                    this.mapaaEjex() == j &&
                    this.mapaaEjey() == i
                ) {
                    mapa[i][j] = 3;
                    score++;
                }
            }
        }
    }

    adelante(){
        switch (this.direccion) {
        case direccion_derecha:
            this.x += this.velocidad;
            break;
        case direccion_arriba: // Up
            this.y -= this.velocidad;
            break;
        case direccion_izquierda: // Left
            this.x -= this.velocidad;
            break;
        case direccion_abajo: // Bottom
            this.y += this.velocidad;
            break;
        }
    }

    atras(){
        switch (this.direccion) {
        case direccion_derecha: // Right
            this.x -= this.velocidad;
            break;
        case direccion_arriba: // Up
            this.y += this.velocidad;
            break;
        case direccion_izquierda: // Left
            this.x += this.velocidad;
            break;
        case direccion_abajo: // Bottom
            this.y -= this.velocidad;
            break;
        }
    }

    colision(){
    let colisionado = false;
        if (mapa[parseInt(this.y / Bloques)][parseInt(this.x / Bloques)] == 1 ||
            mapa[parseInt(this.y / Bloques + 0.9999)][parseInt(this.x / Bloques)] == 1 ||
            mapa[parseInt(this.y / Bloques)][parseInt(this.x / Bloques + 0.9999)] == 1 ||
            mapa[parseInt(this.y / Bloques + 0.9999)][parseInt(this.x / Bloques + 0.9999)] == 1)
        {
        colisionado = true;
        }
        return colisionado;
    }

    colosionghost(){}

    RangoconPacman(){
        let distanciaX = Math.abs(pacman.mapaaEjex() - this.mapaaEjex());
        let distanciaY = Math.abs(pacman.mapaaEjey() - this.mapaaEjey());
        if(Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY) <= this.rango)
            {
            return true;
            }
        return false;
    }

    NuevaDireccion(mapa, objetivoX, objetivoY){
       let mp = [];
        for (let i = 0; i < mapa.length; i++) {
            mp[i] = mapa[i].slice();
        }

        let ruta = [
            {
                x: this.getMapX(),
                y: this.getMapY(),
                rightX: this.getMapXRightSide(),
                rightY: this.getMapYRightSide(),
                moves: [],
            },
        ];
        while (ruta.length > 0) {
            let poped = ruta.shift();
            if (poped.x == destX && poped.y == destY) {
                return poped.moves[0];
            } else {
                mp[poped.y][poped.x] = 1;
                let neighborList = this.addNeighbors(poped, mp);
                for (let i = 0; i < neighborList.length; i++) {
                    ruta.push(neighborList[i]);
                }
            }
        }

        return 1;   
    }

    AggregarVecinos(poped, mapa){
        let vecinos = [];
        let numOfRows = mp.length;
        let numOfColumns = mp[0].length;

        if (
            poped.x - 1 >= 0 &&
            poped.x - 1 < numOfRows &&
            mp[poped.y][poped.x - 1] != 1
        ) {
            let tempMoves = poped.moves.slice();
            tempMoves.push(DIRECTION_LEFT);
            ruta.push({ x: poped.x - 1, y: poped.y, moves: tempMoves });
        }
        if (
            poped.x + 1 >= 0 &&
            poped.x + 1 < numOfRows &&
            mp[poped.y][poped.x + 1] != 1
        ) {
            let tempMoves = poped.moves.slice();
            tempMoves.push(DIRECTION_RIGHT);
            ruta.push({ x: poped.x + 1, y: poped.y, moves: tempMoves });
        }
        if (
            poped.y - 1 >= 0 &&
            poped.y - 1 < numOfColumns &&
            mp[poped.y - 1][poped.x] != 1
        ) {
            let tempMoves = poped.moves.slice();
            tempMoves.push(DIRECTION_UP);
            ruta.push({ x: poped.x, y: poped.y - 1, moves: tempMoves });
        }
        if (
            poped.y + 1 >= 0 &&
            poped.y + 1 < numOfColumns &&
            mp[poped.y + 1][poped.x] != 1
        ) {
            let tempMoves = poped.moves.slice();
            tempMoves.push(DIRECTION_BOTTOM);
            ruta.push({ x: poped.x, y: poped.y + 1, moves: tempMoves });
        }
        return ruta;
    }

    cambiodireccion(){
    let direccionTemporal = this.direccion;

        this.direccion = this.NuevaDireccion(
            mapa, parseInt(this.objetivo.x / Bloques), parseInt(this.objetivo.y / Bloques),
        );

        this.adelante();
        if (this.colision()) {
            this.atras();
            this.direccion = direccionTemporal;
        } else {
            this.atras();
        }
    }

    cambioanimacion(){
        this.FrameActual = this.FrameActual == this.ContadorFrame ? 1 : this.FrameActual + 1;
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
