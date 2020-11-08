import { Response } from 'express';
import Campus from '../models/campus.model';
import Course from '../models/course.model';
import University from '../models/university.model';

class CourseController {
    public async index({ res }: { res: Response }): Promise<void> {
        try {
            const courses = await Course.findAll({
                attributes: ['name', 'kind', 'level', 'shift'],
                include: {
                    model: Campus,
                    attributes: ['name', 'city'],
                    include: [
                        {
                            model: University,
                            attributes: ['name', 'score', 'logo_url'],
                        },
                    ],
                },
            });

            res.status(200).json(courses);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

export default new CourseController();
