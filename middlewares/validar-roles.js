const {request, response} = require("express");

const esAdminRole = (req = request, res = response, next)=>{
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Validar admin ejecutado sin validar token'
        });
    }

    const {nombre, role} = req.usuario;

    if(role !=='ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }

    next();
}

const tieneRol = (...roles)=>{
    return (req = request, res = response, next)=>{
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Validar admin ejecutado sin validar token'
            });
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles ${roles}`
            });
        }

        console.log(roles);
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}