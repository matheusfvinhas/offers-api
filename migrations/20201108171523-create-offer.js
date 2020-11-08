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
            fullPrice: { allowNull: false, type: Sequelize.FLOAT },
            priceWithDiscount: { allowNull: false, type: Sequelize.FLOAT },
            discountPercentage: { allowNull: false, type: Sequelize.FLOAT },
            startDate: { allowNull: false, type: Sequelize.STRING },
            enrollmentSemester: { allowNull: false, type: Sequelize.STRING },
            enabled: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: true },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            courseId: {
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
