import { NextFunction, Request, Response } from 'express';
import { MnistData } from '../logic/Data'
import * as tf from '@tensorflow/tfjs-node'

export class ModelController {

    data: MnistData;

    constructor() {
        this.data = new MnistData();
    }

    doPrediction(model, data, testDataSize = 500) {
        const IMAGE_WIDTH = 28;
        const IMAGE_HEIGHT = 28;
        const testData = data.nextTestBatch(testDataSize);
        const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
        const labels = testData.labels.argMax(-1);
        const preds = model.predict(testxs).argMax(-1);
        testxs.dispose();
        return [preds, labels];
    }

    async evaluate(request: Request, response: Response, next: NextFunction) {
        const model = await tf.loadLayersModel('file://./src/model/model.json');
        await this.data.load()
        let predictionResult = this.doPrediction(model, this.data)
        return response.json({
            preds: predictionResult[0],
            labels: predictionResult[1]
        })
    }
}