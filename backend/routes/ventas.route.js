const express = require('express');
const router = express.Router();
const { nuevaVenta, mostrarVenta, mostrarVentas, actualizarVenta, eliminarVenta } = require('../controllers/venta.controller');
const { validarUsuario } = require('../middlewares/validarUsuario');

// Nueva venta
// api/ventas
router.post('/', validarUsuario, nuevaVenta);

// Mostrar ventas
router.get('/', mostrarVentas);

// Mostrar una venta por su id
router.get('/:idVenta', mostrarVenta);

// Actualizar las ventas
router.put('/:idVenta', validarUsuario, actualizarVenta);

// Eliminar una venta
router.delete('/:idVenta', validarUsuario, eliminarVenta);

module.exports = router;