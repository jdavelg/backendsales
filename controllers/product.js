'use strict'
var Mark = require('../models/mark')
var controller = {

    add: function (req, res) {
        /* recoger de la url el id de marca */
        var markId = req.params.markid

        /* buscar marca */
        Mark.findById(markId).exec((err, markFounded) => {
            if (error || !markFounded) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error en el servidor al agregar producto'
                })

            }

            if (markFounded) {
                /* hacer  push en el array de productos  */
                var product = {
                    name: req.body.name,
                    price: req.body.price,
                    image: req.body.image,
                    link: req.body.link
                }

                //guardar cambios

                markFounded.products.push(product)

                markFounded.save((err) => {
                    if (err) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al guardar nuevo producto'
                        })
                    } else {
                        return res.status(200).send({
                            status: 'success',
                            message: 'Exito al guardar nuevo producto',
                            mark: markFounded
                        })
                    }
                })

            }
        })


    },

    update: function (req, res) {
        /* recoger de la url el id de marca */
        var productId = req.params.productid

        /* buscar en coleccion de marcas ese id */
        Mark.findByIdAndUpdate({ "products._id": productId },
            {
                "$set": {
                    "products.$.name": req.body.name,
                    "products.$.price": req.body.price,
                    "products.$.link": req.body.link,
                    "products.$.image": req.body.image,
                }
            },
            { new: true },
            (err, productUpdated) => {
                if (err || !productUpdated) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar producto'
                    })

                }
                if (productUpdated) {
                    return res.status(200).send({
                        status: 'success',
                        message: 'Exito al actualizar producto',
                        product: productUpdated
                    })
                }
            }
        )
    },
    delete: function (req, res) {
        /* recoger de la url el id de marca */
        var productId = req.params.productid
        var markId = req.params.markid
        /* Buscar y borrar */
        Mark.findById(markId, (err, mark) => {

            if (err || !mark) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en el servidor al intentar borrar producto'
                })
            }
            if (mark) {
                var product = mark.products.id(productId)

                if (product) {
                    product.remove()
                    mark.save((err) => {
                        if (err) {
                            return res.status(500).send({
                                status: 'error',
                                message: 'Error en el servidor al intentar borrar producto'
                            })
                        }else{
                            return res.status(200).send({
                                status: 'success',
                                message: 'Exito al borrar producto',
                                mark
                            })   
                        }
                    })

                } else {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en el servidor al intentar borrar producto'
                    })
                }
            }
        })
    }
}

module.exports = controller;