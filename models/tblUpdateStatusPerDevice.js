module.exports = function (connection, Sequelize) {
    var tblUpdateStatusPerDevice = connection.define('tblUpdateStatusPerDevice', {
        deviceID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        packageID: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        state: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },{
        timestamps: false
    });
    
    // Associations
    tblUpdateStatusPerDevice.associate = function(models) {
        tblUpdateStatusPerDevice.belongsTo(models.tblDevices, {foreignKey: 'deviceID'});
    }
    return tblUpdateStatusPerDevice;
}

