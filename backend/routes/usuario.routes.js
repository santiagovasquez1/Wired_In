/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { getUsuarios, crearUsuario, actualizarUsurario, borrarUsuario } = require('../controllers/usuario.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarUsuario } = require('../middlewares/validarUsuario');

const router = Router();
router.get('/', validarUsuario, getUsuarios);
router.post('/', [validarUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email no tiene el formato correcto').isEmail(),
        validarCampos
    ],
    crearUsuario);

router.put('/:id', [validarUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene el formato correcto').isEmail(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarUsurario);

router.delete('/:id', [
    validarUsuario
], borrarUsuario);

module.exports = router;