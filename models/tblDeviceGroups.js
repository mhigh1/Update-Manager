module.exports = function (connection, Sequelize) {
    const tblDeviceGroups = connection.define('tblDeviceGroups', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
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
        targetGroupID: {
            primaryKey: true,
            type: Sequelize.UUID,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        parentGroupID: {
            type: Sequelize.UUID,   
            allowNull: true,
            references: {
                model: 'tblDeviceGroups',
                key: 'targetGroupID'
            }
        },
        isBuiltin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }
    },{
        timestamps: false
    });

    // Associations
    tblDeviceGroups.associate = function(models) {
        tblDeviceGroups.belongsTo(tblDeviceGroups, {foreignKey: 'parentGroupID'});
        tblDeviceGroups.hasMany(models.tblDevices, {foreignKey: 'targetGroupID'});
    }
    return tblDeviceGroups;
};