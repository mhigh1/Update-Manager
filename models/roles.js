//Define table

module.exports = function (connection, Sequelize) {
    var roles = connection.define('roles', {
        roleID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        roleName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        roleDescription: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        RoleType: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    //roles.removeAttribute('id');
    roles.removeAttribute('createdAt');
    roles.removeAttribute('updatedAt');

    return roles;
};