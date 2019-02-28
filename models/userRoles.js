//Define table

module.exports = function (connection, Sequelize) {
    var userRoles = connection.define('userRoles', {
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        roleID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    });
    userRoles.removeAttribute('id');
    userRoles.removeAttribute('createdAt');
    userRoles.removeAttribute('updatedAt');
    return userRoles;
};
