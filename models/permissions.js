//Define table

module.exports = function (connection, Sequelize) {
    var permissions = connection.define('permissions', {
        permissionID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        permissionName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    //permissions.removeAttribute('id');
    permissions.removeAttribute('createdAt');
    permissions.removeAttribute('updatedAt');
    //

    return permissions;
};