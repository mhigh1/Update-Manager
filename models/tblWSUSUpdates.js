//Define table

module.exports = function (connection, Sequelize) {
    var tblWSUSUpdates = connection.define('tblWSUSUpdates', {
        updateID: {
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
        arrivalDate: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        creationDate: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        mSrcSeverity: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        updateType: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        updateSource: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        knowledgeBaseArticle: {
            type: Sequelize.STRING,
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
        },
        installationRebootBehavior: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
    });
    tblWSUSUpdates.removeAttribute('id');
    tblWSUSUpdates.removeAttribute('createdAt');
    tblWSUSUpdates.removeAttribute('updatedAt');

    return tblWSUSUpdates;
};