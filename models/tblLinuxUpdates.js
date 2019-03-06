//Define table

module.exports = function (connection, Sequelize) {
    var tblLinuxUpdates = connection.define('tblLinuxUpdates', {
        packageID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        severity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        securityBulletin: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        additionalInfoUrl: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    tblLinuxUpdates.removeAttribute('id');
    tblLinuxUpdates.removeAttribute('createdAt');
    tblLinuxUpdates.removeAttribute('updatedAt');

    return tblLinuxUpdates;
};