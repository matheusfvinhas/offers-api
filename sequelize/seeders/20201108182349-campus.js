/* eslint @typescript-eslint/no-var-requires: 0 */

'use strict';

const offers = require('../../db.json');

module.exports = {
    up: async queryInterface => {
        try {
            for (const offer of offers) {
                const universityId = await queryInterface.rawSelect(
                    'Universities',
                    {
                        where: {
                            name: offer.university.name,
                        },
                    },
                    ['id']
                );

                const id = await queryInterface.rawSelect(
                    'Campus',
                    {
                        where: {
                            name: offer.campus.name,
                            university_id: universityId,
                        },
                    },
                    ['id']
                );

                if (!id) await queryInterface.bulkInsert('Campus', [{ ...offer.campus, university_id: universityId }]);
            }
        } catch (error) {
            console.log(error);
        }
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('Campus');
    },
};
