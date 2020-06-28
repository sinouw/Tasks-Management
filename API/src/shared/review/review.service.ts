import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Review } from 'src/models/review.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewService {
    constructor(@InjectModel('Review') private readonly Model: Model<Review>) { }

    // fetch all documents
    async getAll(): Promise<Review[]> {
        const result = await this.Model.find();
        return result;
    }
    
    // Get a single Review
    async getById(id): Promise<Review> {
        const result = await this.Model.findById(id);
        return result;
    }

    // Check if document exists
    async checkExistanceById(id): Promise<boolean> {
        const result = await this.Model.findById(id);
        return result==null?false:true;
    }

    // post a single document
    async addNewDocument(body: any): Promise<Review> {
        const newResult = await this.Model(body);
        return newResult.save();
    }
    // Edit document details
    async updateDocumet(id, body: any): Promise<Review> {
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
