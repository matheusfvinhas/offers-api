import { Response } from 'express';
import Course from '../models/course.model';

class CourseController {
    public async index({ res }: { res: Response }): Promise<void> {
        try {
            const courses = await Course.findAll();

            res.status(200).json(courses);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

export default new CourseController();
