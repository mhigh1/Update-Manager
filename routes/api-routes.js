//require models library
const db = require('../models');

// Routing
module.exports = function (app) {

    // GET products
    app.get('/api/products', function (req, res) {
        db.Product.findAll({}).then(function (rows) {
            res.json(rows);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });
    //GET the products by id
    app.get('/api/products/:id', function (req, res) {
        db.Product.find({ where: { id: req.params.id } })
            .then(function (data) {
                res.json(data);
            }).catch(function (error) {
                res.json({ error: error });
            });
    });
    //Update by id
    app.put('/api/products/:id', function (req, res) {
        console.log(req.params.id, "we are in update");
        db.Product.update(
            req.body,
            { where: { id: req.params.id } }
        ).then(function (data) {
            res.json({ success: true, data: data })
        }).catch(function (error) {
            res.json({ success: false, error: error });
        });
    });
};