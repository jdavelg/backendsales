'use strict'
var Category = require('../models/category')
var controller = {

    save: function (req, res) {

        return res.status(200).send({
            status: 'success'
        })

    },
    getCategories: function (req, res) {
        Category.find({}, (err, categories) => {
            if (err || !categories) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error en el servidor al obtener categorias'
                })
            }
            if (categories) {
                return res.status(200).send({
                    status: 'success',
                    categories: categories
                })
            }

        })

    }
}
module.exports = controller;