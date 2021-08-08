const { request,response } = require('express');

const usuariosGet = (req = request,res = response)=> {

    const { q, nombre='No name', apikey} = req.query;
    res.status(201).json({msg:'Funca controlador get', q, nombre, apikey});
}

const usuariosPost = (req = request,res = response)=> {

    const { nombre, edad} = req.body
    res.status(201).json({msg:'Funca controlador post', nombre, edad});
}

const usuariosPut = (req = request,res = response)=> {

    const id = req.params.id;
    res.status(201).json({msg:'Funca controlador put', id});
}

const usuariosDelete = (req,res = response)=> {

    res.status(201).json({msg:'Funca controlador delete'});
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