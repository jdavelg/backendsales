'use strict'

var jwt = require('jwt-simple')
var secret = 'tcs-digital-21-05-21-D1git4l'
var moment = require('moment')


exports.authenticated = function (req, res, next) {

    /* comprobar si llega authorization */
    if (!req.headers.authorization) {
        return res.status(404).send({
            status: 'error',
            message: 'la peticion no tiene cabecera de authorization'
        })
    }

    /* limpiar token, quitarle las comillas */
    var token = req.headers.authorization.replace(/['"]+/g, '')
    /* decodificar token */
    try {
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            /* comprobar si token no ha expirado */
            return res.status(400).send({
                status: 'error',
                message: 'el token ha expirado'
            })
        }

        /* adjuntar usuario identificado a la request */
        req.user = payload

        /* pasar a la accion */
        next()


    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'error al decodificar la authorization'
        })
    }


}