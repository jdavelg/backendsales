'use strict'
var Category = require('../models/category')
var validator = require('validator')
var controller = {

    save: function (req, res) {
        //recoger params
        var params = req.body

        //instanciar Category
        var category = new Category();
        try {
            let validate_name = !validator.isEmpty(params.name);
            let validate_image = !validator.isEmpty(params.image);
            if (validate_image && validate_name) {
                category.name = params.name
                category.image = params.image

                category.save((err, categorySaved) => {
                    if (err || !categorySaved) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'error al guardar categoria'
                        })
                    }
                    if (categorySaved) {
                        return res.status(200).send({
                            status: 'success',
                            message: 'Exito al guardar categoria',
                            category: categorySaved
                        })
                    }
                })
            } else {
                return res.status(500).send({
                    status: 'error',
                    message: 'error al guardar categoria'
                })
            }
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: 'error al guardar categoria'
            })
        }




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

    },

    deleteCategory: function (req, res) {
        var categoryId = req.params.categoryid;

        if (categoryId) {

            Category.findByIdAndRemove(categoryId).exec((err, categoryRemoved) => {
                if (err || !categoryRemoved) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al eliminar categoria',

                    })
                }
                if (categoryRemoved) {
                    return res.status(200).send({
                        status: 'success',
                        message: 'Exito al eliminar categoria',
                        category: categoryRemoved
                    })
                }
            })

        } else {
            return res.status(500).send({
                status: 'error',
                message: 'Error al eliminar, no existe categoria',

            })
        }


    }
}
module.exports = controller;