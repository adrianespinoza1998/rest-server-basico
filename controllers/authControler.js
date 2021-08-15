const {response, request} = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const {generarJWT} = require("../helpers/generarJWT");
const {googleVerify} = require("../helpers/google-verify");

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

const googleSignIn = async(req = request, res = response)=>{

    try{
        const {id_token} = req.body;

        const {correo, img, nombre} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            const data = {
                nombre,
                correo,
                password: 'nopuedeser',
                img,
                google: true,
                role: 'USER_ROLE'
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json({
               msg:'El usuario esta bloqueado, hable con el administrador'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    }catch (error) {
        res.status(400).json({
            msg: 'Token de Google no valido',
            error
        });
    }
}

module.exports = {
    login,
    googleSignIn
}