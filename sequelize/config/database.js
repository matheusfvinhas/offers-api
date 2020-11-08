module.exports = {
    development: {
        url: process.env.POSTGRES_URL,
        dialect: 'postgres',
    },
    production: {
        url: process.env.POSTGRES_URL,
        dialect: 'postgres',
    },
};
