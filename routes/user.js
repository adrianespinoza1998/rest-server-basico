const { Router } = require('express');
const { usuariosGet,usuariosPatch, usuariosDelete, usuariosPut, usuariosPost} = require('../controllers/userController');

const router = Router();

router.get('/',usuariosGet);
router.post('/', usuariosPost);
router.put('/:id', usuariosPut);
router.delete('/',usuariosDelete);
router.patch('/',usuariosPatch);

module.exports = router;