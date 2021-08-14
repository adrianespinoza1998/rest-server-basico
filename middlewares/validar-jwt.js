const jwt = require('jsonwebtoken');

const {request, response} = require("express");
const Usuario = require('../models/usuario');

const validarJwt = async(req = request,res = response, next)=> {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la petición'
        });
    }

    try{
        const {uid} = jwt.verify(token, process.env.SECRET_KEY);
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(201).json({
                msg: 'Token no válido'
            });
        }

        if(!usuario.estado){
            return res.status(201).json({
               msg: 'Token no válido'
            });
        }

        req.usuario = usuario;

        next();
    }catch (error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJwt
}