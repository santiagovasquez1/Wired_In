const UsuarioDb = require('../models/usuario');
const { response, request } = require('express');
const bcrypt = require('bcryptjs');
// const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req = request, res = response) => {
    try {
        const from = parseInt(req.query.from) || 0;

        const [usuarios, total] = await Promise.all([
            UsuarioDb.find({}, 'nombre email rol imagen activo')
            .skip(from)
            .limit(5),
            UsuarioDb.countDocuments()
        ]);

        return res.status(200).send({
            ok: true,
            usuarios,
            total
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            msg: error.message,
        });
    }
}

const crearUsuario = async(req = request, res = response) => {
    try {
        const { email, password } = req.body;
        const existeEmail = await UsuarioDb.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya ha sido registrado"
            });
        }

        const usuario = new UsuarioDb(req.body);

        //Encriptacin de contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        return res.status(200).send({
            ok: true,
            usuario
        });

    } catch (error) {
        return res.status(500).send({
            ok: false,
            msg: error.message,
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario
}