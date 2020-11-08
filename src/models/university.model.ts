import Sequelize, { Model } from 'sequelize';
import database from '../config/database';

class University extends Model {
    public id!: number;

    public name!: string;

    public score!: number;

    public logoUrl: string;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;
}

University.init(
    {
        name: { allowNull: false, unique: true, type: Sequelize.STRING },
        score: { allowNull: false, type: Sequelize.FLOAT },
        logoUrl: {
            type: Sequelize.STRING,
        },
    },
    {
        sequelize: database.connection,
        underscored: true,
        tableName: 'Universities',
    }
);

export default University;
