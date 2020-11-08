'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Offers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            full_price: { allowNull: false, type: Sequelize.FLOAT },
            price_with_discount: { allowNull: false, type: Sequelize.FLOAT },
            discount_percentage: { allowNull: false, type: Sequelize.FLOAT },
            start_date: { allowNull: false, type: Sequelize.STRING },
            enrollment_semester: { allowNull: false, type: Sequelize.STRING },
            enabled: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: true },
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
            course_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Courses',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
        });
    },
    down: async queryInterface => {
        await queryInterface.dropTable('Offers');
    },
};
