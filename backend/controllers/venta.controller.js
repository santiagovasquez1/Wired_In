const Venta = require('../models/Venta');

exports.crearVenta = async (req, res) => {
	try {
		// Crear una nueva venta
		const venta = new Venta(req.body);
		venta.save();
		res.json(venta);
	} catch (error) {
		console.error(error);
		res.status(500).send('Hubo un error');
	}
};
