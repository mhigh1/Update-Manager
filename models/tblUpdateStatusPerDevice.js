//Define table

module.exports = function (connection, Sequelize) {
    var tblUpdateStatusPerDevice = connection.define('tblUpdateStatusPerDevice', {
        deviceID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        packageID: {
            PRIMARYKEY: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        state: {
            PRIMARYKEY: false,
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
    });

    tblUpdateStatusPerDevice.removeAttribute('id');
    tblUpdateStatusPerDevice.removeAttribute('createdAt');
    tblUpdateStatusPerDevice.removeAttribute('updatedAt');
    //

    return tblUpdateStatusPerDevice;
}

