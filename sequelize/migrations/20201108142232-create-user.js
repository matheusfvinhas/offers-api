'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            username: { allowNull: false, unique: true, type: Sequelize.STRING },
            email: { allowNull: false, unique: true, type: Sequelize.STRING },
            first_name: { allowNull: false, type: Sequelize.STRING },
            last_name: { allowNull: false, type: Sequelize.STRING },
            password_hash: { allowNull: false, type: Sequelize.STRING },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date(),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date(),
            },
        });
    },
    down: async queryInterface => {
        await queryInterface.dropTable('users');
    },
};
