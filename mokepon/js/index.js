const express=require("express")
const cors=require("cors")

const app=express()

app.use(cors())
app.use(express.json())

const jugadores=[]

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    actualizarPosicion(x,y) {
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre=nombre}
    }   

    app.get("/unirse", (req, res) => {
        console.log("Un jugador intenta unirse");
        const id = `${Math.random()}`;
        const jugador = new Jugador(id);
        jugadores.push(jugador);
        console.log("Nuevo jugador creado con ID:", id);
        res.send(id);
    });
    
    app.post("/mokepon/:jugadorId", (req, res) => {
        console.log("Intento de asignar mokepon a un jugador");
        const jugadorId = req.params.jugadorId || "";
        const nombre = req.body.mokepon || "";
        const mokepon = new Mokepon(nombre);
    
        const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);
    
        if (jugadorIndex >= 0) {
            jugadores[jugadorIndex].asignarMokepon(mokepon);
            console.log("Mokepon asignado a jugador con ID:", jugadorId);
        } else {
            console.log("Error al asignar mokepon: Jugador no encontrado con ID:", jugadorId);
        }
        
        res.end();
    });
    
    app.post("/mokepon/:jugadorId/posicion", (req, res) => {
        console.log("Intento de actualizar posición de un jugador");
        const jugadorId = req.params.jugadorId || "";
        const x = req.body.x || 0;
        const y = req.body.y || 0;
    
        const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);
    
        if (jugadorIndex >= 0) {
            jugadores[jugadorIndex].actualizarPosicion(x, y);
            console.log("Posición actualizada para el jugador con ID:", jugadorId, "Nueva posición:", x, y);
        } else {
            console.log("Error al actualizar posición: Jugador no encontrado con ID:", jugadorId);
        }
    
        const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id);
    
        res.send({
            enemigos
        });
    });
    
    app.post("/mokepon/:jugadorId/ataques", (req, res) => {
        console.log("Intento de asignar ataques a un jugador");
        const jugadorId = req.params.jugadorId || "";
        const ataques = req.body.ataques || [];
        
        const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);
    
        if (jugadorIndex >= 0) { 
            jugadores[jugadorIndex].asignarAtaques(ataques);
            console.log("Ataques asignados a jugador con ID:", jugadorId);
            console.log("Ataques:", ataques);
        } else {
            console.log("Error al asignar ataques: Jugador no encontrado con ID:", jugadorId);
        }
        
        res.end();
    });
    
    app.get("/mokepon/:jugadorId/ataques", (req, res) => {
        console.log("Solicitud de ataques de un jugador");
        const jugadorId = req.params.jugadorId || "";
        const jugador = jugadores.find((jugador) => jugador.id === jugadorId);
        if (!jugador) {
            console.log("Error: Jugador no encontrado con ID:", jugadorId);
            return res.status(404).json({ error: "Jugador no encontrado" });
        }
        console.log("Enviando ataques de jugador con ID:", jugadorId);
        console.log("Ataques:", jugador.ataques);
        res.send({
            ataques: jugador.ataques || []
        });
    });
    
    app.listen(8080, () => {
        console.log("Servidor funcionando en el puerto 8080");
    });