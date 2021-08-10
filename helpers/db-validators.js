const Role = require("../models/role");
const Usuario = require("../models/usuario");

const validarRol = async(role='')=>{
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El rol ${role} no existe en la BD`);
    }
}

const emailExiste = async(correo)=>{
    const verificarCorreo = await Usuario.findOne({correo});

    if(verificarCorreo){
        throw new Error(`El correo ${correo} ya se encuentra registrado en la BD`);
    }
}

const existeId = async(id)=>{
    const verificarId = await Usuario.findById(id);

    if(!verificarId){
        throw new Error(`El id ${id} no esta registrado en la BD`);
    }
}

module.exports = {
    validarRol,
    emailExiste,
    existeId
}