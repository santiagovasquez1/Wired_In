const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarUsuario } = require('../middlewares/validarUsuario');
const { actualizarProducto, crearProducto, borrarProducto, getProductos } = require('../controllers/producto.controller')

const router = Router();
router.get('/', validarUsuario, getProductos);
router.post('/', [validarUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('valor', 'El valor es obligatorio').not().isEmpty(),
    check('cantidad', 'la cantidad es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto);

router.put('/:id', [validarUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('valor', 'El valor es obligatorio').not().isEmpty(),
    check('cantidad', 'la cantidad es obligatorio').not().isEmpty(),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarUsuario
], borrarProducto);

module.exports = router;