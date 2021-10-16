const Venta = require('../models/Venta');

// Nueva venta
exports.nuevaVenta = async (req, res, next) => {
	// Crear una nueva venta
	const venta = new Venta(req.body);

	try {
		await venta.save();
		res.json({
			mensaje: 'Se agregó una nueva venta',
		});
	} catch (error) {
		console.error(error);
		next();
		// res.status(500).send('Hubo un error');
	}
};

// Muestra las ventas
exports.mostrarVentas = async (req, res, next) => {
	try {
		// const ventas = await Venta.find({}).populate('vendedor').populate({
		// 	path: 'listaProductos.producto',
		// 	model: 'Producto',
		// });
		const ventas = await Venta.find({})
			.populate('vendedor')
			.populate('listaProductos');
		res.json(ventas);
	} catch (error) {
		console.error(error);
		next();
	}
};

// Muestra una venta por su id
exports.mostrarVenta = async (req, res, next) => {
	const venta = await Venta.findById(req.params.idVenta)
		.populate('vendedor')
		.populate('listaProductos');

	if (!venta) {
		res.json({ mensaje: 'Esa venta no existe' });
		return next();
	}

	// Mostrar la venta
	res.json(venta);
};

// Actualizar las ventas
exports.actualizarVenta = async (req, res, next) => {
	try {
		let venta = await Venta.findOneAndUpdate(
			{ id: req.params.idVenta },
			req.body,
			{ new: true }
		)
			.populate('vendedor')
			.populate('listaProductos');

		res.json(venta);
	} catch (error) {
		console.error(error);
		next();
	}
};

// Elimina una venta por su id
exports.eliminarVenta = async (req, res, next) => {
	try {
		await Venta.findOneAndDelete({ _id: req.params.idVenta });
		res.json({ mensaje: 'La venta se ha eliminado' });
	} catch (error) {
		console.error(error);
		next();
	}
};
