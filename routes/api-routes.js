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
            if(req.query.deviceID) {
                include = [{
                    model: db.tblDevices,
                    attributes: [],
                    where: {
                        deviceID: req.query.deviceID
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

    app.get('/api/devices/updates/group/:id', function(req, res) {
        db.sequelize.query(`
            SELECT td.DeviceID, td.hostName, 
            CASE
                WHEN (dd.osMajorVersion = 6 AND dd.osMinorVersion = 10) THEN 'Linux 6.10'
                WHEN (dd.osMajorVersion = 7 AND dd.osMinorVersion = 6) THEN 'Linux 7.6'
                WHEN (dd.osMajorVersion = 6 AND dd.osMinorVersion = 1) THEN 'Windows Server 2008 R2'
                WHEN (dd.osMajorVersion = 6 AND dd.osMinorVersion = 2) THEN 'Windows Server 2012'
                WHEN (dd.osMajorVersion = 6 AND dd.osMinorVersion = 3) THEN 'Windows Server 2012 R2'
                WHEN (dd.osMajorVersion = 10) THEN 'Windows Server 2016'
                ELSE "UNKNOWN"
            END AS 'OS',
            (SELECT count(state) FROM tblUpdateStatusPerDevices AS t WHERE t.state = 0 AND t.deviceID = m.deviceID) AS 'Unknown',
            (SELECT count(state) FROM tblUpdateStatusPerDevices AS t WHERE t.state = 1 AND t.deviceID = m.deviceID) AS 'NotInstalled',
            (SELECT count(state) FROM tblUpdateStatusPerDevices AS t WHERE t.state = 2 AND t.deviceID = m.deviceID) AS 'Needed',
            (SELECT count(state) FROM tblUpdateStatusPerDevices AS t WHERE t.state = 3 AND t.deviceID = m.deviceID) AS 'Downloaded',
            (SELECT count(state) FROM tblUpdateStatusPerDevices AS t WHERE t.state = 4 AND t.deviceID = m.deviceID) AS 'Installed',
            (SELECT count(state) FROM tblUpdateStatusPerDevices AS t WHERE t.state = 5 AND t.deviceID = m.deviceID) AS 'Failed',
            (SELECT count(state) FROM tblUpdateStatusPerDevices AS t WHERE t.state = 6 AND t.deviceID = m.deviceID) AS 'PendingReboot'
            FROM tblUpdateStatusPerDevices AS m
            INNER JOIN tblDevices AS td ON m.deviceID = td.deviceID
            INNER JOIN tblDeviceDetails AS dd ON td.deviceID = dd.DeviceID
            WHERE td.targetGroupID = :targetGroupID
            GROUP BY td.deviceID;`,
                { replacements: {
                    targetGroupID: req.params.id
                }, type: db.sequelize.QueryTypes.SELECT}
            ).then(function(data) {
                res.json(data);
            }).catch(function(error) {
                res.json({error: error});
            });
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