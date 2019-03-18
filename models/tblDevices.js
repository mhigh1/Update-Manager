//Define table
module.exports = function (connection, Sequelize) {
    var tblDevices = connection.define('tblDevices', {
        deviceID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        hostName: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        fullDomainName: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        ipAddress: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        deviceGroup: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        osFamily: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        lastSyncTime: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        lastReportedStatusTime: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        lastReportedRebootTime: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        effectiveLastDetectionTime: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        lastSyncResult: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        parentServerID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
        
    });
    tblDevices.associate = function(models) {
        tblDevices.hasOne(models.tblDeviceDetails, {foreignKey: 'deviceID'});
        tblDevices.belongsTo(models.tblDowstreamServers, {foreignKey: 'parentServerID'});

    }
    
    // 1:M
    //tblDowstreamServers.hasMany(tblDevices, {foreignKey: 'parentServerID'});
    //tblDevices.belongsTo(tblDowstreamServers, {foreignKey: 'parentServerID'});


    tblDevices.removeAttribute('id');
    tblDevices.removeAttribute('createdAt');
    tblDevices.removeAttribute('updatedAt');

    return tblDevices;
};