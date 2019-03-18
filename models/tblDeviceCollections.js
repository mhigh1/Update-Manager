module.exports = function (connection, Sequelize) {
    const tblDeviceCollections = connection.define('tblDeviceCollections', {
        Name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        Description: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        TargetGroupID: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        ParentGroupID: {
            type: Sequelize.STRING,   
            allowNull: true,
            references: {
                model: 'tblDeviceCollections',
                key: 'TargetGroupID'
            }
        },
        IsBuiltin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }
    },{
        timestamps: false,
        freezeTableName: true,
        tableName: "tblDeviceCollections"
    });

    // Associations
    tblDeviceCollections.belongsTo(tblDeviceCollections, {foreignKey: 'ParentGroupID'});

    return tblDeviceCollections;
};