import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { auth } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { User } from '../db/entities/user.entity';

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header) {
      return abortRequest(res, 'JWT not found in headers');
    }

    const headerParts = header.split('Bearer ');
    if (headerParts.length !== 2) {
      return abortRequest(res, 'Invalid authorization header');
    }

    const jwt = headerParts[1];
    const decodedToken = await auth().verifyIdToken(jwt);

    if (!decodedToken) {
      abortRequest(res, 'Invalid JWT');
    } else {
      req['user'] = await findOrCreateUser(decodedToken);
      next();
    }
  }
}

async function findOrCreateUser(decodedToken: DecodedIdToken): Promise<User> {
  const { uid, email, name } = decodedToken;
  const user = await User.findOneBy({ uid });
  if (user) {
    return user;
  }
  const newUser = User.create({ uid, email, name });
  await newUser.save();
  return newUser;
}

function abortRequest(res: Response, message: string) {
  res.status(403).json({ message });
}
