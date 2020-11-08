import { Response } from 'express';
import Campus from '../models/campus.model';
import Course from '../models/course.model';
import Offer from '../models/offer.model';
import University from '../models/university.model';

class OfferController {
    public async index({ res }: { res: Response }): Promise<void> {
        try {
            const offers = await Offer.findAll({
                attributes: [
                    'full_price',
                    'price_with_discount',
                    'discount_percentage',
                    'start_date',
                    'enrollment_semester',
                    'enabled',
                ],
                include: [
                    {
                        model: Course,
                        attributes: ['name', 'kind', 'level', 'shift'],
                        include: [
                            {
                                model: Campus,
                                attributes: ['name', 'city'],
                                include: [
                                    {
                                        model: University,
                                        attributes: ['name', 'score', 'logo_url'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });

            res.status(200).json(offers);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

export default new OfferController();
