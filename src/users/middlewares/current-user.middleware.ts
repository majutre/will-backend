import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as session from 'express-session';

import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {    
      //@ts-ignore
    
    const userId = req.session.userId;

    if (userId) {
      //@ts-ignore
      const user = await this.usersService.findById(userId);
      
      //@ts-ignore
      req.currentUser = user;
    }

    next();
  }
}