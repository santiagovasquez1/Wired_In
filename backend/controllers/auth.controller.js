const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const UsuarioDb = require('../models/usuario');
const { generarJWT } = require('../Helpers/jwt');

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
            const token = await generarJWT(usuario.uid, usuario.rol);
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
            msg: error.msg
        });
    }
}

const validatePassword = (password, user) => {
    return validPassword = bcrypt.compareSync(password, user.password);
}

const renewToken = async(req, res = response) => {
    const { uid, rol } = req;

    const [user, token] = await Promise.all([
        User.findById(uid),
        generarJWT(uid, rol)
    ]);

    res.status(200).send({
        ok: true,
        token,
        user
    });

}

module.exports = {
    login,
    renewToken
}