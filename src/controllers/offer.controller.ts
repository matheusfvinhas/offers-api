import { Request, Response } from 'express';
import Campus from '../models/campus.model';
import Course from '../models/course.model';
import Offer from '../models/offer.model';
import University from '../models/university.model';
import { OfferUtil } from '../utils/offer.util';

class OfferController {
    public async index(req: Request, res: Response): Promise<void> {
        try {
            const offers = await Offer.findAll({
                order: [['priceWithDiscount', req.query.order as string]],
                include: [
                    {
                        model: Course,
                        as: 'course',
                        include: [
                            {
                                model: Campus,
                                as: 'campus',
                                include: [
                                    {
                                        model: University,
                                        as: 'university',
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
