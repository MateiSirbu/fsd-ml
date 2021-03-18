import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Dessert } from "../entity/Dessert";

export class DessertController {

    private dessertRepository = getRepository(Dessert);

    async getAllDesserts(request: Request, response: Response, next: NextFunction) {
        let result = await this.dessertRepository.find();
        console.log(result)
        if (result) {
            return response.json(result)
        } else {
            return response.sendStatus(404)
        }
    }

    async getOneDessert(request: Request, response: Response, next: NextFunction) {
        let result = await this.dessertRepository.findOne(request.params.dessert);
        if (result) {
            return response.json(result)
        } else {
            return response.sendStatus(404)
        }
    }

    async deleteDessert(request: Request, response: Response, next: NextFunction) {
        let desertToDelete = await this.dessertRepository.findOne(request.params.dessert);
        if (desertToDelete) {
            await this.dessertRepository.remove(desertToDelete);
        } else {
            response.statusMessage = "This item is not in the database."
            return response.sendStatus(404)
        }
    }

    async createDessert(request: Request, response: Response, next: NextFunction) {
        let dessert = new Dessert;
        dessert.dessert = request.body.dessert
        dessert.calories = parseInt(request.body.calories)
        dessert.fat = parseInt(request.body.fat)
        dessert.carbs = parseInt(request.body.carbs)
        dessert.protein = parseInt(request.body.protein)
        dessert.sodium = parseInt(request.body.sodium)
        dessert.calcium = request.body.calcium
        dessert.iron = request.body.iron
        await this.dessertRepository.insert(dessert);
        return response.sendStatus(200)
    }
}