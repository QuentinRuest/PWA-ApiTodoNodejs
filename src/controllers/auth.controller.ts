import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { Register } from '../types/auth.types';

const authService = new AuthService();

export class AuthController {

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password);
            if (!user) {
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }
            req.session.regenerate((error) => {
                if (error) {
                    next(error);
                    return;
                }
            req.session.userId = user.id;
            req.session.save((error) => {
                if (error) {
                    next(error);
                    return;
                }
            res.json({ message: 'Login successful',
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
            });
            });
        });
        } catch (error) {
            next(error);
        }
    }
    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const registerRequest: Register = req.body;
        try {
            const user = await authService.Register(registerRequest);
            res.status(201).json(user);
        } catch (error) {
          next(error);
        }
      };
}