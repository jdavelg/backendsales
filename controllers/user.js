'use strict'

var User = require('../models/user')
var validator = require('validator')
var bcrypt = require('bcrypt')

var saltRounds = 10
var salt = bcrypt.genSaltSync(saltRounds)
var jwt = require('../services/jwt')

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
                            if (!savedUser) {
                                return res.status(403).send({
                                    status: 'error',
                                    message: 'error al guardar el usuario',
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


    },
    login(req, res) {
        //recoger params de peticion
        var params = req.body
        //validar datos que nos llegan
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        if (validate_email) {
            //buscar usuarios que coincidan 
            User.findOne({ email: params.email }, (err, user) => {
                if (err) {
                    return res.status(200).send({
                        status: 'error',
                        message: 'error al buscar usuario en la Base de datos'

                    })
                }
                if (!user) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'usuario no encontrado en la Base de datos'

                    })
                } else {
                    //si encuentran comprobar contraseña
                    bcrypt.compare(params.password, user.password, (err, check) => {
                        if (err) {
                            return res.status(500).send({
                                status: 'error',
                                message: 'error al intentar loguearse'
                            })
                        }

                        if (!check) {
                            return res.status(500).send({
                                status: 'error',
                                message: 'Usuario y/o contraseña no coinciden'
                            })
                        }
                        //coincidencia email y password
                        if (check) {
                            //quitar contraseña
                            user.password = undefined
                            //si es correcta generar token 
                            /* Realizada en servicios */

                            if (params.getToken) {

                                //devolver los datos
                                return res.status(200).send({
                                    status: 'success',
                                    token: jwt.createToken(user)

                                })
                            }



                        }
                    })

                }
            })

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'los datos enviados son incorrectos'

            })
        }



    },

    update: function (req, res) {
        /* crear middleware para comprobar el token */
        /* DONE */

        /* Recoger params */
        var params = req.body

        try {
            let validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
            let validate_password = !validator.isEmpty(params.password);

            if (validate_email && validate_password) {
                /* buscar y actualizar */
                bcrypt.hash(params.password, salt, (err, hash) => {
                    let newpassword = hash
                    //guardar actualizacion de usuario
                    var user = req.user.sub


                    if (req.user.email != params.email) {
                        /* comprobar duplicidad de email */
                        User.findOne({ email: params.email }, (err, user) => {
                            if (err) {
                                return res.status(200).send({
                                    status: 'error',
                                    message: 'error al buscar usuario en la Base de datos'

                                })
                            }
                            if (user && req.user.email == params.email) {
                                return res.status(404).send({
                                    status: 'error',
                                    message: 'usuario no encontrado en la Base de datos'

                                })
                            }else{
                                User.findOneAndUpdate({ _id: user }, params, { new: true }, (err, userUpdated) => {
                                    if (err) {
                                        return res.status(200).send({
                                            status: 'error',
                                            message: 'error  al intentar actualizar datos'
                                        })

                                    }
                                    if (!userUpdated) {
                                        return res.status(200).send({
                                            status: 'error',
                                            message: 'no se pudo actualizar el usuario'
                                        })
                                    }
                                    if (userUpdated) { /* devolver usuario updated */
                                        return res.status(200).send({
                                            status: 'success',
                                            message: 'Usuario actualizado correctamente',
                                            user: userUpdated
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        User.findOneAndUpdate({ _id: user }, params, { new: true }, (err, userUpdated) => {
                            if (err) {
                                return res.status(200).send({
                                    status: 'error',
                                    message: 'error  al intentar actualizar datos'
                                })

                            }
                            if (!userUpdated) {
                                return res.status(200).send({
                                    status: 'error',
                                    message: 'no se pudo actualizar el usuario'
                                })
                            }
                            if (userUpdated) { /* devolver usuario updated */
                                return res.status(200).send({
                                    status: 'success',
                                    message: 'Usuario actualizado correctamente',
                                    user: userUpdated
                                })
                            }
                        })
                    }



                })

            }

        } catch (error) {

            return res.status(500).send({
                status: 'error',
                message: 'error en el servidor al intentar actualizar datos'
            })
        }



    }

}

module.exports = controller;