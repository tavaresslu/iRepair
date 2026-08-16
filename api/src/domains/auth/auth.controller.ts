import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json(user);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}

export function logout(req: Request, res: Response) {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout realizado' });
}

export function me(req: Request, res: Response) {
  res.status(200).json((req as any).user);
}