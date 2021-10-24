const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken, signin } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarUsuario } = require('../middlewares/validarUsuario');

const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/signin', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], signin);

router.get('/renew', validarUsuario, renewToken);

module.exports = router;