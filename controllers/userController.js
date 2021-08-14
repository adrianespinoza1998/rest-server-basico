const { request,response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req = request,res = response)=> {

    const { limite = 5, desde = 0 } = req.query;
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado : true }),
        Usuario.find({estado : true})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({total, usuarios});
}

const usuariosPost = async(req = request,res = response)=> {

    const {nombre,correo,password,role} = req.body
    const usuario = new Usuario({ nombre, correo, password, role});

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await usuario.save();
    //const { nombre, edad} = req.body
    res.status(201).json({usuario});
}

const usuariosPut = async(req = request,res = response)=> {

    const id = req.params.id;
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO: Validar id en BD
    if (password){
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    console.log(usuario);

    res.status(201).json({usuario});
}

const usuariosDelete = async (req,res = response)=> {

    const {id} = req.params;
    const usuarioVerificado = req.usuario;
    const usuario = await Usuario.findByIdAndUpdate(id,{ estado: false });

    res.status(201).json({usuario, usuarioVerificado});
}

const usuariosPatch = (req,res = response)=> {

    res.status(201).json({msg:'Funca controlador patch'});
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}