import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Dessert } from "../entity/Dessert";

export class DessertController {

    private desertRepository = getRepository(Dessert);

    async GetAllDesserts(request: Request, response: Response, next: NextFunction) {
        let result = await this.desertRepository.find();
        console.log(result)
        if (result) {
            return response.json(result)
        } else {
            return response.sendStatus(404)
        }
    }

    async GetOneDessert(request: Request, response: Response, next: NextFunction) {
        let result = await this.desertRepository.findOne(request.params.dessert);
        if (result) {
            return response.json(result)
        } else {
            return response.sendStatus(404)
        }
    }

    async DeleteDessert(request: Request, response: Response, next: NextFunction) {
        let desertToDelete = await this.desertRepository.findOne(request.params.dessert);
        if (desertToDelete) {
            await this.desertRepository.remove(desertToDelete);
        } else {
            response.statusMessage = "This item is not in the database"
            return response.sendStatus(404)
        }
    }

    async CreateDessert(request: Request, response: Response, next: NextFunction) {
        let dessert = new Dessert;
        dessert.Dessert = request.body.dessert
        dessert.Calories = parseInt(request.body.calories)
        dessert.Fat = parseInt(request.body.fat)
        dessert.Carbs = parseInt(request.body.carbs)
        dessert.Protein = parseInt(request.body.protein)
        dessert.Sodium = parseInt(request.body.sodium)
        dessert.Calcium = request.body.calcium
        dessert.Iron = request.body.iron
        await this.desertRepository.insert(dessert);
        return response.sendStatus(200)
    }
}