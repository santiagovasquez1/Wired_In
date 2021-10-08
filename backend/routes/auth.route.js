const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarUsuario } = require('../middlewares/validarUsuario');

const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.get('/renew', validarUsuario, renewToken);

module.exports = router;