'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Courses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: { allowNull: false, type: Sequelize.STRING },
            kind: { allowNull: false, type: Sequelize.STRING },
            level: { allowNull: false, type: Sequelize.STRING },
            shift: { allowNull: false, type: Sequelize.STRING },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            universityId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Universities',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            campusId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Campus',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
        });
    },
    down: async queryInterface => {
        await queryInterface.dropTable('Courses');
    },
};
