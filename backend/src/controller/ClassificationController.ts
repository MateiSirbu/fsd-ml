import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Classification } from "../entity/Classification";
import { MnistData } from "../logic/Data";
import * as tf from '@tensorflow/tfjs-node';
import { DataStorage, LayersModel } from "@tensorflow/tfjs-node";

export class ClassificationController {

    data: MnistData;
    private classificationRepository = getRepository(Classification);

    constructor() {
        this.data = new MnistData();
    }

    private toArrayBuffer(buf) {
        var ab = new ArrayBuffer(buf.length);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buf.length; ++i) {
            view[i] = buf[i];
        }
        return ab;
    }

    private doEvaluation(model: LayersModel, data: MnistData, testDataSize = 500) {
        const IMAGE_WIDTH = 28;
        const IMAGE_HEIGHT = 28;
        const testData = data.nextTestBatch(testDataSize);
        const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
        const labels = testData.labels.argMax(-1);
        const preds = (model.predict(testxs) as tf.Tensor).argMax(-1);
        testxs.dispose();
        return [preds, labels];
    }

    private doClassification(model: LayersModel, data: MnistData) {
        const IMAGE_WIDTH = 28;
        const IMAGE_HEIGHT = 28;
        let xs = tf.tensor2d(data.testImages, [1, IMAGE_HEIGHT * IMAGE_WIDTH]);
        xs = xs.reshape([1, IMAGE_WIDTH, IMAGE_HEIGHT, 1])
        const preds = (model.predict(xs) as tf.Tensor).argMax(-1).dataSync();
        xs.dispose();
        return preds;
    }

    async classify(request: Request, response: Response, next: NextFunction) {
        const arrayBuf = this.toArrayBuffer((request.files.image as any).data);
        const model = await tf.loadLayersModel('file://./src/model/model.json');
        await this.data.loadSingleImage(arrayBuf)
        let classificationResult = this.doClassification(model, this.data)
        console.log(classificationResult)
        return response.json({
            pred: classificationResult[0]
        })
    }

    async evaluate(request: Request, response: Response, next: NextFunction) {
        const model = await tf.loadLayersModel('file://./src/model/model.json');
        await this.data.loadGoogleDemo()
        let predictionResult = this.doEvaluation(model, this.data)
        return response.json({
            preds: predictionResult[0],
            labels: predictionResult[1]
        })
    }

    async getAllEntries(request: Request, response: Response, next: NextFunction) {
        let result = await this.classificationRepository.find();
        if (result) {
            return response.json(result)
        } else {
            return response.sendStatus(404)
        }
    }

    async getOneEntry(request: Request, response: Response, next: NextFunction) {
        let result = await this.classificationRepository.findOne(request.params.id);
        if (result) {
            return response.json(result)
        } else {
            return response.sendStatus(404)
        }
    }

    async deleteEntry(request: Request, response: Response, next: NextFunction) {
        let entryToDelete = await this.classificationRepository.findOne(request.params.id);
        if (entryToDelete) {
            await this.classificationRepository.remove(entryToDelete);
        } else {
            response.statusMessage = "This item is not in the database."
            return response.sendStatus(404)
        }
    }

    async createEntry(request: Request, response: Response, next: NextFunction) {
        let entry = new Classification;
        entry.timestamp = request.body.timestamp
        await this.classificationRepository.insert(entry);
        return response.sendStatus(200)
    }
}