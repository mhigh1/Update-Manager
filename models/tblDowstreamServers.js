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
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        accountServerID: {
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
        rollupLastSyncTime: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        lastRollupTime: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        parentServerID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        version: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        isReplica: {
            type: Sequelize.INTEGER,
            allowNull: true,
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