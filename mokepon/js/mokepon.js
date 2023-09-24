// Se declaran las variables globales que van a mantener el estado del juego
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('Reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReinicar = document.getElementById('boton-reinicar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const mensajeDiv = document.getElementById('mensajes');  // Referencia al div de mensajes

const sectionMensajes = document.getElementById('mensajes')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const anchoMaximoDelMapa = 350

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos =[]
let ataqueJugador = []
let ataqueEnemigo =[]
let opcionDeMokepones
let mascotaJugador
let ataquesMokepon
let inputHipodoge 
let inputCapipepo 
let inputRatigueya
let inputLangostelvis
let inputPydos
let mascotajugadorObjeto
let inputTucansin 
let botonFuego 
let botonTierra
let botonAgua
let botones=[]
let indexAtaqueJugador
let indexAtaqueEnemigo
let ataquesMokeponEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
let tamañoBaseMascotas = 100
let tamañoRelativoMascotas = tamañoBaseMascotas / 800



class Mokepon {
    constructor(nombre, foto, vida, fotoMapa,id = null, x = 10, y = 10){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques =[]
        this.x = x
        this.y = y
        this.ancho = tamañoBaseMascotas
        this.alto = tamañoBaseMascotas
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
        this.relX = x / 800
        this.relY = y / 600
    }

    pintarMokepon() {
        lienzo.drawImage (
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let posicionesRelativasEnemigos = {
    Hipodoge: {x: 0.01, y: 0.45},
    Capipepo: {x: 0.55, y: 0.25},
    Ratigueya: {x: 0.93, y: 0.85},
    Langostelvis: {x: 0.15, y: 0.9},
    Pydos: {x: 0.93, y: 0.55},
    Tucansin: {x: 0.8, y: 0.25}
};

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', '5', './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', '5', './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', '5', './assets/ratigueya.png')
let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', '5', './assets/langostelvis.png')
let pydos = new Mokepon('Pydos','./assets/mokepons_mokepon_pydos_attack.png', '5', './assets/pydos.png')
let tucansin = new Mokepon('Tucansin','./assets/mokepons_mokepon_tucapalma_attack.png','5', './assets/tucansin.png')



const HIPODOGE_ATAQUES = [
    {nombre: '💧', id :'boton-agua'},
    {nombre: '💧', id :'boton-agua'},
    {nombre: '💧', id :'boton-agua'},
    {nombre: '🔥', id :'boton-fuego'},
    {nombre: '🌱', id :'boton-tierra'}
]

const CAPIPEPO_ATAQUES = [
    {nombre: '🌱', id :'boton-tierra'},
    {nombre: '🌱', id :'boton-tierra'},
    {nombre: '🌱', id :'boton-tierra'},
    {nombre: '💧', id :'boton-agua'},
    {nombre: '🔥', id :'boton-fuego'}
]

const RATIGUEYA_ATAQUES = [
    {nombre: '🔥', id :'boton-fuego'},
    {nombre: '🔥', id :'boton-fuego'},
    {nombre: '🔥', id :'boton-fuego'},
    {nombre: '🌱', id :'boton-tierra'},
    {nombre: '💧', id :'boton-agua'}
]

const LANGOSTELVIS_ATAQUES = [
    {nombre: '🔥', id :'boton-fuego'},
    {nombre: '💧', id :'boton-agua'},
    {nombre: '🔥', id :'boton-fuego'},
    {nombre: '🌱', id :'boton-tierra'},
    {nombre: '💧', id :'boton-agua'}
]

const PYDOS_ATAQUES = [
    {nombre: '🌱', id :'boton-tierra'},
    {nombre: '🔥', id :'boton-fuego'},
    {nombre: '🌱', id :'boton-tierra'},
    {nombre: '💧', id :'boton-agua'},
    {nombre: '🔥', id :'boton-fuego'}
]

const TUCANSIN_ATAQUES = [
    {nombre: '💧', id :'boton-agua'},
    {nombre: '🌱', id :'boton-tierra'},
    {nombre: '🌱', id :'boton-tierra'},
    {nombre: '💧', id :'boton-agua'},
    {nombre: '🔥', id :'boton-fuego'}
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)

pydos.ataques.push(...PYDOS_ATAQUES)

tucansin.ataques.push(...TUCANSIN_ATAQUES)  


mokepones.push(hipodoge,capipepo,ratigueya,langostelvis,pydos,tucansin)
// Esta función se ejecuta al cargar la página
function inicarJuego(){
    // Se obtienen los elementos del DOM y se les asigna un comportamiento
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    mokepones.forEach((mokepon)=> {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon ${mokepon.nombre}" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} 
        alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

         inputHipodoge = document.getElementById('Hipodoge')
         inputCapipepo = document.getElementById('Capipepo')
         inputRatigueya = document.getElementById('Ratigueya')
         inputLangostelvis = document.getElementById('Langostelvis')
         inputPydos = document.getElementById('Pydos')
         inputTucansin = document.getElementById('Tucansin')
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    
    botonReinicar.addEventListener('click', reiniciarJuego)

    UnirseAljuego()  
}

function UnirseAljuego() {
    fetch("http://localhost:8080/unirse")
        .then(function(res){
            
            if (res.ok) {
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta);
                        jugadorId = respuesta
                    })
            }
        })
}

// Esta función se ejecuta cuando se selecciona una mascota
function seleccionarMascotaJugador(){
    
    // Se comprueba qué mascota se ha seleccionado
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
    } 
    else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    } 
    else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
    } 
    else if (inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML = inputLangostelvis.id;
        mascotaJugador = inputLangostelvis.id;
    } 
    else if (inputPydos.checked) {
        spanMascotaJugador.innerHTML = inputPydos.id;
        mascotaJugador = inputPydos.id;
    } 
    else if (inputTucansin.checked) {
        spanMascotaJugador.innerHTML = inputTucansin.id;
        mascotaJugador = inputTucansin.id;
    } 
    else {
        alert('No has seleccionado nada');
        return; // Si no se ha seleccionado ninguna mascota, sale de la función aquí
    }

    seleccionarMokepon(mascotaJugador)

    // Si se ha seleccionado una mascota, se oculta la sección de selección de mascota
    sectionSeleccionarMascota.style.display = 'none';
    
    // Se selecciona una mascota para el enemigo y otras acciones relacionadas
    extraerAtaques(mascotaJugador);
    sectionVerMapa.style.display = 'flex';
    iniciarMapa();
    secuenciaAtaque()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify ({
        mokepon: mascotaJugador
        })
    })
    
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
   
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon = `
                <button id=${ataque.id} class="botones-ataques BAtaque">${ataque.nombre}</button>
            
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
        botonAgua = document.getElementById('boton-agua')
        botonFuego = document.getElementById('boton-fuego')
        botonTierra = document.getElementById('boton-tierra')
        botones = document.querySelectorAll('.BAtaque')
       
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            let tipoAtaque;

            switch (e.target.textContent) {
                case '🔥':
                    tipoAtaque = 'FUEGO';
                    break;
                case '💧':
                    tipoAtaque = 'AGUA';
                    break;
                default:
                    tipoAtaque = 'TIERRA';
                    break;
            }

            ataqueJugador.push(tipoAtaque);
            
            // Log the current attack array for debugging purposes
            console.log(ataqueJugador);

            boton.style.background = '#112f58';
            boton.disabled = true;

            if (ataqueJugador.length === 5) {
                enviarAtaques();  // Esta función enviará los ataques al servidor y procederá a esperar las elecciones del oponente.
            }
        });
    });
}


function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if(res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            clearInterval(intervalo); 
                            combate()
                        }
                    })
            }
        })
}


// Esta función selecciona una mascota para el enemigo de forma aleatoria
function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
    }



// Esta función genera un ataque aleatorio para el enemigo
function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}


function inicarPelea(){
    if (ataqueJugador.length ===5 ) {
        combate()
    }
}

function indexAmbosOponentes(jugador,enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)
    
    for (let index = 0; index < ataqueJugador.length; index++) {
        indexAmbosOponentes(index, index)

        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            crearMensaje("EMPATASTE 🥱")
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            spanVidasEnemigo.innerHTML = vidasEnemigo;
            crearMensaje("GANASTE 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            crearMensaje("GANASTE 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            crearMensaje("GANASTE 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE ❌")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVictorias();
}


function revisarVictorias() {
    // Si el enemigo ha perdido todas sus vidas, el jugador gana
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un EMPATE ❗")
    }
    // Si el jugador ha perdido todas sus vidas, el jugador pierde
    else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Felicitaciones , GANASTE 🏆")
    }
    else {
        crearMensajeFinal("Lo Siento , PERDISTE 👎")
    }
}

// Estas funciones crean mensajes en la sección de mensajes
function crearMensaje(resultado){
     // Limpiar los mensajes anteriores
     sectionMensajes.innerHTML = '';  

    let nuevoAtaqueDelJugador =document.createElement('p')
    let nuevoAtaqueDelEnemigo =document.createElement('p')

    sectionMensajes.innerHTML =resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML =indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    // Limpiando los mensajes anteriores
    sectionMensajes.innerHTML = '';

    let parrafo = document.createElement('p');
    parrafo.innerHTML = resultadoFinal;
    parrafo.classList.add('mensaje-final'); // Añade la clase "mensaje-final" al nuevo parrafo

    // Se añade el mensaje a la sección de mensajes
    sectionMensajes.appendChild(parrafo);


    

    // Se hace visible la sección de reinicio
    mensajes.style.display = 'block';
    sectionReiniciar.style.display = 'block'
}

// Esta función recarga la página para reiniciar el juego
function reiniciarJuego() {
    location.reload()
}

// Esta función genera un número aleatorio entre min y max
function aleatorio (min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    if (!mascotajugadorObjeto) {
        return; // Salir si mascotajugadorObjeto no está definido
    }

    mascotajugadorObjeto.x = mascotajugadorObjeto.x + mascotajugadorObjeto.velocidadX
    mascotajugadorObjeto.y = mascotajugadorObjeto.y + mascotajugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.clientWidth, mapa.height)
    lienzo.drawImage (
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotajugadorObjeto.pintarMokepon()

    enviarPosicon(mascotajugadorObjeto.x, mascotajugadorObjeto.y)
    mokeponesEnemigos.forEach(function(mokepon) {
        if (mokepon != undefined) {
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        }
    })
}
function enviarPosicon(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body : JSON.stringify({
            x,
            y
        })
    })
    .then(function (res){
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function(enemigo) {
                        let mokeponEnemigo = null;
                    
                        if (enemigo.mokepon !== undefined) {
                            const mokeponNombre = enemigo.mokepon.nombre || "";
                    
                            switch (mokeponNombre) {
                                case "Hipodoge":
                                    mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', '5', './assets/hipodoge.png', enemigo.id, posicionesRelativasEnemigos.Hipodoge.x * mapa.width, posicionesRelativasEnemigos.Hipodoge.y * mapa.height);
                                    break;
                                case "Capipepo":
                                    mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', '5', './assets/capipepo.png', enemigo.id, posicionesRelativasEnemigos.Capipepo.x * mapa.width, posicionesRelativasEnemigos.Capipepo.y * mapa.height);
                                    break;
                                case "Ratigueya":
                                    mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', '5', './assets/ratigueya.png', enemigo.id, posicionesRelativasEnemigos.Ratigueya.x * mapa.width, posicionesRelativasEnemigos.Ratigueya.y * mapa.height);
                                    break;
                                case "Langostelvis":
                                    mokeponEnemigo = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', '5', './assets/langostelvis.png', enemigo.id, posicionesRelativasEnemigos.Langostelvis.x * mapa.width, posicionesRelativasEnemigos.Langostelvis.y * mapa.height);
                                    break;
                                case "Pydos":
                                    mokeponEnemigo = new Mokepon('Pydos','./assets/mokepons_mokepon_pydos_attack.png', '5', './assets/pydos.png', enemigo.id, posicionesRelativasEnemigos.Pydos.x * mapa.width, posicionesRelativasEnemigos.Pydos.y * mapa.height);
                                    break;
                                case "Tucansin":
                                    mokeponEnemigo = new Mokepon('Tucansin','./assets/mokepons_mokepon_tucapalma_attack.png','5', './assets/tucansin.png', enemigo.id, posicionesRelativasEnemigos.Tucansin.x * mapa.width, posicionesRelativasEnemigos.Tucansin.y * mapa.height);
                                    break;
                                default:
                                    // Aquí puedes manejar cualquier otro caso que no se encuentre en los anteriores.
                                    break;
                            }
                    
                            mokeponEnemigo.x = enemigo.x;
                            mokeponEnemigo.y = enemigo.y;
                        }
                    
                        return mokeponEnemigo;
                    });
                    
                    
                })
        }
    })
}

function moverArriba() {
    mascotajugadorObjeto.velocidadY = -5
}

function moverAbajo() {
    mascotajugadorObjeto.velocidadY = 5
}

function moverDerecha() {
    mascotajugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotajugadorObjeto.velocidadX = -5
}

function detenerMovimiento() {
    mascotajugadorObjeto.velocidadX = 0
    mascotajugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'w':
            moverArriba()
            break;
        case 's':
            moverAbajo()
            break;
        case 'a':
            moverIzquierda()
            break;
        case 'd' :
            moverDerecha()
        break
        default:
            break;
    }

    // Actualizar propiedades relativas
    if (mascotajugadorObjeto) {
        mascotajugadorObjeto.relX = mascotajugadorObjeto.x / mapa.width;
        mascotajugadorObjeto.relY = mascotajugadorObjeto.y / mapa.height;
    }
}

function iniciarMapa() {
    mascotajugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotajugadorObjeto)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {
            let mokepon = mokepones[i];
            mokepon.ancho = tamañoBaseMascotas;
            mokepon.alto = tamañoBaseMascotas;
            return mokepon;
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo =enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota =mascotajugadorObjeto.y
    const abajoMascota = mascotajugadorObjeto.y + mascotajugadorObjeto.alto
    const derechaMascota = mascotajugadorObjeto.x + mascotajugadorObjeto.ancho
    const izquierdaMascota = mascotajugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
   // alert('Hay Colision con '  + enemigo.nombre)
}
/*function actualizarMascotaEnemiga(mascota, posiciones) {
    let nuevoTamaño = tamañoRelativoMascotas * mapa.width;
    mascota.x = posiciones.x * mapa.width;
    mascota.y = posiciones.y * mapa.height;
    mascota.ancho = nuevoTamaño;
    mascota.alto = nuevoTamaño;
}*/

function ajustarTamañoMapa(ancho, alto) {
    let anchoDelMapa = window.innerWidth - 20
    let alturaQueBuscamos = anchoDelMapa * 600 / 800
    let nuevoTamaño = tamañoRelativoMascotas * mapa.width

    // Si la resolución es 1920x1080, establecer el tamaño específico.
    if (window.innerWidth >= 1870 && window.innerWidth <= 1920 && window.innerHeight >= 930 && window.innerHeight <= 1080) {
        anchoDelMapa = 800;
        alturaQueBuscamos = anchoDelMapa * 600 / 800;
    } else {
        anchoDelMapa = window.innerWidth - 20;
        alturaQueBuscamos = anchoDelMapa * 600 / 800;
    }

    mapa.width = anchoDelMapa;
    mapa.height = alturaQueBuscamos;
    // Actualiza las dimensiones y posiciones de todas las mascotas enemigas:
    /*actualizarMascotaEnemiga(hipodogeEnemigo, posicionesRelativasEnemigos.Hipodoge);
    actualizarMascotaEnemiga(capipepoEnemigo, posicionesRelativasEnemigos.Capipepo);
    actualizarMascotaEnemiga(ratigueyaEnemigo, posicionesRelativasEnemigos.Ratigueya);
    actualizarMascotaEnemiga(langostelvisEnemigo, posicionesRelativasEnemigos.Langostelvis);
    actualizarMascotaEnemiga(pydosEnemigo, posicionesRelativasEnemigos.Pydos);
    actualizarMascotaEnemiga(tucansinEnemigo, posicionesRelativasEnemigos.Tucansin);
    
    if (anchoDelMapa > anchoMaximoDelMapa) {
        anchoDelMapa = anchoMaximoDelMapa - 20
    }
    // Actualizar la posición de las mascotas enemigas en función de los nuevos tamaños.
    hipodogeEnemigo.x = posicionesRelativasEnemigos.Hipodoge.x * mapa.width;
    hipodogeEnemigo.y = posicionesRelativasEnemigos.Hipodoge.y * mapa.height;
    
    capipepoEnemigo.x = posicionesRelativasEnemigos.Capipepo.x * mapa.width;
    capipepoEnemigo.y = posicionesRelativasEnemigos.Capipepo.y * mapa.height;

    // Actualizar la posición de las mascotas enemigas en función de los nuevos tamaños.
    ratigueyaEnemigo.x = posicionesRelativasEnemigos.Ratigueya.x * mapa.width;
    ratigueyaEnemigo.y = posicionesRelativasEnemigos.Ratigueya.y * mapa.height;
    
    langostelvisEnemigo.x = posicionesRelativasEnemigos.Langostelvis.x * mapa.width;
    langostelvisEnemigo.y = posicionesRelativasEnemigos.Langostelvis.y * mapa.height;

    // Actualizar la posición de las mascotas enemigas en función de los nuevos tamaños.
    pydosEnemigo.x = posicionesRelativasEnemigos.Pydos.x * mapa.width;
    pydosEnemigo.y = posicionesRelativasEnemigos.Pydos.y * mapa.height;
    
    tucansinEnemigo.x = posicionesRelativasEnemigos.Tucansin.x * mapa.width;
    tucansinEnemigo.y = posicionesRelativasEnemigos.Tucansin.y * mapa.height;

    hipodogeEnemigo.ancho = nuevoTamaño;
    hipodogeEnemigo.alto = nuevoTamaño;

    capipepoEnemigo.ancho = nuevoTamaño;
    capipepoEnemigo.alto = nuevoTamaño;

    ratigueyaEnemigo.ancho = nuevoTamaño;
    ratigueyaEnemigo.alto = nuevoTamaño;

    langostelvisEnemigo.ancho = nuevoTamaño;
    langostelvisEnemigo.alto = nuevoTamaño;

    pydosEnemigo.ancho = nuevoTamaño;
    pydosEnemigo.alto = nuevoTamaño;

    tucansinEnemigo.ancho = nuevoTamaño;
    tucansinEnemigo.alto = nuevoTamaño;
    */
    console.log("Comprobando mascotajugadorObjeto...");

// Ajustar la posición de mascotajugadorObjeto basándonos en las propiedades relativas
if (mascotajugadorObjeto) {
    console.log("Ajustando posición de mascotajugadorObjeto...");
    mascotajugadorObjeto.x = mascotajugadorObjeto.relX * mapa.width;
    mascotajugadorObjeto.y = mascotajugadorObjeto.relY * mapa.height;
} else {
    console.log("mascotajugadorObjeto no está definido o es null/undefined.");
}

// Ahora, ajusta también el tamaño de mascotajugadorObjeto
if (mascotajugadorObjeto) {
    console.log("Ajustando tamaño de mascotajugadorObjeto...");
    mascotajugadorObjeto.ancho = nuevoTamaño;
    mascotajugadorObjeto.alto = nuevoTamaño;
}

console.log("Finalizado chequeo de mascotajugadorObjeto.");

    
    pintarCanvas();
}
// Añade el event listener para el redimensionamiento
window.addEventListener('resize', ajustarTamañoMapa);

// Al cargar la página, se inicia el juego
window.addEventListener('load', inicarJuego)

    // También ajusta el tamaño del mapa cuando se carga la página
    ajustarTamañoMapa();