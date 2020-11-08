import Sequelize, { Model } from 'sequelize';
import database from '../config/database';
import Campus from './campus.model';

class Course extends Model {
    public id!: number;

    public name!: string;

    public kind!: string;

    public level!: string;

    public shift!: string;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;

    public campus: Campus;
}

Course.init(
    {
        name: { allowNull: false, type: Sequelize.STRING },
        kind: { allowNull: false, type: Sequelize.STRING },
        level: { allowNull: false, type: Sequelize.STRING },
        shift: { allowNull: false, type: Sequelize.STRING },
    },
    {
        sequelize: database.connection,
        underscored: true,
    }
);

Course.belongsTo(Campus, { as: 'campus', foreignKey: 'campusId' });
Campus.hasMany(Course, { as: 'course', foreignKey: 'campusId' });

export default Course;
