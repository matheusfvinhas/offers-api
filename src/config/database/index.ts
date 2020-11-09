import Sequelize from 'sequelize';

class Database {
    public connection: Sequelize.Sequelize;

    constructor() {
        this.init();
    }

    async init(): Promise<void> {
        try {
            this.connection = new Sequelize.Sequelize(process.env.POSTGRES_URL, {
                dialect: 'postgres',
                dialectOptions: {
                    useUTC: false,
                    dateStrings: true,
                },
            });

            // this.connection = new Sequelize.Sequelize({
            //     dialect: 'sqlite',
            //     storage: './database.sqlite3',
            // });

            await this.connection.authenticate();

            console.log('Database connection has been established successfully.');
        } catch ({ message }) {
            console.log(message);
        }
    }
}

export default new Database();
