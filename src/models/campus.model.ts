import Sequelize, { Model } from 'sequelize';
import database from '../config/database';
import University from './university.model';

class Campus extends Model {
    public id!: number;

    public name!: string;

    public city!: string;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;

    public university: University;
}

Campus.init(
    {
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        city: {
            allowNull: false,
            type: Sequelize.STRING,
        },
    },
    {
        sequelize: database.connection,
        underscored: true,
        tableName: 'campus',
    }
);

Campus.belongsTo(University, { as: 'university', foreignKey: 'universityId' });
University.hasMany(Campus, { as: 'campus', foreignKey: 'universityId' });

export default Campus;
