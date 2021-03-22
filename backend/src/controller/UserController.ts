import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as fs from "fs";
import { env } from "../env";
import * as crypto from "crypto-js";
import * as jsonwebtoken from "jsonwebtoken";

export class UserController {

    private userRepository = getRepository(User);

    validateCredentials(user: User, password: string) {
        return user.hash
            == crypto.PBKDF2(password, user.salt, { keySize: env.PBKDF2_KEY_SIZE, iterations: env.PBKDF2_ITERATIONS }).toString(crypto.enc.Hex);
    }

    hashPassword(password: string) {
        var salt = crypto.lib.WordArray.random(128).toString(crypto.enc.Hex);
        var hash = crypto.PBKDF2(password, salt, { keySize: env.PBKDF2_KEY_SIZE, iterations: env.PBKDF2_ITERATIONS }).toString(crypto.enc.Hex);
        return { salt: salt, hash: hash, iterations: env.PBKDF2_ITERATIONS }
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.email);
    }

    async signUp(request: Request, response: Response, next: NextFunction) {
        const saltAndHash = this.hashPassword(request.body.password)
        const newUser = new User;
        newUser.email = request.body.email
        newUser.salt = saltAndHash.salt
        newUser.hash = saltAndHash.hash
        try {
            await this.userRepository.save(newUser)
            response.statusMessage = "User enrollment successful."
            response.statusCode = 200
            return response.send()
        }
        catch {
            response.statusMessage = "Cannot enrol user."
            return response.sendStatus(500)
        }

    }

    async login(request: Request, response: Response, next: NextFunction) {
        let user = await this.userRepository.findOne({ email: request.body.email });
        if (user === null) {
            response.statusMessage = "User not found."
            response.statusCode = 404
            return response
        }
        if (user instanceof User) {
            const privateKey = fs.readFileSync(env.JWT_PRIVATE_KEY)
            if (this.validateCredentials(user, request.body.password)) {
                let signOptions: jsonwebtoken.SignOptions = {
                    algorithm: 'RS256',
                    expiresIn: 86400,
                    subject: String(user.id),
                }
                const token = jsonwebtoken.sign({}, privateKey, signOptions)
                response.statusMessage = "Valid credentials. Sending token to frontend."
                response.statusCode = 200
                return response.json({ idToken: token, expiresIn: 86400 })
            } else {
                response.statusMessage = "Incorrect credentials."
                return response.sendStatus(401)
            }
        } else {
            return response.sendStatus(401)
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.email);
        await this.userRepository.remove(userToRemove);
    }

}