const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/user');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //Middlewares
        this.middleware();

        //Routes
        this.routes();
    }

    middleware(){
        //Directorio público
        this.app.use( express.static('public'));

        //Habilitar CORS
        this.app.use(cors());

        //Lectura y escritura JSON
        this.app.use( express.json() );
    }

    routes() {
        this.app.use(this.usuariosPath, userRoutes);
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Escuchando el puerto ${this.port}`);
        });
    }
}

module.exports = Server