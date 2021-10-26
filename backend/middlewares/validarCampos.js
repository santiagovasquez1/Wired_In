const { response, request } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req = request, res = response, next) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: "Errores al enviar la información",
            errors: errores.mapped()
        })
    }

    next();
}

module.exports = {
    validarCampos
}