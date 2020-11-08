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

                const campusId = await queryInterface.rawSelect(
                    'campus',
                    {
                        where: {
                            name: offer.campus.name,
                            university_id: universityId,
                        },
                    },
                    ['id']
                );

                const id = await queryInterface.rawSelect(
                    'courses',
                    {
                        where: {
                            name: offer.course.name,
                            kind: offer.course.kind,
                            level: offer.course.level,
                            shift: offer.course.shift,
                            campus_id: campusId,
                        },
                    },
                    ['id']
                );

                if (!id) await queryInterface.bulkInsert('courses', [{ ...offer.course, campus_id: campusId }]);
            }
        } catch (error) {
            console.log(error);
        }
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('courses');
    },
};
