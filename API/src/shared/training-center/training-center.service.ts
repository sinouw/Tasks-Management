import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TrainingCenter } from 'src/models/trainingCenters.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TrainingCenterService {
    constructor(@InjectModel('TrainingCenter') private readonly Model: Model<TrainingCenter>) { }

    // fetch all documents
    async getAll(): Promise<TrainingCenter[]> {
        const result = await this.Model.find();
        return result;
    }
    
    // Get a single TrainingCenter
    async getById(id): Promise<TrainingCenter> {
        const result = await this.Model.findById(id);
        return result;
    }

    // Check if document exists
    async checkExistanceById(id): Promise<boolean> {
        const result = await this.Model.findById(id);
        return result==null?false:true;
    }

    // post a single document
    async addNewDocument(body: any): Promise<TrainingCenter> {
        const newResult = await this.Model(body);
        return newResult.save();
    }
    // Edit document details
    async updateDocumet(id, body: any): Promise<TrainingCenter> {
        const result = await this.Model
            .findByIdAndUpdate(id, body, { new: true });
        return result;
    }
    // Delete a document
    async deleteDocument(id): Promise<any> {
        const deletedResult = await this.Model.findByIdAndRemove(id);
        return deletedResult;
    }
}
