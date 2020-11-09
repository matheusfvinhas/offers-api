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

// module.exports = {
//     development: {
//         dialect: 'sqlite',
//         storage: './database.sqlite3',
//     },
//     production: {
//         dialect: 'sqlite',
//         storage: './database.sqlite3',
//     },
// };
