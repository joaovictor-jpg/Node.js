import { verify, decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { userByEmail } from '../repositories/UserRepository';
import User from '../models/User';

declare module 'express' {
    interface Request {
        user?: User;
    }
}

export = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Authentication token not provided.' });
  }

  const [, jwt] = token.split(' ');

  try {

    const jwtSecret = process.env.JWT_SERCRET;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is not defined.');
    }

    verify(jwt, jwtSecret);

    const decodedToken = decode(jwt);

    let userEmail: string | undefined;

    if (decodedToken && typeof decodedToken === 'object' && 'email' in decodedToken) {
      userEmail = (decodedToken).email;
    } else if (typeof decodedToken === 'string') {
      return res.status(401).json({ error: 'Invalid token payload format.' });
    } else {
      return res.status(401).json({ error: 'Invalid token payload.' });
    }

    if (!userEmail) {
      return res.status(401).json({ error: 'The token does not contain the user email.' });
    }

    const user = await userByEmail(userEmail);

    if (!user) {
      return res.status(401).json({ error: `User associated with token email "${userEmail}" not found.` });
    }

    req.user = user;

    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Expired authentication token.' });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid authentication token.' });
      }
      console.error('Authentication middleware error:', error);
      return res.status(500).json({ error: 'Failed to authenticate token.' });
    } else {
      console.error('Erro desconhecido no middleware de autenticação:', error);
      return res.status(500).json({ error: 'Unknown failure to authenticate token.' });
    }
  }
};