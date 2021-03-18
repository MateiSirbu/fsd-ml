import "reflect-metadata";
import { createConnection, UsingJoinColumnIsNotAllowedError } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import { Routes } from "./routes";
import { env } from "./env";
import * as fs from "fs";
import * as jsonwebtoken from "jsonwebtoken"

const isJwtValid = (req: Request, res: Response, next: NextFunction) => {
    let publicKey = fs.readFileSync(env.JWT_PUBLIC_KEY)
    let signOptions: jsonwebtoken.SignOptions = {
        algorithm: 'RS256',
        expiresIn: 86400,
    }
    let incomingToken = req.header("Authorization")
    if (!incomingToken) {
        res.sendStatus(403); return false;
    }
    const token = jsonwebtoken.verify(incomingToken.split(" ")[1], publicKey, signOptions)
    if (!token) {
        res.sendStatus(403); return false;
    }
    else
        return true;
}

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: NextFunction) => {
            if (!route.restricted || (route.restricted && isJwtValid(req, res, next))) {
                const result = (new (route.controller as any))[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(result => console.log(result.statusCode + " " + result.statusMessage));
                } else if (result !== null && result !== undefined) {
                    console.log("Undefined result"); res.json(result);
                }
            }
        })
    });

    // start express server
    app.listen(3000);
    console.log("Express server has started on port 3000.");

}).catch(error => console.log(error));
