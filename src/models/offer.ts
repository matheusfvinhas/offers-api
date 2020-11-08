import Sequelize, { Model } from 'sequelize';
import database from '../config/database';

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
    }
);

export default Offer;
