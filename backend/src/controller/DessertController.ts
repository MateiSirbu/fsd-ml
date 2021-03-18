import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Dessert } from "../entity/Dessert";

import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { error } from "console";

export class DessertController {

    private desertRepository = getRepository(Dessert);

    /*
    @Get('/desserts')
    getAll() {
    return this.desertRepository.find();
    }

    @Post('/desserts')
    post(@Body() dessert: Dessert) {
    return this.desertRepository.insert(dessert);
    }
    */
    
    async GetAllDesserts(request: Request, response: Response, next: NextFunction) {
        return this.desertRepository.find();
    }

    async GetOneDessert(request: Request, response: Response, next: NextFunction) {
        return this.desertRepository.findOne(request.params.email);
    }

    async DeleteDessert(request: Request, response: Response, next: NextFunction) {
        let deleteDesert = await this.desertRepository.findOne(request.params.id_desert);
        if (deleteDesert) {
            await this.desertRepository.remove(deleteDesert);
        } else {
            error("This item is not in the database");
        }
    }

    async CreateDessert(request: Request, response: Response, next: NextFunction) {
         let dessertToUpdate = await this.desertRepository.findOne(request.params.id_desert);

         if (dessertToUpdate){
            await this.desertRepository.update(request.body,dessertToUpdate);
         } else {
            await this.desertRepository.save(request.body);
         }
    }

}