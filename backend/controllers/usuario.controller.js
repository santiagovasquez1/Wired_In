const UsuarioDb = require('../models/usuario');
const { response, request } = require('express');
const bcrypt = require('bcryptjs');
// const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req = request, res = response) => {
    try {
        const from = parseInt(req.query.from) || 0;

        const [usuarios, total] = await Promise.all([
            UsuarioDb.find({}, 'nombre email rol imagen activo'),
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

const actualizarUsurario = async(req = request, res = response) => {

    const uid = req.params.id;
    try {

        const usuario = await UsuarioDb.findById(uid);

        if (!usuario) {
            return res.status(404).send({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        const { password, email, ...campos } = req.body;

        if (usuario.email !== email) {
            const existeEmail = await UsuarioDb.findOne({ email });
            if (existeEmail) {
                return res.status(400).send({
                    ok: false,
                    msg: "Ya existe un usuario con ese email"
                });
            }
        }

        const userUpdate = await UsuarioDb.findByIdAndUpdate(uid, { email, campos }, { new: true });

        return res.status(200).send({
            ok: true,
            usuario: userUpdate
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado, revisar logs"
        });
    }
}

const borrarUsuario = async(req = request, res = response) => {

    const uid = req.params.id;
    try {

        const usuario = await UsuarioDb.findById(uid);

        if (!usuario) {
            return res.status(404).send({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        } else {
            await UsuarioDb.findByIdAndDelete(uid);
            return res.status(200).send({
                ok: false,
                msg: 'Usuario eliminado'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, revisar logs"
        });
    }
}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsurario,
    borrarUsuario
}