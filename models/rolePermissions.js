//Define table

module.exports = function (connection, Sequelize) {
    var rolePermissions = connection.define('rolePermissions', {
        roleID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        permissionID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    });
    rolePermissions.removeAttribute('id');
    rolePermissions.removeAttribute('createdAt');
    rolePermissions.removeAttribute('updatedAt');

    return rolePermissions;
};