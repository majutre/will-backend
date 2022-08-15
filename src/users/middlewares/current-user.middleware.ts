import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as session from 'express-session';
import { User } from "../user.entity";

import { UsersService } from "../users.service";

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {    
    const userId = req.session.userId;

    if (userId) {
      const user = await this.usersService.findById(userId);
      req.currentUser = user;
    }

    next();
  }
}