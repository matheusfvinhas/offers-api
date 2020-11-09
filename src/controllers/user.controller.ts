import { Request, Response } from 'express';
import { Op } from 'sequelize';
import User from '../models/user.model';

class UserController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const newUser = new User(req.body);

            const user = await User.findOne({
                where: { [Op.or]: [{ username: newUser.username || '' }, { email: newUser.email || '' }] },
            });

            if (!!user) {
                res.status(400).json('Usuário já existe.');
                return;
            }

            await newUser.save();

            res.status(201).json();
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    public async index({ res }: { res: Response }): Promise<void> {
        try {
            const users = await User.findAll({ attributes: { exclude: ['passwordHash'] } });

            res.status(200).json(users);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

export default new UserController();
