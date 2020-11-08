import { Response } from 'express';
import Campus from '../models/campus.model';
import Course from '../models/course.model';
import University from '../models/university.model';
import { CourseUtil } from '../utils/course.util';

class CourseController {
    public async index({ res }: { res: Response }): Promise<void> {
        try {
            const courses = await Course.findAll({
                include: {
                    model: Campus,
                    as: 'campus',
                    include: [
                        {
                            model: University,
                            as: 'university',
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
