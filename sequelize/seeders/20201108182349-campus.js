/* eslint @typescript-eslint/no-var-requires: 0 */

'use strict';

const offers = require('../../db.json');

module.exports = {
    up: async queryInterface => {
        try {
            for (const offer of offers) {
                const universityId = await queryInterface.rawSelect(
                    'universities',
                    {
                        where: {
                            name: offer.university.name,
                        },
                    },
                    ['id']
                );

                const id = await queryInterface.rawSelect(
                    'campus',
                    {
                        where: {
                            name: offer.campus.name,
                            university_id: universityId,
                        },
                    },
                    ['id']
                );

                if (!id) await queryInterface.bulkInsert('campus', [{ ...offer.campus, university_id: universityId }]);
            }
        } catch (error) {
            console.log(error);
        }
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('campus');
    },
};
