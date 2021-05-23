'use strict'
var Mark = require('../models/mark')
var validator = require('validator')

var controller = {

    save: function (req, res) {
        /* recoger parametros */
        var params = req.body
        try {
            /* validar datos */
            let validate_name = !validator.isEmpty(params.name);
            let validate_image = !validator.isEmpty(params.image);


            if (validate_image && validate_name) {
                /* crear objeto de marca */
                var mark = new Mark()

                /* asignar valores */
                mark.name = params.name
                mark.image = params.image

                mark.save((err, markSaved) => {
                    if (err || !markSaved) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'error al guardar marca'
                        })
                    }
                    if (markSaved) {
                        /* guardar marca */
                        return res.status(200).send({
                            status: 'success',
                            mark: markSaved
                        })
                    }

                })


            } else {
                return res.status(500).send({
                    status: 'error',
                    message: 'No se pueden enviar los datos vacios '
                })
            }

        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: 'error en el servidor'
            })
        }

    },

    getMarks: function (req, res) {

        Mark.find({}, (err, marks) => {
            if (err || !marks) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener marcas'
                })
            }
            if (marks) {
                return res.status(200).send({
                    status: 'success',
                    marks
                })
            }
        }
        )

    }

}
module.exports = controller;