import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Campus from '../models/campus.model';
import Course from '../models/course.model';
import University from '../models/university.model';
import { CourseUtil } from '../utils/course.util';

class CourseController {
    public async index(req: Request, res: Response): Promise<void> {
        try {
            const { university, kind, level, shift } = req.query;

            const courses = await Course.findAll({
                where: {
                    kind: {
                        [Op.like]: `%${kind || ''}%`,
                    },
                    level: {
                        [Op.like]: `%${level || ''}%`,
                    },
                    shift: {
                        [Op.like]: `%${shift || ''}%`,
                    },
                },
                include: {
                    model: Campus,
                    as: 'campus',
                    required: true,
                    include: [
                        {
                            model: University,
                            as: 'university',
                            where: {
                                name: {
                                    [Op.like]: `%${university || ''}%`,
                                },
                            },
                            required: true,
                        },
                    ],
                },
            });

            res.status(200).json(CourseUtil.buildCourseReturn(courses));
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

export default new CourseController();
