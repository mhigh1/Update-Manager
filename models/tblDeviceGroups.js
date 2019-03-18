module.exports = function (connection, Sequelize) {
    const tblDeviceGroup = connection.define('tblDeviceGroup', {
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
                key: 'TargetGroupID'
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
    tblDeviceGroup.belongsTo(tblDeviceGroup, {foreignKey: 'parentGroupID'});

    return tblDeviceGroup;
};