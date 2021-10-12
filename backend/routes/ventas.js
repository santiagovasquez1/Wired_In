const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/venta.controller');

// Crea ventas
// api/ventas
router.post('/', ventaController.crearVenta);

module.exports = router;
