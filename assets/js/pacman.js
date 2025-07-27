class Pacman {
    constructor(x, y ,ancho, alto, velocidad){
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.velocidad = velocidad;
        this.direccion = 4;
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

    comer(){}

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
        return false;
    }

    colosionghost(){}

    cambiodireccion(){}

    cambioanimacion(){
        this.FrameActual == this.FrameActual == this.ContadorFrame ? 1 : this.FrameActual + 1;
    }

    dibujar(){}

    mapaaEjex(){
        return parseInt(this.x / Bloques);
    }

    mapaaEjey(){
        return parseInt(this.y / Bloques);
    }

    direccionmapaaEjex(){
        return parseInt((this.x + 0.9999 * Bloques) / Bloques);
    }

    direccionmapaaEjey(){
        return parseInt((this.y + 0.9999 * Bloques) / Bloques);
    }
}
