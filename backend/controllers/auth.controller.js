const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const UsuarioDb = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async(req = request, res = response) => {
    try {
        const { email, password } = req.body;
        const usuario = await UsuarioDb.findOne({ email });

        if (!usuario) {
            return res.status(404).send({
                ok: false,
                msg: "El usuario no esta registrado en la aplicación"
            });
        } else if (validatePassword(password, usuario)) {
            const token = await generarJWT(usuario._id, usuario.rol);
            res.status(200).send({
                ok: true,
                token,
                msg: "Usuario logeado"
            });
        } else {
            return res.status(400).send({
                ok: false,
                msg: 'Contraseña invalida'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
}

const signin = async(req, res = response) => {
    try {
        const { email, password } = req.body;
        const existeUsuario = await UsuarioDb.findOne({ email });

        if (existeUsuario) {
            return res.status(400).send({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        const usuario = new UsuarioDb(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        const token = await generarJWT(usuario._id, usuario.rol);

        return res.status(200).send({
            ok: true,
            msg: 'Usuario creado',
            usuario,
            token
        });

    } catch (error) {
        return res.status(500).send({ ok: false, msg: error.msg });
    }
}

const validatePassword = (password, user) => {
    return validPassword = bcrypt.compareSync(password, user.password);
}

const renewToken = async(req, res = response) => {
    const { uid, rol } = req;
    try {
        const [user, token] = await Promise.all([
            UsuarioDb.findById(uid),
            generarJWT(uid, rol)
        ]);

        return res.status(200).send({
            ok: true,
            token,
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }

}

module.exports = {
    login,
    signin,
    renewToken
}