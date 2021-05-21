'use strict'

var User = require('../models/user')
var validator = require('validator')
var bcrypt = require('bcrypt')
var saltRounds = 10
var salt = bcrypt.genSaltSync(saltRounds)


var controller = {

    save: function (req, res) {
        //recoger los params de peticion
        let params = req.body

        let validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        let validate_password = !validator.isEmpty(params.password);

        if (validate_email && validate_password) {

            //crear objeto de usuario
            var user = new User();

            //asignar valores a objeto de usuario
            user.email = params.email.toLowerCase()

            //comprobar si usuario existe
            User.findOne({ email: user.email.toLowerCase() }, (err, issetUser) => {
                if (err) {
                    return res.status(500).send({

                        status: 'error',
                        message: 'error al comprobar si usuario ya existe'
                    })

                }
                if (issetUser) {
                    return res.status(200).send({

                        status: 'error',
                        message: 'Usuario ya existe en la base de datos'
                    })
                } else {
                    //en caso de que no exista cifrar contraseña
                    bcrypt.hash(params.password, salt, (err, hash) => {
                        user.password = hash
                        //guardar usuario
                        user.save((err, savedUser) => {
                            if (err) {
                                return res.status(400).send({
                                    status: 'error',
                                    message: 'error al guardar el usuario'
                                })
                            }
                            if (savedUser) {
                                return res.status(200).send({
                                    status: 'success',
                                    message: 'exito al guardar el usuario',
                                    user: savedUser
                                })
                            }
                        })

                    })

                }
            })

        } else {

            return res.status(200).send({
                status: 'error',
                message: 'no has enviado correctamente los datos'
            })
        }


    }

}

module.exports = controller;