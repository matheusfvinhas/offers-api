import Sequelize, { Model } from 'sequelize';
import database from '../config/database';
import Course from './course.model';

class Offer extends Model {
    public id!: number;

    public fullPrice!: number;

    public priceWithDiscount!: number;

    public discountPercentage!: number;

    public startDate!: string;

    public enrollmentSemester!: string;

    public enabled!: boolean;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;
}

Offer.init(
    {
        fullPrice: { allowNull: false, type: Sequelize.FLOAT },
        priceWithDiscount: { allowNull: false, type: Sequelize.FLOAT },
        discountPercentage: { allowNull: false, type: Sequelize.FLOAT },
        startDate: { allowNull: false, type: Sequelize.STRING },
        enrollmentSemester: { allowNull: false, type: Sequelize.STRING },
        enabled: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: true },
    },
    {
        sequelize: database.connection,
        underscored: true,
        tableName: 'Offers',
    }
);

Offer.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Offer, { foreignKey: 'courseId' });

export default Offer;
