//Define table

module.exports = function (connection, Sequelize) {
    var tblLinuxUpdates = connection.define('tblLinuxUpdates', {
        packageID: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        severity: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        securityBulletin: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        additionalInfoUrl: {
            type: Sequelize.STRING,
            allowNull: true,
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