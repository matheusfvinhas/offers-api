let database = {};

if (process.env.DATABASE === 'POSTGRES')
    database = {
        development: {
            url: process.env.POSTGRES_URL,
            dialect: 'postgres',
        },
        production: {
            url: process.env.POSTGRES_URL,
            dialect: 'postgres',
        },
    };
else
    database = {
        development: {
            dialect: 'sqlite',
            storage: './database.sqlite3',
        },
        production: {
            dialect: 'sqlite',
            storage: './database.sqlite3',
        },
    };

module.exports = database;
