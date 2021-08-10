const { Router } = require('express');
const {check} = require("express-validator");

const { usuariosGet,
        usuariosPatch,
        usuariosDelete,
        usuariosPut,
        usuariosPost} = require('../controllers/userController');
const { validarCampos} = require("../middlewares/validar-campos");
const { validarRol, emailExiste, existeId} = require('../helpers/db-validators');


const router = Router();

router.get('/',usuariosGet);

router.post('/',[
    check('correo','El correo no es válido').isEmail(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener minimo 6 caracteres').isLength({min:6}),
    check('correo').custom(emailExiste),
    check('role').custom(validarRol),
    validarCampos
], usuariosPost);

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeId),
    check('role').custom(validarRol),
    validarCampos
], usuariosPut);

router.delete('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeId),
    validarCampos
],usuariosDelete);

router.patch('/',usuariosPatch);

module.exports = router;