//require models library
const db = require('../models');

// Routing
module.exports = function (app) {

/* ----------------tblDevices----------------- */    
    // GET devices
    app.get('/api/tblDevices', function (req, res) {
        db.tblDevices.findAll({}).then(function (rows) {
            res.json(rows);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });
    //GET the devices by id
    app.get('/api/tblDevices/:id', function (req, res) {
        db.tblDevices.find({ where: { id: req.params.id } })
            .then(function (data) {
                res.json(data);
            }).catch(function (error) {
                res.json({ error: error });
            });
    });

/* ----------------tblDeviceDetails----------------- */    
    // GET tblDeviceDetails
    app.get('/api/tblDeviceDetails', function (req, res) {
        db.tblDeviceDetails.findAll({}).then(function (rows) {
            res.json(rows);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });
    //GET the tblDeviceDetails by id
    app.get('/api/tblDeviceDetails/:id', function (req, res) {
        db.tblDeviceDetails.find({ where: { id: req.params.id } })
            .then(function (data) {
                res.json(data);
            }).catch(function (error) {
                res.json({ error: error });
            });
    });


/* ----------------tblDowstreamServers----------------- */    
    // GET tblDowstreamServers
    app.get('/api/tblDowstreamServers', function (req, res) {
        db.tblDowstreamServers.findAll({}).then(function (rows) {
            res.json(rows);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });
    //GET the tblDowstreamServers by id
    app.get('/api/tblDowstreamServers/:id', function (req, res) {
        db.tblDowstreamServers.find({ where: { id: req.params.id } })
            .then(function (data) {
                res.json(data);
            }).catch(function (error) {
                res.json({ error: error });
            });
    });

/* ----------------tblLinuxUpdates----------------- */    
    // GET tblLinuxUpdates
    app.get('/api/tblLinuxUpdates', function (req, res) {
        db.tblLinuxUpdates.findAll({}).then(function (rows) {
            res.json(rows);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });
    //GET the tblLinuxUpdates by id
    app.get('/api/tblLinuxUpdates/:id', function (req, res) {
        db.tblLinuxUpdates.find({ where: { id: req.params.id } })
            .then(function (data) {
                res.json(data);
            }).catch(function (error) {
                res.json({ error: error });
            });
    });


/* ----------------tblUpdateStatusPerDevice----------------- */    
    // GET tblUpdateStatusPerDevice
    app.get('/api/tblUpdateStatusPerDevice', function (req, res) {
        db.tblUpdateStatusPerDevice.findAll({}).then(function (rows) {
            res.json(rows);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });
    //GET the tblUpdateStatusPerDevice by id
    app.get('/api/tblUpdateStatusPerDevice/:id', function (req, res) {
        db.tblUpdateStatusPerDevice.find({ where: { id: req.params.id } })
            .then(function (data) {
                res.json(data);
            }).catch(function (error) {
                res.json({ error: error });
            });
    });


/* ----------------tblWSUSUpdates----------------- */    
    // GET tblWSUSUpdates
    app.get('/api/tblWSUSUpdates', function (req, res) {
        db.tblWSUSUpdates.findAll({}).then(function (rows) {
            res.json(rows);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });
    //GET the tblWSUSUpdates by id
    app.get('/api/tblWSUSUpdates/:id', function (req, res) {
        db.tblWSUSUpdates.find({ where: { id: req.params.id } })
            .then(function (data) {
                res.json(data);
            }).catch(function (error) {
                res.json({ error: error });
            });
    });





    //Update devices by id
/*     app.put('/api/tblDevices/:id', function (req, res) {
        console.log(req.params.id, "we are in update");
        db.tblDevices.update(
            req.body,
            { where: { id: req.params.id } }
        ).then(function (data) {
            res.json({ success: true, data: data })
        }).catch(function (error) {
            res.json({ success: false, error: error });
        });
    }); */

};