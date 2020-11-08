import { Response } from 'express';
import Offer from '../models/offer.model';

class OfferController {
    public async index({ res }: { res: Response }): Promise<void> {
        try {
            const offers = await Offer.findAll();

            res.status(200).json(offers);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

export default new OfferController();
