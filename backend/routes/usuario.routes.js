/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { getUsuarios, crearUsuario, actualizarUsurario, borrarUsuario } = require('../controllers/usuario.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();
router.get('/', getUsuarios);
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email no tiene el formato correcto').isEmail(),
        validarCampos
    ],
    crearUsuario);

router.put('/:id', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene el formato correcto').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarUsurario);

router.delete('/:id', [

], borrarUsuario);

module.exports = router;