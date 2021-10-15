const ProductoDb = require('../models/productos');
const { response, request } = require('express');

const getProductos = async(req = request, res = response) => {
    try {

        const [productos, total] = await Promise.all([
            ProductoDb.find({}, 'nombre valor cantidad estado'),
            ProductoDb.countDocuments()
        ]);

        return res.status(200).send({
            ok: true,
            productos,
            total
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            msg: error.message,
        });
    }
}

const crearProducto = async(req = request, res = response) => {
    try {
        if (req.rol == 'Administrador' || req.rol == 'Vendedor') {
            const { nombre } = req.body;
            const existeProducto = await ProductoDb.findOne({ nombre });

            if (existeProducto) {
                return res.status(400).json({
                    ok: false,
                    msg: "El producto ya ha sido registrado"
                });
            }

            const producto = new ProductoDb(req.body);
            await producto.save();

            return res.status(200).send({
                ok: true,
                producto
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
}

const actualizarProducto = async(req = request, res = response) => {
    try {
        if (req.rol == 'Administrador' || req.rol == 'Vendedor') {
            const id = req.params.id;
            const producto = await ProductoDb.findById(id);

            if (!producto) {
                return res.status(404).send({
                    ok: false,
                    msg: 'No existe un producto por ese id'
                });
            }

            const { nombre, ...campos } = req.body;

            if (producto.nombre !== nombre) {
                const existeNombre = await ProductoDb.findOne({ nombre });
                if (existeNombre) {
                    return res.status(400).send({
                        ok: false,
                        msg: "Ya existe un producto con ese nombre"
                    });
                }
            }

            campos.nombre = nombre;
            const productoUpdate = await ProductoDb.findByIdAndUpdate(id, campos, { new: true });

            return res.status(200).send({
                ok: true,
                producto: productoUpdate
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

}

const borrarProducto = async(req = request, res = response) => {
    try {
        if (req.rol == 'Administrador') {
            const id = req.params.id;
            const producto = await ProductoDb.findById(id);
            if (!producto) {
                return res.status(404).send({
                    ok: false,
                    msg: 'No existe un producto por ese id'
                });
            } else {
                await ProductoDb.findByIdAndDelete(id);
                return res.status(200).send({
                    ok: true,
                    msg: 'Producto eliminado'
                });
            }
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
}

module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto
}