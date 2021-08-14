const {response} = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const {generarJWT} = require("../helpers/generarJWT");

const login = async(req,res = response)=>{
    const {correo, password} = req.body;

    try{
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
               msg: 'Usuario y/o contraseña incorrectos - correo'
            });
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario y/o contraseña incorrectos - estado: false'
            });
        }

        const validarPassword = bcryptjs.compareSync(password, usuario.password);

        if(!validarPassword){
            return res.status(400).json({
                msg: 'Usuario y/o contraseña incorrectos -password'
            });
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({ usuario, token });
    }catch (error){
        res.status(500).json({msg:'Hable con el admin'});
    }
}

module.exports = {
    login
}