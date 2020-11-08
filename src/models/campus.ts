import Sequelize, { Model } from 'sequelize';
import database from '../config/database';

class Campus extends Model {
    public id!: number;

    public name!: string;

    public city!: string;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;
}

Campus.init(
    {
        name: {
            allowNull: false,
            unique: true,
            type: Sequelize.STRING,
        },
        city: {
            allowNull: false,
            type: Sequelize.STRING,
        },
    },
    {
        sequelize: database.connection,
    }
);

export default Campus;
