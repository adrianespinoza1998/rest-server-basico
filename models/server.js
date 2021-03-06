const express = require('express');
const cors = require('cors');

const userRoutes = require('../routes/usuarioRoutes');
const authRoutes = require('../routes/authRoutes');
const {dbConnection} = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Path
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a la base de datos
        this.conectarDB();

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
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.usuariosPath, userRoutes);
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Escuchando el puerto ${this.port}`);
        });
    }

    async conectarDB(){
        await dbConnection();
    }
}

module.exports = Server