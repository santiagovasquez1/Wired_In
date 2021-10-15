const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/venta.controller');

// Nueva venta
// api/ventas
router.post('/', ventasController.nuevaVenta);

// Mostrar ventas
router.get('/', ventasController.mostrarVentas);

// Mostrar una venta por su id
router.get('/:idVenta', ventasController.mostrarVenta);

// Actualizar las ventas
router.put('/:idVenta', ventasController.actualizarVenta);

// Eliminar una venta
router.delete('/:idVenta', ventasController.eliminarVenta);

module.exports = router;
