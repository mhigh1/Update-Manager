//Define table

module.exports = function (connection, Sequelize) {
    var tblDowstreamServers = connection.define('tblDowstreamServers', {
        serverID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        accountName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        accountServerID: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastSyncTime: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        rollupLastSyncTime: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastRollupTime: {
            type: Sequelize.DATE,
            allowNull: false,
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
        },
        version: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        isReplica: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    });

    tblDowstreamServers.associate = function(models) {
        tblDowstreamServers.hasMany(models.tblDevices, {foreignKey: 'parentServerID'});
    }


    tblDowstreamServers.removeAttribute('id');
    tblDowstreamServers.removeAttribute('createdAt');
    tblDowstreamServers.removeAttribute('updatedAt');

    return tblDowstreamServers;
};