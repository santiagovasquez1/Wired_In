const Venta = require('../models/Venta');
const { response, request } = require('express');

// Nueva venta
const nuevaVenta = async(req = request, res = response) => {
    try {

        if (req.rol == 'Administrador' || req.rol == 'Vendedor') {
            const venta = new Venta(req.body);
            await venta.save();
            return res.status(200).send({
                msg: 'Se agregó una nueva venta',
            });
        } else {
            return res.status(400).send({
                ok: false,
                msg: 'El usuario no tiene permisos para acceder a esta información',
            });
        }
    } catch (error) {
        return res.status(500).send({
            ok: false,
            msg: error.message,
        });
    }
};

// Muestra las ventas
const mostrarVentas = async(req, res = response) => {
    try {
        const ventas = await Venta.find({})
            .populate('vendedor')
            .populate('listaProductos');

        return res.status(200).send({
            ok: true,
            ventas
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            msg: error.message,
        });
    }
};

// Muestra una venta por su id
const mostrarVenta = async(req, res = response) => {
    try {
        const venta = await Venta.findById(req.params.idVenta)
            .populate('vendedor')
            .populate('listaProductos');

        if (!venta) {
            return res.status(400).send({
                ok: false,
                msg: 'Esa venta no existe'
            });
        }

        return res.status(200).send({
            ok: true,
            venta
        })
    } catch (error) {
        return res.status(500).send({
            ok: false,
            msg: error.message,
        });
    }
};

// Actualizar las ventas
const actualizarVenta = async(req = request, res = response) => {
    try {
        if (req.rol == 'Administrador' || req.rol == 'Vendedor') {
            const venta = await Venta.findOneAndUpdate({ id: req.params.idVenta },
                    req.body, { new: true }
                )
                .populate('vendedor')
                .populate('listaProductos');

            return res.status(200).send({
                ok: true,
                venta
            })
        } else {
            return res.status(400).send({
                ok: false,
                msg: 'El usuario no tiene permisos para acceder a esta información',
            });
        }

    } catch (error) {
        return res.status(500).send({
            ok: false,
            msg: error.message,
        });
    }
};

// Elimina una venta por su id
const eliminarVenta = async(req = request, res = response) => {
    try {
        if (req.rol == 'Administrador') {
            await Venta.findOneAndDelete({ _id: req.params.idVenta });
            return res.status(200).send({
                ok: true,
                msg: 'La venta se ha eliminado'
            });
        } else {
            return res.status(400).send({
                ok: false,
                msg: 'El usuario no tiene permisos para acceder a esta información',
            });
        }

    } catch (error) {
        return res.status(500).send({
            ok: false,
            msg: error.message,
        });
    }
};

module.exports = {
    nuevaVenta,
    mostrarVenta,
    actualizarVenta,
    eliminarVenta,
    mostrarVentas
}