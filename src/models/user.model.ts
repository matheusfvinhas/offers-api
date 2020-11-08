import bcrypt from 'bcrypt';
import Sequelize, { Model } from 'sequelize';
import database from '../config/database';

class User extends Model {
    public id!: number;

    public username!: string;

    public email!: string;

    public firstName!: string;

    public lastName!: string;

    public password!: string;

    public passwordHash!: string;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;

    public async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.passwordHash);
    }
}

User.init(
    {
        username: { type: Sequelize.STRING, unique: true },
        email: { type: Sequelize.STRING, unique: true },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        passwordHash: Sequelize.STRING,
    },
    {
        sequelize: database.connection,
    }
);

User.addHook(
    'beforeSave',
    async (user: User): Promise<void> => {
        if (user.password) {
            user.passwordHash = await bcrypt.hash(user.password, 8);
        }
    }
);

export default User;
