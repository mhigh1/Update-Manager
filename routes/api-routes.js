const db = require('../models');

module.exports = function(app) {
/* -------------Device and groups--------------- */
    
    app.get('/api/devices/groups', function(req, res) {
        db.tblDeviceGroups.findAll({
            attributes: [
                'name', 'description', 'targetGroupID', 'parentGroupID', 'isBuiltin',
                [db.sequelize.fn('COUNT', db.sequelize.col('tblDevices.deviceID')), 'deviceCount']
            ],
            include: [{
            model: db.tblDevices,
            required: false,
            attributes: []
            }],
            group: ['targetGroupID']
        }).then(function(data) {
            res.json(data);
        }).catch(function(error) {
            res.json({error: error});
        });
    });
 
    app.get('/api/devices/group/:id', function(req, res) {
        db.tblDeviceGroups.findOne({
            where: {
                targetGroupID: req.params.id
            },
            attributes: [
                'name', 'description', 'targetGroupID', 'parentGroupID', 'isBuiltin',
                [db.sequelize.fn('COUNT', db.sequelize.col('tblDevices.deviceID')), 'deviceCount']
            ],
            include: [{
            model: db.tblDevices,
            required: false,
            attributes: []
            }]
        }).then(function(data) {
            res.json(data);
        }).catch(function(error) {
            res.json({error: error});
        });
    });
 
    app.get('/api/devices/devices', function(req, res) {
        db.tblDevices.findAll({
            where: req.query,
            include: [{model: db.tblDeviceDetails}]
        }).then(function(data) {
            res.json(data);
        }).catch(function(error) {
            res.json({error: error});
        });
    });


   app.get('/api/devices/updates', function(req, res) {
        if(req.query.measure === 'true') {
            let include = [];
            if(req.query.targetGroupID) {
                include = [{
                    model: db.tblDevices,
                    attributes: [],
                    where: {
                        targetGroupID: req.query.targetGroupID
                    }
                }];
            };
            db.tblUpdateStatusPerDevice.findAll({
                attributes: [
                    'state', 
                    [db.sequelize.fn('COUNT', db.sequelize.col('state')), 'count']
                ],
                group: ['state'],
                order: [['state','ASC']],
                include: include               
            }).then(function(data) {
                res.json(data);
            }).catch(function(error) {
                res.json({error: error});
            });
        } else if(req.query.targetGroupID) {
            db.tblUpdateStatusPerDevice.findAll({
                attributes: [
                    'deviceID',
                    'state', 
                    [db.sequelize.fn('COUNT', db.sequelize.col('state')), 'count']
                ],
                group: ['deviceID','state'],
                order: [['deviceID','ASC'],['state','ASC']],
                include: [{
                    model: db.tblDevices,
                    attributes: [],
                    where: {
                        targetGroupID: req.query.targetGroupID
                    }
                }]
            }).then(function(data) {
                res.json(data);
            }).catch(function(error) {
                res.json({error: error});
            });
        } else {
            db.tblUpdateStatusPerDevice.findAll({
                where: req.query
            }).then(function(data) {
                res.json(data);
            }).catch(function(error) {
                res.json({error: error});
            });
        }
    });
    

/* -------------Device details--------------- */
app.get('/api/devices/details', function(req, res) {
    db.tblDeviceDetails.findAll({
        where: req.query
    }).then(function(data) {
        res.json(data);
    }).catch(function(error) {
        res.json({error: error});
    });
});

app.get('/api/devices/details/:id', function(req, res) {
    db.tblDeviceDetails.findOne({
        where: {
            deviceID: req.params.id
        }
    }).then(function(data) {
        res.json(data);
    }).catch(function(error) {
        res.json({error: error});
    });
});

/* -------------Dowstream Servers--------------- */
app.get('/api/servers', function(req, res) {
    db.tblDowstreamServers.findAll({
        where: req.query
    }).then(function(data) {
        res.json(data);
    }).catch(function(error) {
        res.json({error: error});
    });
});

app.get('/api/servers/:id', function(req, res) {
    db.tblDowstreamServers.findOne({
        where: {
            serverID: req.params.id
        }
    }).then(function(data) {
        res.json(data);
    }).catch(function(error) {
        res.json({error: error});
    });
});

app.get('/api/servers/devices', function(req, res) {
    db.tblDevices.findAll({
        where: req.query,
        include: [{model: db.tblDevices}]
    }).then(function(data) {
        res.json(data);
    }).catch(function(error) {
        res.json({error: error});
    });
});

/* -------------Linux Updates--------------- */
app.get('/api/linux/updates', function(req, res) {
    db.tblLinuxUpdates.findAll({
        where: req.query
    }).then(function(data) {
        res.json(data);
    }).catch(function(error) {
        res.json({error: error});
    });
});

app.get('/api/linux/updates/:id', function(req, res) {
    db.tblLinuxUpdates.findOne({
        where: {
            packageID: req.params.id
        }
    }).then(function(data) {
        res.json(data);
    }).catch(function(error) {
        res.json({error: error});
    });
});

/* -------------Update Status Per Device--------------- */
app.get('/api/update/status', function(req, res) {
    db.tblUpdateStatusPerDevice.findAll({
        where: req.query
    }).then(function(data) {
        res.json(data);
    }).catch(function(error) {
        res.json({error: error});
    });
});

app.get('/api/update/status/:id', function(req, res) {
    db.tblUpdateStatusPerDevice.findOne({
        where: {
            deviceID: req.params.id,
            packageID: req.params.id
        }
    }).then(function(data) {
        res.json(data);
    }).catch(function(error) {
        res.json({error: error});
    });
});

/* -------------WSUS Updates--------------- */
app.get('/api/wsus/updates', function(req, res) {
    db.tblWSUSUpdates.findAll({
        where: req.query
    }).then(function(data) {
        res.json(data);
    }).catch(function(error) {
        res.json({error: error});
    });
});

app.get('/api/wsus/updates/:id', function(req, res) {
    db.tblDowstreamServers.findOne({
        where: {
            updateID: req.params.id
        }
    }).then(function(data) {
        res.json(data);
    }).catch(function(error) {
        res.json({error: error});
    });
});


}