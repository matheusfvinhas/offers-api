import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Campus from '../models/campus.model';
import Course from '../models/course.model';
import Offer from '../models/offer.model';
import University from '../models/university.model';
import { OfferUtil } from '../utils/offer.util';

class OfferController {
    public async index(req: Request, res: Response): Promise<void> {
        try {
            const order = ((req.query.order as string) || '').toUpperCase();
            const { university, course, kind, level, shift, city } = req.query;

            const offers = await Offer.findAll({
                order: [['priceWithDiscount', order === 'ASC' || order === 'DESC' ? order : 'ASC']],
                include: [
                    {
                        model: Course,
                        as: 'course',
                        required: true,
                        where: {
                            name: {
                                [Op.like]: `%${course || ''}%`,
                            },
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
                        include: [
                            {
                                model: Campus,
                                as: 'campus',
                                required: true,
                                where: {
                                    city: {
                                        [Op.like]: `%${city || ''}%`,
                                    },
                                },
                                include: [
                                    {
                                        model: University,
                                        as: 'university',
                                        required: true,
                                        where: {
                                            name: {
                                                [Op.like]: `%${university || ''}%`,
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });

            res.status(200).json(OfferUtil.buildOfferReturn(offers));
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

export default new OfferController();
