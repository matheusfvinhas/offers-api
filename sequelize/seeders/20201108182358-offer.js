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

                const courseId = await queryInterface.rawSelect(
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

                const newOffer = {
                    full_price: offer.full_price,
                    price_with_discount: offer.price_with_discount,
                    discount_percentage: offer.discount_percentage,
                    start_date: offer.start_date,
                    enrollment_semester: offer.enrollment_semester,
                    enabled: true,
                    course_id: courseId,
                };

                const id = await queryInterface.rawSelect(
                    'Offers',
                    {
                        where: newOffer,
                    },
                    ['id']
                );

                if (!id) await queryInterface.bulkInsert('Offers', [newOffer]);
            }
        } catch (error) {
            console.log(error);
        }
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('Offers');
    },
};
