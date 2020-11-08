'use strict';

const offers = require('../db.json');

module.exports = {
    up: async queryInterface => {
        try {
            for (const offer of offers) {
                const id = await queryInterface.rawSelect(
                    'Universities',
                    {
                        where: {
                            name: offer.university.name,
                        },
                    },
                    ['id']
                );

                if (!id) await queryInterface.bulkInsert('Universities', [offer.university]);
            }
        } catch (error) {
            console.log(error);
        }
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('Universities');
    },
};
