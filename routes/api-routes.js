const db = require('../models');

module.exports = function(app) {

    app.get('/api/deviceCollection/:id', function(req, res) {
        db.tblDeviceCollections.findOne({
            where: {
                TargetGroupID: req.params.id
            }
        }).then(function(data) {
            res.json(data);
        }).catch(function(error) {
            res.json({error: error});
        });
    });

    app.get('/api/devices', function(req, res) {
        db.tblDevices.findAll({
            where: req.query
        }).then(function(data) {
            res.json(data);
        }).catch(function(data) {
            res.json({error: error});
        });
    });
}