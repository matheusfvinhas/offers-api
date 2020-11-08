import Sequelize, { Model } from 'sequelize';
import database from '../config/database';
import Course from './course.model';
import University from './university.model';

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
    }
);

Campus.belongsTo(University);

Campus.hasMany(Course);

export default Campus;
