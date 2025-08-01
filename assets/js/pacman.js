class Pacman {
    constructor(x, y ,width, height, velocidad){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocidad = velocidad;
        this.direccion = 4;
        this.NuevaDireccion = this.direccion;
        this.FrameActual= 1;
        this.ContadorFrame = 7;
        setInterval(() => {
        this.cambioanimacion();
        }, 100);
    }

    movimiento(){
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

    colosionfantasmas(fantasmas){
        for (let i = 0; i < fantasmas.length; i++) {
            let fantasma = fantasmas[i];
            if (
                fantasma.mapaaEjex() == this.mapaaEjex() &&
                fantasma.mapaaEjey() == this.mapaaEjey()
            ) {
                return true;
            }
        }
        return false;
    }

    cambiodireccion(){
        if (this.direccion == this.NuevaDireccion) return;
        let direccionTemporal = this.direccion;
        this.direccion = this.NuevaDireccion;
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

    
    dibujar() {
        canvasContenido.save();
        canvasContenido.translate(
            this.x + Bloques / 2,
            this.y + Bloques / 2
        );
        canvasContenido.rotate((this.direccion * 90 * Math.PI) / 180);
        canvasContenido.translate(
            -this.x - Bloques / 2,
            -this.y - Bloques / 2
        );
        canvasContenido.drawImage(
            pacmanFrames,
            (this.FrameActual - 1) * Bloques,
            0,
            Bloques,
            Bloques,
            this.x,
            this.y,
            this.width,
            this.height
        );
        canvasContenido.restore();
    }
}

