import { NextFunction, Request, Response, Router } from "express";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";

import { UserModel } from "../data-model/user.model";
import { asyncMiddleware } from "../utils/utility";

const RSA_PRIVATE_KEY = fs.readFileSync("./jwtRS256.key");

export class AuthRoute {
  public static create(router: Router) {
    console.log("Auth route create");

    router.post(
      "/auth/login",
      asyncMiddleware(
        async (req: Request, res: Response, next: NextFunction) => {
          AuthRoute.login(req, res, next);
        }
      )
    );
  }

  private static async login(req: Request, res: Response, next: NextFunction) {
    let errorMsg: string = "";
    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findByName(username);

    if (!user) {
      res.status(200).json({ status: 1, msg: `User ${username} not exist` });
    } else if (user.password != password) {
      res.status(200).json({ status: 1, msg: `Password not correct` });
    } else {
      const jwtBearerToken = jwt.sign(
        {
          name: user.name,
          nick: user.nick,
          picture: user.picture,
          id: user.id
        },
        RSA_PRIVATE_KEY,
        {
          algorithm: "RS256",
          //expiresIn: 12000,
          subject: user.name
        }
      );
      res.status(200).json({
        status: 0,
        response: {
          token: jwtBearerToken
        }
      });
    }
  }
}
