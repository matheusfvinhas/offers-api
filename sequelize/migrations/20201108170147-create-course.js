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
            campus_id: {
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
