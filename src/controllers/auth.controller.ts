import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { Op } from 'sequelize';
import User from '../models/user.model';

class AuthenticationController {
    public async authenticate(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password }: { username: string; email: string; password: string } = req.body;

            const user = await User.findOne({
                where: { [Op.or]: [{ username: username || '' }, { email: email || '' }] },
            });

            if (!user || !(await user.checkPassword(password))) {
                res.status(401).json('Usuário e/ou senha inválidos.');
                return;
            }

            const token: string = jwt.sign(
                { username: user.username, email: user.email, sub: user.id },
                process.env.JWT_SECRET as Secret,
                {
                    expiresIn: '15m',
                }
            );

            res.status(200).json(token);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

export default new AuthenticationController();
