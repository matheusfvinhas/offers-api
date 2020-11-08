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

                const campusId = await queryInterface.rawSelect(
                    'Campus',
                    {
                        where: {
                            name: offer.campus.name,
                            university_id: universityId,
                        },
                    },
                    ['id']
                );

                const id = await queryInterface.rawSelect(
                    'Courses',
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

                if (!id) await queryInterface.bulkInsert('Courses', [{ ...offer.course, campus_id: campusId }]);
            }
        } catch (error) {
            console.log(error);
        }
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('Courses');
    },
};
