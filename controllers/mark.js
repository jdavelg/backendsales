'use strict'


var controller = {

    save: function (req, res) {

        return res.status(200).send({
            status: 'success'
        })
    },

    getMarks: function (req, res) {

        return res.status(200).send({
            status: 'success'
        })
    }

}
module.exports = controller;