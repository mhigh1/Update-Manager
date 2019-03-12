//Define table
module.exports = function (connection, Sequelize) {
    var tblDeviceDetails = connection.define('tblDeviceDetails', {
        deviceID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        osMajorVersion: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        osMinorVersion: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        osBuildNumber: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        osServicePack: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        osLocale: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        computerMake: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        computerModel: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        biosVersion: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
    });

    tblDeviceDetails.associate = function(models) {
        tblDeviceDetails.belongsTo(models.tblDevices, {foreignKey: 'deviceID'});
    }

     // 1:1
    // tblDeviceDetails.belongsTo(tblDevices, {foreignKey: 'deviceID'});
    //tblDevices.hasOne(tblDeviceDetails, {foreignKey: 'deviceID'});

    tblDeviceDetails.removeAttribute('id');
    tblDeviceDetails.removeAttribute('createdAt');
    tblDeviceDetails.removeAttribute('updatedAt');

    return tblDeviceDetails;
};